'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

async function requireWorkspace() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect('/login');
  }

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', userData.user.id)
    .limit(1)
    .maybeSingle();

  return { supabase, organizationId: membership?.organization_id ?? null };
}

export async function createClientAction(formData: FormData): Promise<void> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();

  if (name.length < 2) {
    return;
  }

  const { supabase, organizationId } = await requireWorkspace();
  if (!organizationId) {
    return;
  }

  const { error } = await supabase.from('clients').insert({
    organization_id: organizationId,
    display_name: name,
    contact_channel: email ? 'email' : 'none',
    contact_value: email || null,
    status: 'active',
  });

  if (error) {
    return;
  }

  revalidatePath('/dashboard');
}

export async function createPlanAction(formData: FormData): Promise<void> {
  const clientId = String(formData.get('clientId') ?? '');
  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const startsOn = String(formData.get('startsOn') ?? '');

  if (name.length < 2 || !clientId || !startsOn) {
    return;
  }

  const { supabase, organizationId } = await requireWorkspace();
  if (!organizationId) {
    return;
  }

  const { error } = await supabase.from('plans').insert({
    organization_id: organizationId,
    client_id: clientId,
    name,
    content: [
      {
        title: 'Próximo passo',
        instruction: description || 'Siga o combinado e conte como foi no próximo check-in.',
      },
    ],
    starts_on: startsOn,
    status: 'published',
    published_at: new Date().toISOString(),
  });

  if (error) {
    return;
  }

  revalidatePath('/dashboard');
}

export async function createCheckInAction(formData: FormData): Promise<void> {
  const clientId = String(formData.get('clientId') ?? '');
  const planId = String(formData.get('planId') ?? '');
  const notes = String(formData.get('notes') ?? '').trim();
  const difficulty = Number(formData.get('difficulty') ?? 0);

  if (!clientId || !planId) {
    return;
  }

  const { supabase, organizationId } = await requireWorkspace();
  if (!organizationId) {
    return;
  }

  const { error } = await supabase.from('check_ins').insert({
    organization_id: organizationId,
    client_id: clientId,
    plan_id: planId,
    status: 'done',
    difficulty:
      Number.isInteger(difficulty) && difficulty >= 1 && difficulty <= 5 ? difficulty : null,
    comment: notes || null,
  });

  if (error) {
    return;
  }

  revalidatePath('/dashboard');
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/');
}
