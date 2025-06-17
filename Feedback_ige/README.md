# Sistema de Avaliação de Professores - UNIFESSPA

Sistema para avaliação anônima de professores pelos alunos da UNIFESSPA.

## Requisitos

- Python 3.x
- Navegador moderno (Chrome, Firefox, Edge)
- Conta no Firebase

## Configuração

1. **Criar projeto no Firebase**:
   - Acesse [console.firebase.google.com](https://console.firebase.google.com)
   - Clique em "Adicionar projeto"
   - Siga as instruções para criar um novo projeto

2. **Configurar Firebase Authentication**:
   - No console do Firebase, vá para "Authentication"
   - Habilite o provedor "Email/Password"

3. **Configurar Firebase Firestore**:
   - No console do Firebase, vá para "Firestore Database"
   - Crie um banco de dados em modo de teste
   - Configure as regras de segurança:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /usuarios/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /avaliacoes/{avaliacaoId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null;
         allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
       }
       match /professores/{professorId} {
         allow read: if request.auth != null;
         allow write: if false; // Apenas administradores podem modificar
       }
     }
   }
   ```

4. **Configurar Firebase Storage**:
   - No console do Firebase, vá para "Storage"
   - Inicialize o Storage
   - Configure as regras de segurança:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /fotos/{userId}/{allPaths=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

5. **Configurar o projeto**:
   - Copie as credenciais do seu projeto Firebase
   - Substitua as credenciais no arquivo `firebase-config.js`

## Executando o Sistema

1. **Iniciar o servidor local**:
   ```bash
   python -m http.server 8000
   ```

2. **Acessar o sistema**:
   - Abra seu navegador
   - Acesse [http://localhost:8000](http://localhost:8000)

## Estrutura do Projeto

```
/
├── index.html          # Página inicial
├── login.html          # Página de login
├── cadastro.html       # Página de cadastro
├── avaliacao.html      # Página de avaliação
├── relatorio.html      # Página de relatório
├── perfil.html         # Página de perfil
├── firebase-config.js  # Configuração do Firebase
├── auth.js            # Funções de autenticação
└── assets/            # Recursos estáticos
    ├── css/
    └── img/
```

## Funcionalidades

- Autenticação de usuários
- Cadastro de novos usuários
- Avaliação de professores
- Visualização de relatórios
- Gerenciamento de perfil
- Upload de fotos
- Alteração de senha

## Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento. 