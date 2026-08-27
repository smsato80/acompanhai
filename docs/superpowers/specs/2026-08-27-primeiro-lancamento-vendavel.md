# Especificação — Primeiro lançamento vendável do AcompanhAí

**Data:** 27 de agosto de 2026  
**Repositório oficial:** `D:\SatoTech\acompanhai`  
**Worktree de implementação:** `D:\SatoTech\acompanhai\.worktrees\mvp-app`  
**Status:** aprovado para execução

## 1. Objetivo

Transformar o MVP atual em uma primeira versão que um profissional consiga usar com clientes reais e compreender em poucos minutos o valor do produto.

O produto continua se chamando somente **AcompanhAí**. O nome público não deve conter “Pilot1”, “Pilot 1” ou qualquer marcador de protótipo.

## 2. Público inicial

O AcompanhAí será vendido inicialmente para profissionais autônomos que acompanham pessoas semanalmente e precisam manter presença entre uma sessão e outra:

- personal trainers;
- professores de corrida, mobilidade ou funcional;
- nutricionistas em acompanhamento não clínico dentro do escopo do produto;
- mentores e consultores que trabalham com planos e retornos recorrentes.

O primeiro caso de uso e a comunicação principal devem continuar falando com personal trainers e profissionais de acompanhamento físico. A arquitetura deve permitir adaptar rótulos e templates para os demais nichos sem criar um segundo produto agora.

## 3. Problema e promessa

O profissional perde contexto entre atendimentos, espalha informações em mensagens e não percebe cedo quando um cliente está travando. O AcompanhAí concentra plano, próximo passo e check-in em uma experiência simples.

**Promessa comercial:** “Acompanhe cada cliente entre uma sessão e outra, com clareza sobre o próximo passo e sobre quem precisa da sua atenção.”

**Resultado demonstrável:** em uma sessão de homologação, o profissional deve conseguir criar um cliente, montar um plano, gerar um link, receber um check-in e identificar a próxima ação.

## 4. Jornada principal

1. O profissional cria a conta e entra no espaço de trabalho.
2. O onboarding explica o produto em três ações: adicionar cliente, criar plano e enviar acompanhamento.
3. O profissional cadastra nome e contato mínimo do cliente.
4. O profissional cria um plano semanal com itens estruturados.
5. O AcompanhAí gera um convite seguro e uma mensagem pronta para WhatsApp, LINE ou e-mail.
6. O cliente abre o link no celular sem criar senha.
7. O cliente visualiza apenas seu plano vigente e envia um check-in simples.
8. O profissional vê o retorno no painel, incluindo status, dificuldade e comentário.
9. O painel destaca clientes sem retorno ou com dificuldade alta.
10. O profissional usa a ação de próxima mensagem para retomar o contato.

## 5. Requisitos funcionais

### 5.1 Conta profissional e onboarding

- Reutilizar o Supabase Auth e a organização já existentes.
- Exibir estado vazio orientado quando ainda não houver clientes.
- Mostrar os três próximos passos e o progresso real, sem números fictícios.
- Permitir voltar ao painel sem perder o onboarding.
- Manter `/login` e `/dashboard` compatíveis com a base atual.

### 5.2 Clientes

- Criar, listar e consultar clientes vinculados à organização do profissional.
- Exigir nome e validar contato de forma tolerante, pois o envio final pode ser manual.
- Exibir último check-in, situação do acompanhamento e convite vigente.
- Permitir revogar um convite e gerar outro.
- Nunca permitir que uma organização consulte ou altere clientes de outra organização.

### 5.3 Planos

- Criar plano com título, objetivo, período e itens da semana.
- Cada item deve ter título, instrução curta e ordem.
- Permitir editar e publicar um plano para um cliente.
- Ao publicar, preservar uma versão imutável suficiente para que o check-in continue interpretável mesmo depois de uma edição.
- Manter leitura compatível com os planos existentes que usam conteúdo JSON.

### 5.4 Convite e portal do cliente

- Gerar token aleatório de uso único, com validade padrão de sete dias.
- Armazenar somente o hash do token no banco.
- Não registrar o token cru em logs, banco, analytics ou mensagens de erro.
- Trocar o token por uma sessão curta em cookie `HttpOnly`, `Secure` em produção e `SameSite=Lax`.
- Permitir revogação imediata e impedir reutilização após resgate.
- O cliente convidado poderá ver apenas seu próprio perfil, plano vigente e check-ins próprios.
- O portal deve ser responsivo e funcionar primeiro em tela de celular.
- O cliente poderá registrar status “concluí”, “parcial” ou “não consegui”, dificuldade de 1 a 5 e comentário opcional de até 500 caracteres.
- O cliente não terá acesso a dados de outros clientes, administração, configurações ou credenciais do profissional.

### 5.5 Painel de atenção

- Mostrar clientes com check-in recente, pendente e atenção.
- Sinalizar atenção quando houver dificuldade alta, comentário indicando bloqueio ou ausência de retorno além do intervalo configurado.
- Exibir o motivo da sinalização em linguagem humana.
- Oferecer botão para copiar uma mensagem curta de acompanhamento.
- Não enviar mensagens automaticamente nesta primeira versão.

### 5.6 Comercial e confiança

- Incluir páginas públicas de Termos de Uso e Política de Privacidade.
- Comunicar claramente que dados exibidos na demonstração são fictícios.
- Usar trial e ativação comercial manual nesta etapa.
- Referência inicial de preço: plano Inicial a ¥980/mês e plano Profissional a ¥1.980/mês, sujeitos à validação comercial.
- Não implementar Stripe, cobrança recorrente ou bloqueio automático nesta entrega.
- Não apresentar o produto como serviço médico, diagnóstico ou prescrição clínica.

## 6. Segurança e privacidade

- Toda consulta do profissional deve respeitar organização e papel via RLS.
- Rotas de portal devem validar o contexto do convidado a cada requisição.
- Funções `SECURITY DEFINER`, caso necessárias, devem fixar `search_path`, qualificar tabelas e receber o mínimo de privilégios.
- O `SUPABASE_SERVICE_ROLE_KEY`, se for indispensável em alguma Route Handler, ficará apenas no servidor e nunca será importado por componente cliente, bundle ou variável `NEXT_PUBLIC_*`.
- Mensagens de erro não revelarão existência de token, cliente ou organização.
- Aplicar limite básico de tentativas para resgate de convite e check-in.
- Não coletar fotos, dados clínicos, documentos, dados de saúde sensíveis ou dados de pagamento nesta etapa.

## 7. Fora do escopo

- Stripe ou outro checkout automatizado.
- Integração automática com WhatsApp ou LINE.
- Groq, NVIDIA, Pexels ou geração de IA em produção.
- Aplicativo nativo para Android/iOS.
- Equipes, múltiplos profissionais e permissões avançadas.
- Biblioteca de exercícios, prescrição médica, dieta, prontuário ou armazenamento de fotos.
- Internacionalização completa; a primeira interface permanece em português, com valores em ienes.

## 8. Critérios de aceite

### Fluxo funcional

- Um profissional novo consegue concluir o onboarding sem suporte técnico.
- Um profissional existente consegue criar cliente, plano e convite.
- Um cliente abre o convite em celular, vê o plano correto e envia check-in.
- O profissional vê o check-in associado ao cliente correto e o destaque de atenção quando aplicável.
- Um convite revogado ou expirado não permite acesso.

### Isolamento e segurança

- Testes cobrem isolamento entre duas organizações.
- Token cru não é persistido.
- `service_role` não aparece em código cliente nem no HTML entregue ao navegador.
- Rotas protegidas continuam redirecionando usuários não autenticados.

### Qualidade de produto

- A landing deixa explícito que o produto é para personal trainers e profissionais que acompanham clientes.
- A seção de benefícios usa ícones SVG consistentes.
- O rodapé usa exatamente “Desenvolvido por SatoTech · Soluções Inteligentes”.
- O mockup da demonstração comunica cliente, plano, check-in e atenção, em vez de apenas números genéricos.
- Não há referência visível a “Pilot1” ou “Pilot 1”.
- A jornada principal funciona em viewport móvel e desktop.

## 9. Estratégia de lançamento

O AcompanhAí será validado primeiro com profissionais brasileiros, incluindo brasileiros que vivem no Japão. O produto pode aceitar clientes em qualquer lugar, mas a primeira aquisição deve usar português, atendimento direto e preços em ienes para refletir a operação atual da SatoTech.

O Supabase Free terá no máximo dois projetos ativos: CarrosserIA e AcompanhAí. O projeto Peso Leve permanece pausado enquanto essa estratégia estiver em vigor.

## 10. Rollback

- Alterações de banco serão aditivas e versionadas em migrations.
- Cada etapa será validada antes do commit seguinte.
- Em caso de falha do portal, o painel existente continuará disponível e a funcionalidade nova poderá ser desativada por rota/feature flag sem apagar dados.
- O projeto AcompanhAí poderá ser pausado novamente no Supabase sem excluir o projeto.
