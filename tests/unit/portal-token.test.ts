import { describe, expect, it } from 'vitest';

import { createPortalToken, hashPortalToken } from '@/lib/portal/tokens';

describe('portal tokens', () => {
  it('gera um token opaco e um hash hexadecimal de 64 caracteres', () => {
    const token = createPortalToken();
    const hash = hashPortalToken(token);

    expect(token.length).toBeGreaterThanOrEqual(40);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(hashPortalToken(token)).toBe(hash);
  });

  it('não gera o mesmo token em duas chamadas', () => {
    expect(createPortalToken()).not.toBe(createPortalToken());
  });
});
