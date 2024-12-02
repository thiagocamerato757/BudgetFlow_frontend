import { RECEITA_URL, EDITARECEITA_URL, REMOVERECEITA_URL } from "./constantes";

// Função para buscar receitas da API
async function fetchReceitas() {
    // Obtém o token do localStorage
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(RECEITA_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`, // Adiciona o token no cabeçalho
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar receitas");
        }

        const receitas = await response.json();
        displayReceitas(receitas);
    } catch (error) {
        console.error("Erro ao buscar receitas:", error);
    }
}

// Função para exibir receitas na tabela
function displayReceitas(receitas: any[]) {
    const table = document.querySelector("table");

    if (!table) {
        console.error("Tabela não encontrada.");
        return;
    }

    receitas.forEach(receita => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", receita.id);

        const descricaoCell = document.createElement("td");
        descricaoCell.textContent = receita.descricao;
        row.appendChild(descricaoCell);

        const valorCell = document.createElement("td");
        valorCell.textContent = receita.valor.toFixed(2);
        row.appendChild(valorCell);

        const dataCell = document.createElement("td");
        dataCell.textContent = receita.data;
        row.appendChild(dataCell);

        const categoriaCell = document.createElement("td");
        categoriaCell.textContent = receita.categoria;
        row.appendChild(categoriaCell);

        const acoesCell = document.createElement("td");
        const editarButton = document.createElement("button");
        editarButton.textContent = "Editar";
        editarButton.onclick = () => {
            window.location.href = `${EDITARECEITA_URL}${receita.id}/`;
        };
        acoesCell.appendChild(editarButton);

        const removerButton = document.createElement("button");
        removerButton.textContent = "Remover";
        removerButton.onclick = () => {
            if (confirm("Tem certeza que deseja remover?")) {
                // Função para remover receita
                removeReceita(receita.id);
            }
        };
        acoesCell.appendChild(removerButton);

        row.appendChild(acoesCell);

        table.appendChild(row);
    });
}

// Função para remover receita
async function removeReceita(id: number) {
    // Obtém o token do localStorage
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(`${REMOVERECEITA_URL}${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`, // Adiciona o token no cabeçalho
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao remover receita");
        }

        // Remover a linha da tabela
        const row = document.querySelector(`tr[data-id="${id}"]`);
        if (row) {
            row.remove();
        }
    } catch (error) {
        console.error("Erro ao remover receita:", error);
    }
}

// Executar a verificação ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    fetchReceitas();
});