const urlApi =
				"http://localhost:3000/pessoas";

        document.getElementById("formPessoa").style = "display: none";

			formPessoa = document.querySelector("#formPessoa");

			formPessoa.addEventListener("submit", function (e) {
				e.preventDefault(); // Previne o envio do form

				const formData = new FormData(formPessoa); // Cria um objeto FormData com os dados do formulário

				const pessoa = Object.fromEntries(formData); // Converte o objeto FormData em um objeto JavaScript


				fetch(urlApi, {
					method: "POST", 
					headers: {
						"Content-Type": "application/json", // Tipo de conteúdo dos dados
					},
					body: JSON.stringify(pessoa), // Converte o objeto JavaScript em uma string JSON
				}).then((res) => {
					getAllPessoas(); // atualiza a tabela
				});
			});


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

// Buscar pessoas ao carregar a página

function mostrarForm(){
  console.log("mostrei form subiu table");
	document.getElementById('formPessoa').style = "display: block"
	document.getElementById('tablePessoa').style = "display: none"
}

function mostrarTable(){
  console.log("mostrei table subiu ");
  document.getElementById('tablePessoa').style = "display: block"
  document.getElementById('formPessoa').style = "display: none"
}
function editarPessoa(id){
console.log("editando",id)
}
function excluirPessoa(id) {
	console.log("excluindo", id);
	fetch(urlApi + id, { method: "DELETE" }).then((res) => {
		console.log("ta indo", res);
		getAllPessoas();
	});
}
 
getAllPessoas(); 