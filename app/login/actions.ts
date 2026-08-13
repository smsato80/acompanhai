'use server';

import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export type AuthActionState = {
  error?: string;
  message?: string;
};

export async function authenticate(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const intent = String(formData.get('intent') ?? 'login');
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();
  const password = String(formData.get('password') ?? '');
  const fullName = String(formData.get('fullName') ?? '').trim();

  if (!email || !email.includes('@')) {
    return { error: 'Digite um e-mail válido.' };
  }

  if (password.length < 6) {
    return { error: 'A senha precisa ter pelo menos 6 caracteres.' };
  }

  const supabase = await createSupabaseServerClient();

  if (intent === 'signup') {
    if (fullName.length < 2) {
      return { error: 'Digite seu nome para criar a conta.' };
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: fullName },
        emailRedirectTo: `${origin}/auth/confirm?next=/dashboard`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.session) {
      redirect('/dashboard');
    }

    return {
      message: 'Conta criada. Confirme seu e-mail para entrar no AcompanhAí.',
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: 'E-mail ou senha não conferem.' };
  }

  redirect('/dashboard');
}
