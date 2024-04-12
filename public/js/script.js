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
 
getAllPessoas(); 