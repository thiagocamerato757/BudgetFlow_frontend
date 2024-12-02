import { LOGIN_URL } from "./constantes.js";
// Elementos do DOM
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const nonFieldErrors = document.getElementById("non-field-errors");
// Manipulador de envio do formulário
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário
    // Dados do formulário
    const loginData = {
        username: usernameInput.value,
        password: passwordInput.value,
    };
    try {
        // Envia os dados para a API
        const response = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });
        const data = await response.json();
        if (response.ok) {
            // Login bem-sucedido
            alert("Usuário autenticado e logado com sucesso!");
            const { token, user_id } = data; // Extrai o token e o ID do usuário
            localStorage.setItem("authToken", token); // Armazena o token no localStorage
            console.log(`Usuário ID: ${user_id}`);
            window.location.href = "/index.html"; // Redireciona para a página principal
        }
        else {
            if (!data.username || !data.password) {
                console.log("data: ", data);
                alert("Usuário ou senha inválidos.");
            }
        }
    }
    catch (error) {
        console.error("Erro ao tentar logar:", error);
        nonFieldErrors.textContent = "Erro inesperado. Por favor, tente novamente mais tarde.";
        nonFieldErrors.classList.add("visible");
    }
});
