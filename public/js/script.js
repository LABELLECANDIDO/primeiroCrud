//definindo a url
const url = "/pessoas/";

// Obtém o elemento <form> do DOM para manipulação posterior
const formPessoa = document.querySelector("form");

// Obtém o botão de salvar do DOM para manipulação posterior
const salvarPessoaBtn = document.getElementById("salvarPessoa");

formPessoa.addEventListener("submit", (event) => {
    event.preventDefault();

	// Cria um objeto FormData a partir dos dados do formulário
    const dataPessoa = new FormData(formPessoa);

	 // Converte os dados do FormData em um objeto JavaScript
    const dataPost = Object.fromEntries(dataPessoa);

	// Verifica se os campos do formulário são válidos
    if (validarCampos()) {
        if (salvarPessoaBtn.innerText === "Salvar") {
            salvarPessoa(dataPost);
        } else {
            atualizarPessoa(dataPost);
        }
    } else {
		 // Se os campos não forem válidos, exibe uma mensagem de aviso
        Swal.fire("Atenção!", "Por favor, preencha todos os campos.", "warning");
    }
});


// Função para validar se os campos do formulário estão preenchidos
function validarCampos() {
    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const email = document.getElementById("email").value.trim();
    return nome !== "" && idade !== "" && email !== "";
}


function mostrarForm(status) {
    salvarPessoaBtn.innerHTML = `<i class="fas fa-plus"></i> ${status}` ;
    formPessoa.style.display = "block";
    document.getElementById("tablePessoa").style.display = "none";
}

function mostrarTable() {
    formPessoa.style.display = "none";
    document.getElementById("tablePessoa").style.display = "block";
}

function salvarPessoa(dados) {
    fetch(url, {
        method: "POST",
        body: JSON.stringify(dados),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((pessoa) => {
        console.log(pessoa);
        formPessoa.reset();
        formPessoa.classList.remove("was-validated");
        mostrarTable();
        pegarPessoas();
        Swal.fire("Sucesso!", "Pessoa salva com sucesso.", "success");
    });
}

function atualizarPessoa(dados) {
    fetch(url + dados.id, {
        method: "PATCH",
        body: JSON.stringify(dados),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((pessoa) => {
        console.log(pessoa);
        formPessoa.reset();
        formPessoa.classList.remove("was-validated");
        mostrarTable();
        pegarPessoas();
        Swal.fire("Sucesso!", "Pessoa atualizada com sucesso.", "success");
    });
}

function pegarPessoas() {
    fetch(url)
    .then((res) => res.json())
    .then((pessoas) => {
        console.log(pessoas);
        let listaPessoas = "";
        for (let pessoa of pessoas) {
            listaPessoas += `
            <tr>
                <th scope="row">${pessoa.id}</th>
                <td>${pessoa.nome}</td>
                <td>${pessoa.idade}</td>
                <td>${pessoa.email}</td>
                <td>
                    <button onclick="editarPessoa(${pessoa.id})" class="btn btn-primary"><i class="fas fa-edit"></i></button>
                    <button onclick="deletarPessoa(${pessoa.id})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
            `;
        }
        document.querySelector("tbody").innerHTML = listaPessoas;
    });
}

function editarPessoa(id) {
    fetch(url + id)
    .then((res) => res.json())
    .then((pessoa) => {
        document.getElementById("idPessoa").value = pessoa.id;
        document.getElementById("nome").value = pessoa.nome;
        document.getElementById("idade").value = pessoa.idade;
        document.getElementById("email").value = pessoa.email;
        mostrarForm('Atualizar');
    });
}

function deletarPessoa(id) {
    fetch(url + id, {
        method: "DELETE",
    })
    .then(() => {
        pegarPessoas();
        Swal.fire("Sucesso!", "Pessoa deletada com sucesso.", "success");
    });
}

pegarPessoas();








/*

const urlApi ="/pessoas/";

document.getElementById("formPessoa").style = "display: none";

formPessoa = document.querySelector("#formPessoa");

formPessoa.addEventListener("submit", function (e) {
	e.preventDefault(); // Previne o envio do form
statusButton = document.getElementById("enviar").innerText;

	if(statusButton == "Salvar"){
		salvarPessoa();
	}else{
		atualizarPessoa();
	}
});
	function salvarPessoa(){
		const formData = new FormData(formPessoa); // Cria um objeto FormData com os dados do formulário

		const pessoa = Object.fromEntries(formData); // Converte o objeto FormData em um objeto JavaScript
	
		// Requisição POST para enviar a pessoa para o servidor
		fetch(urlApi, {
			method: "POST", // Método HTTP para enviar os dados
			headers: {
				"Content-Type": "application/json", // Tipo de conteúdo dos dados
			},
			body: JSON.stringify(pessoa), // Converte o objeto JavaScript em uma string JSON
		}).then((res) => {
			getAllPessoas(); // Chama a função getAllPessoas para atualizar a tabela
			mostrarTable()
		});
	}

	function atualizarPessoa(){
		const formData = new FormData(formPessoa); // Cria um objeto FormData com os dados do formulário

		const pessoa = Object.fromEntries(formData); // Converte o objeto FormData em um objeto JavaScript
		
		// let idPessoa = document.getElemetById("id").value = pessoa.id
		// Requisição POST para enviar a pessoa para o servidor
		fetch(urlApi+pessoa.idPessoa, {
			method: "PUT", // Método HTTP para enviar os dados
			headers: {
				"Content-Type": "application/json", // Tipo de conteúdo dos dados
			},
			body: JSON.stringify(pessoa), // Converte o objeto JavaScript em uma string JSON
		}).then((res) => {
			getAllPessoas(); // Chama a função getAllPessoas para atualizar a tabela
			mostrarTable()
		});
	}


function getAllPessoas() {
	fetch(urlApi)
		.then((res) => {
			return res.json();
		})
		.then((pessoas) => {
			let listData = ""; // encher de item conforme tamanho de pessoas[]
			tbody = document.querySelector("tbody");

			for (let pessoa of pessoas) {
				listData += `<tr>
					<td>${pessoa.id}</td>
					<td>${pessoa.nome}</td>
					<td>${pessoa.idade}</td>
					<td>${pessoa.email}</td>
					<td>
							<button onclick="editarPessoa(${pessoa.id})" type="button" class="btn btn-primary">Editar</button>
							<button onclick="excluirPessoa(${pessoa.id})" type="button" class="btn btn-danger">Excluir</button>
					</td>
			</tr>`;
			}

			tbody.innerHTML = listData;
		});
}

function mostrarForm() {
	console.log("mostrei form sumiu table");
	document.getElementById("formPessoa").style = "display: block";
	document.getElementById("tablePessoa").style = "display: none";
}

function mostrarTable() {
	console.log("mostrei table sumiu form");
	document.getElementById("tablePessoa").style = "display: block";
	document.getElementById("formPessoa").style = "display: none";
	document.getElementById("enviar").innerText = "Salvar";
}

function editarPessoa(id) {
	fetch(urlApi + id, { method: "GET" })
		.then((res) => {
			return res.json();
		})
		.then((pessoa) => {
			console.log(pessoa);
			document.getElementById("nome").value = pessoa.nome;
			document.getElementById("idade").value = pessoa.idade;
			document.getElementById("email").value = pessoa.email;
			document.getElementById("id").value = pessoa.id;
			document.getElementById("enviar").innerText = "Atualizar";
			mostrarForm()
		});
}


function excluirPessoa(id) {
	fetch(`${urlApi}/${id}`, { method:"DELETE"}).then((res) => {
		getAllPessoas();
	});
}
 
getAllPessoas(); */