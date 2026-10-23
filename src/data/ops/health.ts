export interface HealthReport {
  readonly status: 'ok';
  /** Commit déployé : permet de vérifier d'un coup d'œil qu'un déploiement a bien pris effet. */
  readonly commit: string;
  readonly builtAt: string;
  readonly uptimeSeconds: number;
}

const UNKNOWN = 'unknown';

/**
 * Rapport de santé servi par `/healthz`. N'expose que des informations publiques par nature (commit, date de build) :
 * jamais de variable d'environnement, de chemin ni de version de dépendance.
 */
export function buildHealth(
  env: Readonly<Record<string, string | undefined>>,
  uptimeSeconds: number,
): HealthReport {
  const safe = (value: string | undefined): string => {
    const trimmed = value?.trim() ?? '';
    return /^[A-Za-z0-9:._+-]{1,64}$/.test(trimmed) ? trimmed : UNKNOWN;
  };
  return {
    status: 'ok',
    commit: safe(env['GIT_SHA']),
    builtAt: safe(env['BUILD_DATE']),
    uptimeSeconds: Math.max(0, Math.floor(uptimeSeconds)),
  };
}
