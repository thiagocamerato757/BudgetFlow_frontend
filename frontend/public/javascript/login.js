import { LOGIN_URL } from "./constantes.js";
// Elementos do DOM
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameErrors = document.getElementById("username-errors");
const passwordErrors = document.getElementById("password-errors");
const nonFieldErrors = document.getElementById("non-field-errors");
// Manipulador de envio do formulário
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário
    // Limpa mensagens de erro anteriores
    usernameErrors.textContent = "";
    usernameErrors.classList.remove("visible");
    passwordErrors.textContent = "";
    passwordErrors.classList.remove("visible");
    nonFieldErrors.textContent = "";
    nonFieldErrors.classList.remove("visible");
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
            // Tratamento de erros de validação
            if (data.username) {
                usernameErrors.textContent = Array.isArray(data.username)
                    ? data.username.join(", ")
                    : data.username;
            }
            else {
                usernameErrors.classList.remove("visible");
            }
            if (data.password) {
                passwordErrors.textContent = Array.isArray(data.password)
                    ? data.password.join(", ")
                    : data.password;
                passwordErrors.classList.add("visible");
            }
            else {
                passwordErrors.classList.remove("visible");
            }
            if (data.non_field_errors) {
                nonFieldErrors.textContent = data.non_field_errors.join(", ");
                nonFieldErrors.classList.add("visible");
            }
            else {
                nonFieldErrors.classList.remove("visible");
            }
        }
    }
    catch (error) {
        console.error("Erro ao tentar logar:", error);
        nonFieldErrors.textContent = "Erro inesperado. Por favor, tente novamente mais tarde.";
        nonFieldErrors.classList.add("visible");
    }
});
