import { describe, expect, it } from 'vitest';

import { normalizePlanItems } from '@/lib/portal/types';

describe('conteúdo do plano no portal', () => {
  it('mantém itens estruturados e converte notas legadas', () => {
    expect(
      normalizePlanItems([
        { title: 'Caminhada', instruction: '20 minutos', day: 'segunda' },
        { type: 'note', text: 'Anote como você se sentiu.' },
        { ignored: true },
      ]),
    ).toEqual([
      { title: 'Caminhada', instruction: '20 minutos', day: 'segunda' },
      { title: 'Próximo passo', instruction: 'Anote como você se sentiu.', day: undefined },
    ]);
  });
});
