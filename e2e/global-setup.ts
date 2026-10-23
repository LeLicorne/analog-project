const EMULATORS = [
  { name: 'Auth', url: 'http://127.0.0.1:9099/' },
  { name: 'Firestore', url: 'http://127.0.0.1:8080/' },
];

const TIMEOUT_MS = 90_000;

async function isUp(url: string): Promise<boolean> {
  try {
    return (await fetch(url)).ok;
  } catch {
    return false;
  }
}

/**
 * Les émulateurs démarrent chacun à leur rythme et Playwright ne sait pas tous les attendre :
 * sans cette attente, les premiers tests de compte échouent avec « Connexion impossible ».
 */
export default async function globalSetup(): Promise<void> {
  const deadline = Date.now() + TIMEOUT_MS;
  for (const emulator of EMULATORS) {
    while (!(await isUp(emulator.url))) {
      if (Date.now() > deadline) throw new Error(`Émulateur ${emulator.name} injoignable`);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
}
