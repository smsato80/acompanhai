import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AcompanhAí — acompanhamento que continua',
  description: 'Uma base simples para profissionais acompanharem clientes com mais consistência.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
