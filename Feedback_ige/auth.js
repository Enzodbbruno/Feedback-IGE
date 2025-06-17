// Importa a configuração do Firebase
import firebaseConfig from './firebase-config.js';

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Função para fazer login
export async function loginWithEmailAndPassword(email, password) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw handleAuthError(error);
    }
}

// Função para criar nova conta
export async function createAccount(email, password) {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw handleAuthError(error);
    }
}

// Função para redefinir senha
export async function resetPassword(email) {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        return true;
    } catch (error) {
        throw handleAuthError(error);
    }
}

// Função para verificar estado da autenticação
export function onAuthStateChanged(callback) {
    return firebase.auth().onAuthStateChanged(callback);
}

// Função para fazer logout
export async function logout() {
    try {
        await firebase.auth().signOut();
        return true;
    } catch (error) {
        throw handleAuthError(error);
    }
}

// Função para tratar erros de autenticação
function handleAuthError(error) {
    let message = 'Ocorreu um erro durante a autenticação.';
    
    switch (error.code) {
        case 'auth/user-not-found':
            message = 'Usuário não encontrado.';
            break;
        case 'auth/wrong-password':
            message = 'Senha incorreta.';
            break;
        case 'auth/invalid-email':
            message = 'Email inválido.';
            break;
        case 'auth/email-already-in-use':
            message = 'Este email já está em uso.';
            break;
        case 'auth/weak-password':
            message = 'A senha é muito fraca.';
            break;
        case 'auth/too-many-requests':
            message = 'Muitas tentativas de login. Tente novamente mais tarde.';
            break;
    }
    
    return new Error(message);
} 