import { authErrorMessage } from './auth-errors';

describe('authErrorMessage', () => {
  it('ne distingue pas un mauvais mot de passe d’un compte inexistant', () => {
    expect(authErrorMessage({ code: 'auth/user-not-found' })).toBe(
      authErrorMessage({ code: 'auth/wrong-password' }),
    );
    expect(authErrorMessage({ code: 'auth/invalid-credential' })).toContain('incorrect');
  });

  it('ne révèle pas qu’un e-mail est déjà inscrit', () => {
    expect(authErrorMessage({ code: 'auth/email-already-in-use' })).not.toContain('déjà');
  });

  it('retombe sur un message générique pour une erreur inconnue', () => {
    expect(authErrorMessage({ code: 'auth/autre' })).toContain('erreur');
    expect(authErrorMessage(new Error('boom'))).toContain('erreur');
    expect(authErrorMessage(undefined)).toContain('erreur');
  });
});
