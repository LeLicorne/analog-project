/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_USE_FIREBASE_EMULATORS: string;
  /** Adresse publique du site, sans slash final (canoniques, Open Graph, sitemap). */
  readonly VITE_SITE_URL?: string;
  /** Clé publique Web Push (Console Firebase > Cloud Messaging) : sans elle, les notifications sont masquées. */
  readonly VITE_FIREBASE_VAPID_KEY?: string;
  /** Auteur du site (données structurées Person + page À propos). Sans nom, aucun auteur n'est publié. */
  readonly VITE_AUTHOR_NAME?: string;
  readonly VITE_AUTHOR_GITHUB?: string;
  readonly VITE_AUTHOR_LINKEDIN?: string;
  /** Adresse de contact affichée sur la page À propos (facultative). */
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
