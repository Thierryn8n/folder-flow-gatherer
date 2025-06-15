# Folder Flow Gatherer

## Descrição
Folder Flow Gatherer é uma ferramenta de gerenciamento de arquivos e diretórios baseada no projeto Fiscal Flow Notes. Esta ferramenta permite organizar, categorizar e gerenciar arquivos de forma eficiente, com uma interface moderna e intuitiva.

## Recursos Principais

- **Interface Moderna**: Construída com React, TypeScript e Tailwind CSS
- **Autenticação Segura**: Sistema de login e gerenciamento de usuários via Supabase
- **Gerenciamento de Arquivos**: Organização e categorização de arquivos
- **Temas Personalizáveis**: Sistema dinâmico de temas para personalização da interface
- **Responsividade**: Design adaptável para diferentes dispositivos

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Autenticação, Storage)
- **Ferramentas de Desenvolvimento**: Vite, ESLint
- **Gerenciamento de Estado**: React Context API

## Instalação e Uso

```sh
# Clonar o repositório
git clone https://github.com/Thierryn8n/folder-flow-gatherer.git

# Navegar para o diretório do projeto
cd folder-flow-gatherer

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

2. Configure o banco de dados Supabase seguindo as instruções em `CONFIGURACAO-SUPABASE.md`

## Estrutura do Projeto

- `/src`: Código-fonte principal
  - `/components`: Componentes React reutilizáveis
  - `/contexts`: Contextos React para gerenciamento de estado
  - `/hooks`: Hooks personalizados
  - `/pages`: Páginas da aplicação
  - `/services`: Serviços para comunicação com APIs
  - `/styles`: Estilos globais e animações
  - `/utils`: Funções utilitárias

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Thierry - thierry.designer190@gmail.com

Link do projeto: [https://github.com/Thierryn8n/folder-flow-gatherer](https://github.com/Thierryn8n/folder-flow-gatherer)