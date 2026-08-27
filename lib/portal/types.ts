export type PortalPlanItem = {
  title: string;
  instruction: string;
  day?: string;
};

export type PortalCheckIn = {
  status: 'done' | 'partial' | 'not_done';
  difficulty: number | null;
  comment: string | null;
  submittedAt: string;
};

export type PortalPayload = {
  client: { id: string; name: string };
  professional: { name: string };
  plan: {
    id: string;
    name: string;
    version: number;
    content: unknown;
    startsOn: string;
    endsOn: string | null;
  } | null;
  checkIn: PortalCheckIn | null;
};

export function normalizePlanItems(content: unknown): PortalPlanItem[] {
  if (!Array.isArray(content)) return [];

  return content.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];

    const record = item as Record<string, unknown>;
    const title = typeof record.title === 'string' ? record.title.trim() : '';
    const instruction =
      typeof record.instruction === 'string'
        ? record.instruction.trim()
        : typeof record.text === 'string'
          ? record.text.trim()
          : '';

    if (!title && !instruction) return [];

    return [
      {
        title: title || 'Próximo passo',
        instruction: instruction || 'Siga o combinado para esta semana.',
        day: typeof record.day === 'string' ? record.day : undefined,
      },
    ];
  });
}
