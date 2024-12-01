import { LOGIN_URL } from "./constantes";
// Elementos do DOM
const loginForm = document.getElementById("login-form") as HTMLFormElement;
const usernameInput = document.getElementById("username") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const usernameErrors = document.getElementById("username-errors") as HTMLElement;
const passwordErrors = document.getElementById("password-errors") as HTMLElement;
const nonFieldErrors = document.getElementById("non-field-errors") as HTMLElement;

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
        } else {
            if (!data.username || !data.password) {
                console.log("data: ", data);
                alert("Usuário ou senha inválidos.");
            }
        }
    } catch (error: any) {
        console.error("Erro ao tentar logar:", error);
        nonFieldErrors.textContent = "Erro inesperado. Por favor, tente novamente mais tarde.";
        nonFieldErrors.classList.add("visible");
    }
});