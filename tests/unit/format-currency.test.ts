import { describe, expect, it } from 'vitest';

import { formatYen } from '@/lib/format-currency';

describe('formatYen', () => {
  it('formata valores em ienes sem casas decimais', () => {
    expect(formatYen(12800)).toBe('￥12,800');
  });
});
