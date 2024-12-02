import { DESPESAS_URL, REMOVEDESPESA_URL } from "./constantes.js";
// Função para buscar despesas da API
async function fetchDespesas() {
    // Obtém o token do localStorage
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(DESPESAS_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`, // Adiciona o token no cabeçalho
            },
        });
        if (!response.ok) {
            throw new Error("Erro ao buscar despesas");
        }
        const despesas = await response.json();
        displayDespesas(despesas);
    }
    catch (error) {
        console.error("Erro ao buscar despesas:", error);
    }
}
// Função para exibir despesas na tabela
function displayDespesas(despesas) {
    const table = document.querySelector("table");
    if (!table) {
        console.error("Tabela não encontrada.");
        return;
    }
    despesas.forEach(despesa => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", despesa.id);
        const descricaoCell = document.createElement("td");
        descricaoCell.textContent = despesa.descricao;
        row.appendChild(descricaoCell);
        const valorCell = document.createElement("td");
        valorCell.textContent = despesa.valor.toFixed(2);
        row.appendChild(valorCell);
        const dataCell = document.createElement("td");
        dataCell.textContent = despesa.data;
        row.appendChild(dataCell);
        const categoriaCell = document.createElement("td");
        categoriaCell.textContent = despesa.categoria;
        row.appendChild(categoriaCell);
        const acoesCell = document.createElement("td");
        const editarButton = document.createElement("button");
        editarButton.textContent = "Editar";
        editarButton.onclick = () => {
            window.location.href = `/editar_despesa/${despesa.id}`;
        };
        acoesCell.appendChild(editarButton);
        const removerButton = document.createElement("button");
        removerButton.textContent = "Remover";
        removerButton.onclick = () => {
            if (confirm("Tem certeza que deseja remover?")) {
                // Função para remover despesa
                removeDespesa(despesa.id);
            }
        };
        acoesCell.appendChild(removerButton);
        row.appendChild(acoesCell);
        table.appendChild(row);
    });
}
// Função para remover despesa
async function removeDespesa(id) {
    // Obtém o token do localStorage
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`${REMOVEDESPESA_URL}${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`, // Adiciona o token no cabeçalho
            },
        });
        if (!response.ok) {
            throw new Error("Erro ao remover despesa");
        }
        // Remover a linha da tabela
        const row = document.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            row.remove();
        }
    }
    catch (error) {
        console.error("Erro ao remover despesa:", error);
    }
}
// Executar a verificação ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    fetchDespesas();
});
