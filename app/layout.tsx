import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AcompanhAí — acompanhamento que continua',
    template: '%s | AcompanhAí',
  },
  description:
    'A plataforma simples para personal trainers e profissionais acompanharem clientes, planos e check-ins com mais clareza.',
  applicationName: 'AcompanhAí',
  category: 'business',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
