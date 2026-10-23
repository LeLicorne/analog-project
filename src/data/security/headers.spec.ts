import { buildCsp, buildSecurityHeaders } from './headers';

const https = { siteUrl: 'https://quizz.example', useEmulators: false } as const;
const local = { siteUrl: 'http://localhost:4173', useEmulators: false } as const;

function directive(csp: string, name: string): string[] {
  const found = csp.split('; ').find((part) => part.startsWith(`${name} `));
  return found ? found.split(' ').slice(1) : [];
}

describe('Content-Security-Policy', () => {
  const csp = buildCsp(https);

  it('n’autorise ni script inline ni eval ni script externe', () => {
    expect(csp).not.toContain("'unsafe-inline'");
    expect(csp).not.toContain("'unsafe-eval'");
    expect(csp).not.toContain('*');
    expect(directive(csp, 'script-src')).toEqual(["'self'"]);
    expect(directive(csp, 'style-src')).toEqual(["'self'"]);
  });

  it('interdit plugins, cadres et détournement de base ou de formulaire', () => {
    expect(directive(csp, 'object-src')).toEqual(["'none'"]);
    expect(directive(csp, 'frame-ancestors')).toEqual(["'none'"]);
    expect(directive(csp, 'base-uri')).toEqual(["'self'"]);
    expect(directive(csp, 'form-action')).toEqual(["'self'"]);
  });

  it('limite les connexions au site et aux seuls services Firebase utilisés (compte, base, notifications)', () => {
    expect(directive(csp, 'connect-src')).toEqual([
      "'self'",
      'https://identitytoolkit.googleapis.com',
      'https://securetoken.googleapis.com',
      'https://firestore.googleapis.com',
      'https://fcmregistrations.googleapis.com',
      'https://fcm.googleapis.com',
      'https://firebaseinstallations.googleapis.com',
    ]);
  });

  it('n’ouvre les émulateurs locaux que pour un build de test', () => {
    expect(buildCsp(https)).not.toContain('localhost');
    expect(buildCsp({ ...local, useEmulators: true })).toContain('http://localhost:9099');
  });

  it('force le https seulement quand le site est en https', () => {
    expect(buildCsp(https)).toContain('upgrade-insecure-requests');
    expect(buildCsp(local)).not.toContain('upgrade-insecure-requests');
  });
});

describe('en-têtes de sécurité', () => {
  it('pose les protections de base', () => {
    const headers = buildSecurityHeaders(https);
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['cross-origin-opener-policy']).toBe('same-origin');
    expect(headers['permissions-policy']).toContain('camera=()');
    expect(headers['content-security-policy']).toBe(buildCsp(https));
  });

  it('envoie le HSTS uniquement en https : en http il bloquerait localhost', () => {
    expect(buildSecurityHeaders(https)['strict-transport-security']).toContain('max-age=63072000');
    expect(buildSecurityHeaders(local)).not.toHaveProperty('strict-transport-security');
  });
});
