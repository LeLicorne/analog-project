import { readFileSync } from 'node:fs';

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

let env: RulesTestEnvironment;

const result = { score: 4, answers: [0, 1, true, 2, false] };

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-quizz-du-jour',
    firestore: { rules: readFileSync('firestore.rules', 'utf8') },
  });
});

afterAll(async () => {
  await env.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
});

describe('règles Firestore : users/{uid}', () => {
  it('permet au propriétaire de créer son profil', async () => {
    const db = env.authenticatedContext('alice').firestore();
    await assertSucceeds(
      setDoc(doc(db, 'users/alice'), {
        results: { 'histoire:2026-10-23': result },
        updatedAt: serverTimestamp(),
      }),
    );
  });

  it('permet au propriétaire de compléter son profil (merge)', async () => {
    const db = env.authenticatedContext('alice').firestore();
    const ref = doc(db, 'users/alice');
    await assertSucceeds(
      setDoc(ref, { results: { 'web:2026-10-23': result }, updatedAt: serverTimestamp() }),
    );
    await assertSucceeds(
      setDoc(
        ref,
        { results: { 'gaming:2026-10-23': result }, updatedAt: serverTimestamp() },
        { merge: true },
      ),
    );
    const snapshot = await getDoc(ref);
    expect(Object.keys(snapshot.get('results') as object)).toHaveLength(2);
  });

  it('permet au propriétaire de lire son profil', async () => {
    await env.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users/alice'), { results: {}, updatedAt: new Date() });
    });
    const db = env.authenticatedContext('alice').firestore();
    await assertSucceeds(getDoc(doc(db, 'users/alice')));
  });

  it('refuse la lecture du profil d’un autre utilisateur', async () => {
    const db = env.authenticatedContext('mallory').firestore();
    await assertFails(getDoc(doc(db, 'users/alice')));
  });

  it('refuse l’écriture dans le profil d’un autre utilisateur', async () => {
    const db = env.authenticatedContext('mallory').firestore();
    await assertFails(
      setDoc(doc(db, 'users/alice'), { results: {}, updatedAt: serverTimestamp() }),
    );
  });

  it('refuse tout accès sans connexion', async () => {
    const db = env.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, 'users/alice')));
    await assertFails(
      setDoc(doc(db, 'users/alice'), { results: {}, updatedAt: serverTimestamp() }),
    );
  });

  it('refuse un champ inattendu', async () => {
    const db = env.authenticatedContext('alice').firestore();
    await assertFails(
      setDoc(doc(db, 'users/alice'), {
        results: {},
        updatedAt: serverTimestamp(),
        isAdmin: true,
      }),
    );
  });

  it('refuse un results qui n’est pas une map', async () => {
    const db = env.authenticatedContext('alice').firestore();
    await assertFails(
      setDoc(doc(db, 'users/alice'), { results: 'beaucoup', updatedAt: serverTimestamp() }),
    );
  });

  it('refuse un updatedAt falsifié', async () => {
    const db = env.authenticatedContext('alice').firestore();
    await assertFails(
      setDoc(doc(db, 'users/alice'), { results: {}, updatedAt: new Date('2000-01-01') }),
    );
  });

  it('refuse la suppression du profil', async () => {
    await env.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users/alice'), { results: {}, updatedAt: new Date() });
    });
    const db = env.authenticatedContext('alice').firestore();
    await assertFails(deleteDoc(doc(db, 'users/alice')));
  });

  it('refuse toute autre collection', async () => {
    const db = env.authenticatedContext('alice').firestore();
    await assertFails(setDoc(doc(db, 'scores/alice'), { value: 1 }));
    await assertFails(getDoc(doc(db, 'scores/alice')));
  });
});
