import { buildHealth } from './health';

describe('buildHealth', () => {
  it('rapporte le commit et la date de build', () => {
    expect(buildHealth({ GIT_SHA: 'a1b2c3d', BUILD_DATE: '2026-10-23T10:00:00Z' }, 42.9)).toEqual({
      status: 'ok',
      commit: 'a1b2c3d',
      builtAt: '2026-10-23T10:00:00Z',
      uptimeSeconds: 42,
    });
  });

  it('reste « ok » quand les informations de build sont absentes', () => {
    expect(buildHealth({}, 0)).toEqual({
      status: 'ok',
      commit: 'unknown',
      builtAt: 'unknown',
      uptimeSeconds: 0,
    });
  });

  it('n’expose jamais une valeur inattendue (injection, secret collé par erreur)', () => {
    const report = buildHealth(
      { GIT_SHA: '<script>alert(1)</script>', BUILD_DATE: 'x'.repeat(200) },
      1,
    );
    expect(report.commit).toBe('unknown');
    expect(report.builtAt).toBe('unknown');
  });

  it('ne renvoie jamais une durée négative', () => {
    expect(buildHealth({}, -5).uptimeSeconds).toBe(0);
  });
});
