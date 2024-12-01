import { IS_LOGGED_IN_URL, LOGOUT_URL } from "./constantes.js";
// Selecionar o elemento do menu de navegação no DOM
const navElement = document.querySelector("header nav");
const msgBoasVindas = document.getElementById("mensagem");
function hideLoginAndSignupLinks() {
    const loginLink = document.querySelector('nav a[href="login.html"]');
    const signupLink = document.querySelector('nav a[href="cadastro.html"]');
    if (loginLink) {
        loginLink.style.display = "none";
    }
    if (signupLink) {
        signupLink.style.display = "none";
    }
}
function showLoginAndSignupLinks() {
    const loginLink = document.querySelector('nav a[href="login.html"]');
    const signupLink = document.querySelector('nav a[href="cadastro.html"]');
    if (loginLink) {
        loginLink.style.display = "inline"; // Torna visível novamente
    }
    if (signupLink) {
        signupLink.style.display = "inline"; // Torna visível novamente
    }
}
// Função para verificar se o usuário está autenticado
async function checkAuthentication() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.log("Token não encontrado. Usuário não autenticado.");
        genericmessage();
        removeLogoutButton();
        return;
    }
    try {
        const response = await fetch(IS_LOGGED_IN_URL, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            if (data.is_authenticated) {
                console.log("Usuário autenticado:", data.user_id);
                updateNavbarForAuthenticatedUser();
                updatename(data.username);
            }
            else {
                console.log("Usuário não autenticado.");
                removeLogoutButton();
            }
        }
        else {
            console.log("Falha ao verificar autenticação.");
            removeLogoutButton();
            genericmessage();
        }
    }
    catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        removeLogoutButton();
        genericmessage();
    }
}
// Atualizar a barra de navegação para usuários autenticados
function updateNavbarForAuthenticatedUser() {
    hideLoginAndSignupLinks(); // Oculta os links de login e cadastro
    // Verificar se o botão "Sair" já existe para evitar duplicatas
    if (!document.getElementById("logout-button") && navElement) {
        const logoutLink = document.createElement("a");
        logoutLink.href = "#";
        logoutLink.id = "logout-button";
        logoutLink.textContent = "Sair";
        // Adicionar o evento de logout ao link
        logoutLink.addEventListener("click", (event) => {
            event.preventDefault(); // Previne o comportamento padrão
            logoutUser();
        });
        // Adicionar o link "Sair" ao menu de navegação
        navElement.appendChild(logoutLink);
    }
}
// Remover o botão "Sair" caso o usuário não esteja autenticado
function removeLogoutButton() {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.remove(); // Remove o botão "Sair" do DOM
    }
    showLoginAndSignupLinks(); // Exibe novamente os links
}
// Função para deslogar o usuário
async function logoutUser() {
    const token = localStorage.getItem("authToken");
    if (!token)
        return;
    try {
        const response = await fetch(LOGOUT_URL, {
            method: "DELETE",
            headers: {
                Authorization: `token ${token}`,
            },
        });
        if (response.ok) {
            alert("Usuário deslogado com sucesso.");
            localStorage.removeItem("authToken");
            window.location.reload(); // Recarrega a página
        }
        else {
            const errorData = await response.json();
            alert(`Erro ao deslogar: ${errorData.error || "Desconhecido"}`);
        }
    }
    catch (error) {
        alert(`Erro de rede: ${error}`);
    }
}
function updatename(name) {
    msgBoasVindas.textContent = `Bem-vindo ao Budget Flow ${name}!`;
}
function genericmessage() {
    msgBoasVindas.textContent = "Bem Vindo ao Budget Flow, Visitante!";
}
// Executar a verificação ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    checkAuthentication();
});
