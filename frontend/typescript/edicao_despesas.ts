import { EDITADESPESA_URL} from "./constantes";

// Elementos do DOM
const form = document.getElementById("editar_despesa") as HTMLFormElement;
const descricaoInput = document.getElementById("descricao") as HTMLInputElement;
const valorInput = document.getElementById("valor") as HTMLInputElement;
const dataInput = document.getElementById("data") as HTMLInputElement;
const categoriaSelect = document.getElementById("categoria") as HTMLSelectElement;

// Obtém o ID da receita da URL
const urlParams = new URLSearchParams(window.location.search);
const despesaId = urlParams.get("id");

// Função para buscar os dados da receita existente
async function fetchDespesa() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(`${EDITADESPESA_URL}${despesaId}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar despesa");
        }

        const despesa = await response.json();
        preencherFormulario(despesa);
    } catch (error) {
        console.error("Erro ao buscar despesa:", error);
    }
}

// Função para preencher o formulário com os dados da receita
function preencherFormulario(despesa: any) {
    descricaoInput.value = despesa.descricao;
    valorInput.value = despesa.valor;
    dataInput.value = despesa.data;
    categoriaSelect.value = despesa.categoria;
}

// Manipulador de envio do formulário
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Dados do formulário
    const despesaData = {
        descricao: descricaoInput.value,
        valor: parseFloat(valorInput.value),
        data: dataInput.value,
        categoria: categoriaSelect.value,
    };

    // Obtém o token do localStorage
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);

    // Converte os dados do formulário para JSON
    const requestBody = JSON.stringify(despesaData);
    console.log("Request Body:", requestBody);

    try {
        // Envia os dados atualizados para a API
        const response = await fetch(`${EDITADESPESA_URL}${despesaId}/`, {
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
        window.location.href = "/listar_despesas.html"; // Redireciona para a página de listagem de receitas
    } catch (error: any) {
        console.error("Erro ao editar despesa:", error);
        alert("Erro ao editar receita. Verifique os dados e tente novamente.");
    }
});

// Executar a busca dos dados da receita ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    fetchDespesa();
});