import { EDITARECEITA_URL} from "./constantes";

// Elementos do DOM
const form = document.getElementById("editar_receita") as HTMLFormElement;
const descricaoInput = document.getElementById("descricao") as HTMLInputElement;
const valorInput = document.getElementById("valor") as HTMLInputElement;
const dataInput = document.getElementById("data") as HTMLInputElement;
const categoriaInput = document.getElementById("categoria") as HTMLInputElement;

// Obtém o ID da receita da URL
const urlParams = new URLSearchParams(window.location.search);
const receitaId = urlParams.get("id");

// Função para buscar os dados da receita existente
async function fetchReceita() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(`${EDITARECEITA_URL}${receitaId}/`, {
            method: "GET",
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
    } catch (error) {
        console.error("Erro ao buscar receita:", error);
    }
}

// Função para preencher o formulário com os dados da receita
function preencherFormulario(receita: any) {
    descricaoInput.value = receita.descricao;
    valorInput.value = receita.valor;
    dataInput.value = receita.data;
    categoriaInput.value = receita.categoria;
}

// Manipulador de envio do formulário
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

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
            alert("Erro ao editar receita. Verifique os dados e tente novamente.");
            throw new Error(errorData.message || "Erro ao editar receita");
        }

        // Receita editada com sucesso
        alert("Receita editada com sucesso!");
        window.location.href = "/listar_receitas.html"; // Redireciona para a página de listagem de receitas
    } catch (error: any) {
        console.error("Erro ao editar receita:", error);
        alert("Erro ao editar receita. Verifique os dados e tente novamente.");
    }
});

// Executar a busca dos dados da receita ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    fetchReceita();
});