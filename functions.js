const tarefainput = document.getElementById("tarefainput");
const listatarefas = document.getElementById("listatarefas");
const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


function AddTarefa() {
    const textotarefa = tarefainput.value.trim();
    if(textotarefa === "") {
        alert("Informe uma tarefa!")
        return
    }else{
        const tarefa = {text: textotarefa};
        tarefas.push(tarefa);

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        tarefainput.value = "";

        displayTarefas();
    }
}

function deleteTarefa(index){
    tarefas.splice(index, 1);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    displayTarefas();
}

function editTarefa(index){
    const novaTarefa = prompt("Editar a Tarefa: ", tarefas[index].text);

    if (novaTarefa !== null){
        tarefas[index].text = novaTarefa;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        displayTarefas();
    }    
}

// CRIA UMA TABELA COM AS TAREFAS E ELEMENTOS
function displayTarefas(){
    listatarefas.innerHTML = "";
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");
        li.innerHTML =  `
            <input type="checkbox" value="">
            <span class="marca_tarefa">${tarefa.text}</span>
            <hr>
            <button class="edit-button" onclick="editTarefa(${index})">Editar</button>
            <button class="delete-button" onclick="deleteTarefa(${index})">Deletar</button>
        `;
        listatarefas.appendChild(li);
    });

    //MARCA TAREFA COMO CONCLUIDA
    document.querySelectorAll('input[type=checkbox]').forEach((elemento) => {
        elemento.addEventListener('change', (e) => {
          var span = e.target.parentNode.querySelector('.marca_tarefa');
          span.style.textDecoration = (e.target.checked) ? "line-through" : "";         
        });
    });    
}

displayTarefas();
