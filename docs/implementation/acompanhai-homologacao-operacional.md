# Roteiro de homologação operacional — AcompanhAí

**Objetivo:** confirmar a jornada completa com uma conta profissional e dados de teste controlados antes de convidar clientes reais.

## Preparação

- Usar o site: https://acompanhai.vercel.app
- Usar um endereço de e-mail de teste autorizado.
- Não cadastrar dados clínicos, fotos, documentos ou informações sensíveis.
- Fazer o teste em desktop e em um celular/aba anônima.

## Jornada principal

| Etapa | Resultado esperado | Resultado observado | Data |
| --- | --- | --- | --- |
| Criar conta profissional | Conta criada e confirmação recebida | Pendente | — |
| Entrar no painel | `/dashboard` abre somente após autenticação | Pendente | — |
| Criar cliente | Cliente aparece na carteira da organização | Pendente | — |
| Criar plano | Plano publicado aparece associado ao cliente | Pendente | — |
| Gerar convite | Link copiável e mensagem pronta são exibidos | Pendente | — |
| Abrir convite no celular | Portal mostra apenas o cliente e seu plano | Pendente | — |
| Enviar check-in | Status, dificuldade e comentário são salvos | Pendente | — |
| Voltar ao painel | Retorno aparece para o profissional correto | Pendente | — |

## Testes negativos

- Abrir o mesmo convite novamente: deve ser recusado porque o convite é de uso único.
- Revogar um convite antes do uso: deve ser recusado.
- Esperar a expiração: deve ser recusado.
- Acessar `/dashboard` sem sessão: deve redirecionar para `/login`.
- Usar duas organizações: uma não deve enxergar clientes, planos, convites ou check-ins da outra.
- Tentar alterar payload do check-in: deve receber erro genérico sem revelar detalhes do banco.

## Critério de aprovação

Considerar homologado somente quando a jornada principal e todos os testes negativos tiverem resultado observado preenchido. A aprovação não deve ser inferida apenas de `build`, teste unitário ou resposta HTTP das páginas públicas.

## Registro da primeira execução

- Conta usada: não registrar e-mail neste arquivo.
- Ambiente: produção Vercel + Supabase AcompanhAí.
- Resultado: pendente de execução pelo responsável autorizado.
- Falhas encontradas: nenhuma registrada ainda.
- Próxima ação: executar a jornada principal e registrar somente resultados, sem dados pessoais.
