import { ADDRECEITA_URL } from "./constantes";

// Elementos do DOM
const form = document.getElementById("adicionar_receita") as HTMLFormElement;
const descricaoInput = document.getElementById("descricao") as HTMLInputElement;
const valorInput = document.getElementById("valor") as HTMLInputElement;
const dataInput = document.getElementById("data") as HTMLInputElement;
const categoriaInput = document.getElementById("categoria") as HTMLInputElement;
const errorMessage = document.querySelector(".error-message") as HTMLElement;
const listaErros = document.querySelector(".lista_erros") as HTMLElement;

// Manipulador de envio do formulário
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Limpa mensagens de erro anteriores
    listaErros.innerHTML = "";
    errorMessage.style.display = "none";

    // Dados do formulário
    const receitaData = {
        descricao: descricaoInput.value,
        valor: parseFloat(valorInput.value),
        data: dataInput.value,
        categoria: categoriaInput.value,
    };
    console.log("Dados da receita:", receitaData);
    // Obtém o token do localStorage
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);
    try {
        // Envia os dados para a API
        const response = await fetch(ADDRECEITA_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`, // Adiciona o token no cabeçalho
            },
            body: JSON.stringify(receitaData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Response:", response); // Adiciona o print da response
            throw new Error(errorData.message || "Erro ao adicionar receita");
        }

        // Receita adicionada com sucesso
        alert("Receita adicionada com sucesso!");
        window.location.href = "/listar_receitas.html"; // Redireciona para a página de listagem de receitas
    } catch (error: any) {
        console.error("Erro ao adicionar receita:", error);
        listaErros.innerHTML = `<li>${error.message}</li>`;
        errorMessage.style.display = "block";
    }
});