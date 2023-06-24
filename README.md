# Dashboard com Next.js e Firebase

Este repositório contém um projeto de dashboard desenvolvido com Next.js e Firebase. O dashboard permite a criação de contas de usuário, login com as contas criadas e a criação de novos usuários.

## Funcionalidades

O dashboard possui as seguintes funcionalidades:

1. Criação de contas de usuário: Os usuários podem se cadastrar no sistema fornecendo um nome de usuário, endereço de e-mail e senha. As informações do usuário são armazenadas no Firebase Authentication.

2. Login: Os usuários registrados podem fazer login no sistema utilizando seu endereço de e-mail e senha. O Firebase Authentication é utilizado para autenticar os usuários.

3. Criação de novos usuários: Após fazer login, os usuários têm a capacidade de criar novos usuários no sistema. Eles podem fornecer os detalhes do novo usuário, como nome, endereço de e-mail e senha, e o novo usuário é adicionado ao banco de dados do Firebase.

## Configuração

Para configurar e executar o projeto em sua máquina local, siga as etapas abaixo:

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixar a versão mais recente do Node.js em: https://nodejs.org

2. Clone este repositório para o diretório desejado em sua máquina:

   ```
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

3. Acesse o diretório do projeto:

   ```
   cd nome-do-repositorio
   ```

4. Instale as dependências do projeto utilizando o npm ou yarn:

   ```
   npm install
   ```

   ou

   ```
   yarn install
   ```

5. Crie um projeto no Firebase e obtenha as credenciais de autenticação (apiKey, authDomain, projectId, etc.).

6. Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis de ambiente, substituindo os valores pelas suas próprias credenciais do Firebase:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxxxxxxxxx
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxx
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxxxxxxxxx
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=xxxxxxxxxxxxx
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxx
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxxx
   NEXT_PUBLIC_FIREBASE_APP_ID=xxxxxxxxxxxxx
   ```

7. Inicie o servidor de desenvolvimento:

   ```
   npm run dev
   ```

   ou

   ```
   yarn dev
   ```

8. O servidor de desenvolvimento estará em execução em `http://localhost:3000`. Acesse essa URL em seu navegador para ver o dashboard em ação.
