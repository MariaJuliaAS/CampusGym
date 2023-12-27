let listaAlunos = JSON.parse(localStorage.getItem('@alunos')) || [];

function cadastrar() {
    let nome = document.querySelector('#inputName').value;
    let curso = document.querySelector('#inputCurso').value;
    let periodo = document.querySelector('#inputPeriodo').value;
    let turno = document.querySelector('#inputTurno').value;

    if (!nome || !curso || !periodo || !turno) {
        alert("Por favor, preencha todos os campos antes de cadastrar o aluno.");
        return;
    }


    const aluno = {
        nome: nome,
        curso: curso,
        periodo: periodo,
        turno: turno
    }

    listaAlunos.push(aluno);
    salvarDados();
    alert(`Aluno cadastrado: \nNome: ${nome}\nCurso: ${curso}\nPeríodo: ${periodo}\nTurno: ${turno}`);

    document.querySelector('#inputName').value = "";
    document.querySelector('#inputCurso').value = "";
    document.querySelector('#inputPeriodo').value = "";

    renderTabela();
}

function renderTabela() {
    let thead = document.querySelector('#thead');
    let tbody = document.querySelector('#tbody');
    let divSemAlunos = document.querySelector('#semAlunos');

    tbody.innerHTML = '';

    if(listaAlunos.length > 0){
        listaAlunos.map((aluno) => {
            let tr = document.createElement('tr');
            let posicao = listaAlunos.indexOf(aluno);
    
            let tdNome = document.createElement('td');
            tdNome.textContent = aluno.nome;
            tr.appendChild(tdNome);
    
            let tdCurso = document.createElement('td');
            tdCurso.textContent = aluno.curso;
            tr.appendChild(tdCurso);
    
            let tdPeriodo = document.createElement('td');
            tdPeriodo.textContent = aluno.periodo;
            tr.appendChild(tdPeriodo);
    
            let tdTurno = document.createElement('td');
            tdTurno.textContent = aluno.turno;
            tr.appendChild(tdTurno);
    
            /*BUTTON EXCLUIR*/
            let deleteElement = document.createElement('button');
            let deleteText = document.createTextNode('Excluir');
            deleteElement.appendChild(deleteText);
            deleteElement.setAttribute('onclick', `deletarAluno(${posicao})`);
    
            let tdAcao = document.createElement('td');
            tdAcao.appendChild(deleteElement);
            /*----------------------------*/
            /*BUTTON EDITAR*/
            let editElement = document.createElement('button');
            let editText = document.createTextNode('Editar');
            editElement.appendChild(editText);
            editElement.setAttribute('onclick', `editarAluno(${posicao})`);
            tdAcao.appendChild(editElement);
            tr.appendChild(tdAcao);
            /*----------------------------*/
    
            tbody.appendChild(tr);
        });

        if(divSemAlunos){
            divSemAlunos.innerHTML = '';
        }

    }else{
        thead.style.display = 'none';
        divSemAlunos.textContent = 'Sem alunos cadastrados';
    }
}

renderTabela();

function deletarAluno(posicao) {
    listaAlunos.splice(posicao, 1);
    renderTabela();
    salvarDados();
}

function editarAluno(posicao){
    const posicaoAluno = listaAlunos[posicao];

    const novoNome = prompt('Novo nome:', posicaoAluno.nome);
    const novoCurso = prompt('Novo curso:', posicaoAluno.curso);
    const novoPeriodo = prompt('Novo período:', posicaoAluno.periodo);
    const novoTurno = prompt('Novo turno:', posicaoAluno.turno);

    listaAlunos[posicao] = {
        nome: novoNome || posicaoAluno.nome,
        curso: novoCurso || posicaoAluno.curso,
        periodo: novoPeriodo || posicaoAluno.periodo,
        turno: novoTurno || posicaoAluno.turno,
    };

    salvarDados();
    renderTabela();
}

document.addEventListener('keyup', function(){
    let searchElement = document.querySelector('#inputSearch').value.toLowerCase();
    let trElement = document.getElementsByTagName('tr');

    for (let i = 1; i < trElement.length; i++) {
        let nameSearch = trElement[i].getElementsByTagName('td')[0].textContent.toLowerCase();
        let cursoSearch = trElement[i].getElementsByTagName('td')[1].textContent.toLowerCase();
        let periodoSearch = trElement[i].getElementsByTagName('td')[2].textContent.toLowerCase();
        let turnoSearch = trElement[i].getElementsByTagName('td')[3].textContent.toLowerCase();

        if(nameSearch.includes(searchElement) || cursoSearch.includes(searchElement) || periodoSearch.includes(searchElement) || turnoSearch.includes(searchElement)){
            trElement[i].style.display = '';
        }else{
            trElement[i].style.display = 'none';
        }
    }
})

function salvarDados() {
    localStorage.setItem('@alunos', JSON.stringify(listaAlunos));
}