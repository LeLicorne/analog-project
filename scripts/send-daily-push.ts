/**
 * Envoie le rappel quotidien aux appareils enregistrés dans Firestore (`users/{uid}.pushTokens`, dont les clés sont des
 * Firebase Installation IDs).
 *
 * Usage :
 *   GOOGLE_APPLICATION_CREDENTIALS=/chemin/compte-de-service.json bun scripts/send-daily-push.ts [--dry-run]
 *
 * Prévu pour tourner une fois par jour (cron, GitHub Actions). Le compte de service est un SECRET : jamais dans le dépôt.
 * Les appareils dont l'identifiant n'est plus valide (application désinstallée, permission retirée) sont supprimés.
 */
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

import { toIsoDate } from '../src/data/dates';
import { planDailyPush, type PushUser } from '../src/data/push/daily-push';

const BATCH_SIZE = 500;
const DEAD_DEVICE_CODES = new Set([
  'messaging/registration-token-not-registered',
  'messaging/invalid-registration-token',
]);

const dryRun = process.argv.includes('--dry-run');
const today = toIsoDate(new Date());

initializeApp({ credential: applicationDefault() });
const firestore = getFirestore();

const users: PushUser[] = [];
const fidOwners = new Map<string, string>();

for (const snapshot of (await firestore.collection('users').get()).docs) {
  const data = snapshot.data() as {
    results?: Record<string, unknown>;
    pushTokens?: Record<string, unknown>;
  };
  const fids = Object.keys(data.pushTokens ?? {});
  if (fids.length === 0) continue;
  fids.forEach((fid) => fidOwners.set(fid, snapshot.id));
  users.push({ uid: snapshot.id, resultKeys: Object.keys(data.results ?? {}), fids });
}

const plan = planDailyPush(users, today);
process.stdout.write(
  `${plan.length} notification(s) à envoyer à ${users.length} utilisateur(s) pour le ${today}\n`,
);
if (dryRun || plan.length === 0) process.exit(0);

let sent = 0;
let removed = 0;
for (let start = 0; start < plan.length; start += BATCH_SIZE) {
  const batch = plan.slice(start, start + BATCH_SIZE);
  // Message « data » seul : c'est le service worker du site qui l'affiche, avec ses icônes.
  const response = await getMessaging().sendEach(
    batch.map((message) => ({
      fid: message.fid,
      data: { title: message.title, body: message.body, url: message.url },
      webpush: { headers: { TTL: '43200', Urgency: 'normal' } },
    })),
  );
  sent += response.successCount;

  for (const [index, result] of response.responses.entries()) {
    const code = result.error?.code;
    const message = batch[index];
    if (!code || !message || !DEAD_DEVICE_CODES.has(code)) continue;
    const uid = fidOwners.get(message.fid);
    if (!uid) continue;
    await firestore
      .doc(`users/${uid}`)
      .update({ [`pushTokens.${message.fid}`]: FieldValue.delete() });
    removed += 1;
  }
}
process.stdout.write(`${sent} envoyée(s), ${removed} appareil(s) invalide(s) supprimé(s)\n`);
