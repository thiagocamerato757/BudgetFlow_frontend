import { EDITARECEITA_URL } from "./constantes.js";
// Elementos do DOM
const form = document.getElementById("editar_receita");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const dataInput = document.getElementById("data");
const categoriaInput = document.getElementById("categoria");
const errorMessage = document.querySelector(".error-message");
const listaErros = document.querySelector(".lista_erros");
// Obtém o ID da receita da URL
const urlParams = new URLSearchParams(window.location.search);
const receitaId = urlParams.get("id");
// Função para buscar os dados da receita existente
async function fetchReceita() {
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`${EDITARECEITA_URL}${receitaId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar receita");
        }
        const receita = await response.json();
        preencherFormulario(receita);
    }
    catch (error) {
        console.error("Erro ao buscar receita:", error);
    }
}
// Função para preencher o formulário com os dados da receita
function preencherFormulario(receita) {
    descricaoInput.value = receita.descricao;
    valorInput.value = receita.valor;
    dataInput.value = receita.data;
    categoriaInput.value = receita.categoria;
}
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
    // Obtém o token do localStorage
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);
    // Converte os dados do formulário para JSON
    const requestBody = JSON.stringify(receitaData);
    console.log("Request Body:", requestBody);
    try {
        // Envia os dados atualizados para a API
        const response = await fetch(`${EDITARECEITA_URL}${receitaId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: requestBody,
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.log("Response:", response);
            throw new Error(errorData.message || "Erro ao editar receita");
        }
        // Receita editada com sucesso
        alert("Receita editada com sucesso!");
        window.location.href = "/listar_receitas.html"; // Redireciona para a página de listagem de receitas
    }
    catch (error) {
        console.error("Erro ao editar receita:", error);
        listaErros.innerHTML = `<li>${error.message}</li>`;
        errorMessage.style.display = "block";
    }
});
// Executar a busca dos dados da receita ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    fetchReceita();
});
