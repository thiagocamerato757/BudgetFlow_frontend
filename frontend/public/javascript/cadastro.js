import { REGISTRA_URL } from "./constantes";
// Elementos do DOM
const form = document.getElementById("cadastro-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("user_email");
const passwordInput = document.getElementById("password");
const errorMessage = document.querySelector(".error-message");
const listaErros = document.querySelector(".lista_erros");
// Manipulador de envio do formulário
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário
    // Limpa mensagens de erro anteriores
    listaErros.innerHTML = "";
    errorMessage.style.display = "none";
    // Dados do formulário
    const userData = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
    // Converte os dados do formulário para JSON
    const requestBody = JSON.stringify(userData);
    console.log("Request Body:", requestBody);
    try {
        // Envia os dados para a API
        const response = await fetch(REGISTRA_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.log("Response:", response); // Adiciona o print da response
            throw new Error(errorData.message || "Erro ao registrar usuário");
        }
        // Registro bem-sucedido
        alert("Usuário registrado com sucesso!");
        window.location.href = "/login.html"; // Redireciona para a página de login
    }
    catch (error) {
        console.error("Erro ao registrar usuário:", error);
        listaErros.innerHTML = `<li>${error.message}</li>`;
        errorMessage.style.display = "block";
    }
});