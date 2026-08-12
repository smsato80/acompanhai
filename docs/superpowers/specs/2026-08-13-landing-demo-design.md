# AcompanhAí — Landing page de demonstração

**Data:** 2026-08-13  
**Status:** desenho aprovado pelo usuário

## Objetivo

Criar uma landing page pública de demonstração para apresentar o AcompanhAí a personal trainers brasileiros, especialmente profissionais que atendem clientes no Japão, e transformar interesse em pedidos de teste.

O objetivo desta primeira página é validar posicionamento e interesse comercial. Ela não deve sugerir que autenticação, painel real, cobrança ou captura persistente de leads já estejam prontos.

## Público inicial

Personal trainers brasileiros que acompanham clientes remotamente ou presencialmente e sentem dificuldade em manter planos, check-ins e comunicação organizados.

## Mensagem central

**Headline:** “Seu cliente não precisa se perder no caminho.”

**Promessa:** o AcompanhAí ajuda o profissional a acompanhar clientes com mais clareza, presença e constância.

**CTA principal:** “Quero testar”.

## Experiência da página

### 1. Hero

Apresentar a mensagem central, o público inicial e o CTA primário. O CTA conduz para a área de interesse da própria página.

### 2. Demonstração visual

Exibir um mockup convincente de um painel com dados fictícios e claramente demonstrativos: clientes acompanhados, check-ins pendentes, evolução semanal e alertas de atenção. Nenhum dado deve ser apresentado como dado real de usuário.

### 3. Benefícios

Comunicar quatro resultados práticos:

- mais organização;
- mais presença com o cliente;
- menos dependência de planilhas e mensagens espalhadas;
- maior percepção de valor e potencial de retenção.

### 4. Fluxo em três passos

1. Cadastre seus clientes.
2. Acompanhe planos e check-ins.
3. Saiba quem precisa da sua atenção.

### 5. CTA final

Repetir “Quero testar o AcompanhAí” depois dos benefícios e do fluxo, reduzindo a necessidade de voltar ao topo.

### 6. Rodapé

Identidade AcompanhAí, contexto Brasil–Japão e aviso de que a página apresenta uma demonstração inicial do produto.

## Comportamento do CTA

Na primeira versão, o botão “Quero testar” deve levar a uma área de interesse com formulário curto ou interação demonstrativa, sem salvar dados em banco ainda. A interface deve apresentar claramente que se trata de uma demonstração/early access.

Campos planejados para a próxima integração: nome, e-mail, WhatsApp opcional, cidade/país de atendimento e número aproximado de clientes.

A persistência em Supabase fica fora desta implementação da landing. Quando for adicionada, deverá usar uma tabela própria de leads, RLS apropriada e validação anti-spam.

## Direção visual

- dark moderno e premium;
- fundo profundo com superfícies em camadas;
- mint como cor de ação e sinal de progresso;
- lilás como cor secundária para evolução e insights;
- bordas suaves, brilho discreto e bastante espaço negativo;
- tipografia grande no hero e textos curtos;
- responsividade mobile-first;
- foco visível e contraste acessível.

Não usar imagens genéricas de academia como elemento principal. O produto será representado por interface demonstrativa e linguagem de acompanhamento.

## Arquitetura técnica

Manter a página dentro do Next.js App Router existente, substituindo a home de fundação por uma landing demonstrativa. O mockup será composto por HTML/CSS/React local, sem dependência de imagens externas ou dados Supabase.

O CTA deve funcionar sem JavaScript complexo: a navegação para a seção de interesse precisa continuar acessível. Interações adicionais, como abertura de modal, só serão usadas se não prejudicarem teclado, mobile ou carregamento.

## Integração externa

- GitHub: criar o repositório `acompanhai` na conta `smsato80` e enviar o histórico local.
- Vercel: importar o repositório GitHub e publicar a landing como demonstração.
- Supabase: manter a configuração existente, sem schema de leads nesta etapa.

Nenhum segredo será enviado ao GitHub. Variáveis públicas do Supabase podem ser configuradas na Vercel quando a integração for necessária; chaves privadas permanecem fora do frontend.

## Critérios de aceite

- landing pública renderiza em desktop e mobile;
- CTA “Quero testar” aparece no hero e no final;
- mockup de demonstração comunica o produto sem dados reais;
- conteúdo está em português brasileiro;
- referências comerciais futuras podem usar ienes;
- navegação por teclado e foco visível funcionam;
- lint, typecheck, testes, formatação e build passam;
- repositório GitHub criado e código enviado;
- deploy Vercel concluído com URL pública registrada na documentação.

## Fora do escopo

- login e cadastro real;
- captura persistente de leads;
- cobrança;
- dashboard autenticado;
- integração de WhatsApp;
- IA de prescrição ou orientação profissional;
- analytics externo antes de definir consentimento e eventos.
