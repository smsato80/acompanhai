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

export async function requestPasswordReset(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();

  if (!email || !email.includes('@')) {
    return { error: 'Digite um e-mail válido.' };
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=${encodeURIComponent('/auth/update-password')}`,
  });

  if (error) {
    return { error: 'Não foi possível enviar o e-mail de recuperação agora.' };
  }

  return {
    message: 'Se existir uma conta para este e-mail, enviaremos as instruções de recuperação.',
  };
}

export async function updatePasswordAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const password = String(formData.get('password') ?? '');
  const confirmation = String(formData.get('confirmation') ?? '');

  if (password.length < 6) {
    return { error: 'A senha precisa ter pelo menos 6 caracteres.' };
  }

  if (password !== confirmation) {
    return { error: 'As senhas não conferem.' };
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return { error: 'O link de recuperação expirou. Solicite um novo e-mail.' };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: 'Não foi possível atualizar sua senha agora.' };
  }

  redirect('/dashboard');
}
