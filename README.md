# Sistema de Gerenciamento de Receitas e Despesas

Este projeto é um site para gerenciar receitas e despesas de forma simples e intuitiva. Ele oferece funcionalidades completas de autenticação de usuários, além de operações de adição, listagem, edição e remoção de receitas e despesas.

---

## Funcionalidades

### 1. Autenticação de Usuários
- **Login**: Formulário para autenticar os usuários e armazenar o token de autenticação no `localStorage`.
- **Registro**: Formulário para novos usuários se cadastrarem no sistema.
- **Logout**: Função para deslogar o usuário, removendo o token do `localStorage`.

### 2. Gerenciamento de Receitas
- **Adicionar Receita**: Formulário para adicionar novas receitas ao sistema, com envio de dados para a API.
- **Listar Receitas**: Página que exibe uma tabela com todas as receitas cadastradas.
- **Editar Receita**: Formulário para editar receitas existentes.
- **Remover Receita**: Função para excluir receitas, enviando uma requisição `DELETE` para a API.

### 3. Gerenciamento de Despesas
- **Adicionar Despesa**: Formulário para adicionar novas despesas ao sistema.
- **Listar Despesas**: Página que exibe uma tabela com todas as despesas cadastradas.
- **Editar Despesa**: Formulário para editar despesas existentes.
- **Remover Despesa**: Função para excluir despesas.

---

## Estrutura de Arquivos

### **HTML**
- `index.html`: Página inicial do site.
- `login.html`: Formulário de login.
- `cadastro.html`: Formulário de registro de novos usuários.
- `listar_receitas.html`: Página para listar receitas.
- `listar_despesas.html`: Página para listar despesas.
- `adicionar_receitas.html`: Formulário para adicionar receitas.
- `adicionar_despesas.html`: Formulário para adicionar despesas.
- `editar_receitas.html`: Formulário para editar receitas.
- `editar_despesas.html`: Formulário para editar despesas.

### **TypeScript**
- `login.ts`: Lida com a autenticação de usuários.
- `cadastro.ts`: Lida com o registro de novos usuários.
- `receitas.ts`: Gerencia as operações de receitas (listar, adicionar, editar e remover).
- `despesas.ts`: Gerencia as operações de despesas (listar, adicionar, editar e remover).
- `constantes.ts`: Contém as URLs das APIs utilizadas no projeto.

---

## Navegação

- Links de navegação no cabeçalho para as páginas principais: 
  - Página inicial
  - Listar despesas
  - Listar receitas
  - Login
  - Registro
- Botões de ação para editar e remover receitas ou despesas diretamente das tabelas.

---

## Autenticação e Autorização

- **Token de Autenticação**: 
  - O token é armazenado no `localStorage` após o login.
  - Todas as requisições para APIs protegidas incluem o token no cabeçalho para garantir a segurança.

---

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, TypeScript
- **Backend**: API para gerenciamento de receitas e despesas (integrada via chamadas HTTP)

---

## Como usar o site
Cadastre-se
cadastre uma despesa ou receita 
Visualize o cadastro da despesa ou da receita cadastra
Pode-se editar ou remover um despesa ou receita ja cadastrada

Não implementamos edição de senhas
