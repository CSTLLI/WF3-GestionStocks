/* ************************************************************************************** */
/*                                                                                        */																					  
/* Project: GestionStocks                               / $$      /$$ /$$$$$$$$ /$$$$$$   */
/*                  			                        | $$  /$ | $$| $$_____//$$__  $$  */
/* script.js                                     	    | $$ /$$$| $$| $$     |__/  \ $$  */
/*                                                  	| $$/$$ $$ $$| $$$$$     /$$$$$/  */
/* By: vcastell <valeriocastellipro@gmail.com>	        | $$$$_  $$$$| $$__/    |___  $$  */
/*                                              		| $$$/ \  $$$| $$      /$$  \ $$  */
/* Created: 2022/02/02 10:41:35 vcastell     	        | $$/   \  $$| $$     |  $$$$$$/  */
/* Updated: 2022/02/02 11:21:38 vcastell                |__/     \__/|__/      \______/   */
/*                                                                    				      */
/******************************************************************************************/

const form = document.querySelector("form");

const btnAddItem = document.querySelector("#add");
const btnEditItem = document.querySelector("#edit");

let alert = document.querySelector("#alert");

let inputRef = document.querySelector("#inputReference");
let inputName = document.querySelector("#inputName");
let inputPrice = document.querySelector("#inputPrice");


let stock = new Products();

stock.newProduct("1", "Clavier", "110");
stock.newProduct("2", "Souris", "90");
stock.newProduct("3", "Lampe de bureau", "120");
stock.newProduct("4", "PC Gamer", "1140");
stock.newProduct("5", "Voiture", "11560");
stock.newProduct("6", "Voiture 2", "17560");
stock.newProduct("7", "Voiture 3", "8500");

ViewArticles(stock.getStock());


// FONCTIONS

function ViewArticles(tab) {
	let tbody = document.querySelector("tbody");

	if (tab.length == 0){
		tbody.innerHTML = `<div class="py-3">Aucun stock.</div>`;
	}else{
		tbody.innerHTML = '';

		for (i = 0; i < tab.length; i++){
			item = tab[i];

			tbody.innerHTML += 
								`
									<tr>
										<td scope="row"></td>
										<td scope="row">${item[0]}</td>
										<td scope="row">${item[1]}</td>
										<td scope="row">${item[2]}</td>
										<td scope="row"><i class="bi bi-pencil"></i></td>
										<td scope="row"><i class="bi bi-trash"></i></td>						
									</tr>
								`
		}
	}

	let btnRemove = document.querySelectorAll(".bi-trash");
	// console.log(btnRemove);

	btnRemove.forEach(element => {
		element.addEventListener("click", function(){
			let ref = element.parentElement.parentElement.children[1].innerText;
			// console.log(ref);
			
			stock.removeProduct(ref);

			// console.log(stock.getStock());
			ViewArticles(stock.getStock());
		})
	})

	let btnEdit = document.querySelectorAll(".bi-pencil");
	// console.log(btnEdit);

	btnEdit.forEach(element => {
		element.addEventListener("click", function(){
			let ref = element.parentElement.parentElement.children[1].innerText;
			//console.log(ref);

			let article = stock.searchByRef(ref);
			let prop = article[0];
			// console.log(prop[1]);

			inputRef.value = prop[0];
			inputName.value = prop[1];
			inputPrice.value = prop[2];

			inputRef.disabled = "true";

			btnAddItem.classList.remove("d-block");
			btnAddItem.classList.add("d-none");

			btnEditItem.classList.remove("d-none");
			btnEditItem.classList.add("d-block");

			btnEditItem.addEventListener('click', function(){
				// console.log("sauvegardé");

				stock.editProduct(inputRef.value, inputName.value, inputPrice.value);

				inputRef.disabled = "true";
				
				btnAddItem.classList.remove("d-none");
				btnAddItem.classList.add("d-block");
	
				btnEditItem.classList.remove("d-block");
				btnEditItem.classList.add("d-none");

				ViewArticles(stock.getStock());
				form.reset();
			})		
		})
	})
}

// EVENTS

btnAddItem.addEventListener("click", function(){

	let reponse = stock.newProduct(inputRef.value, inputName.value, inputPrice.value);

	if (reponse == false) {
		alert.classList.remove('d-none');
	}else{
		ViewArticles(stock.getStock());
		// Initialisation des champs de saisie
		form.reset();
	}
});

searchBarRef.addEventListener('input', function() {

	const searchBarRef = document.querySelector("#searchBarRef").value;
	// console.log(searchBarRef);

	const result = stock.searchByRef(searchBarRef);

	if (result !== null){
		ViewArticles(result);
	}
})


searchBarName.addEventListener("input", function(){

	const searchBarName = document.querySelector("#searchBarName").value;
	// console.log(searchBarName);

	const result = stock.searchByName(searchBarName);

	if (result != null){
		ViewArticles(result);
	}
})

const searchBarPrice = document.querySelectorAll("#searchBarPriceMin, #searchBarPriceMax");

searchBarPrice.forEach(element => {
	element.addEventListener("input", function(){

		let searchBarPriceMin = document.querySelector("#searchBarPriceMin").value;
		let searchBarPriceMax = document.querySelector("#searchBarPriceMax").value;

		// console.log(searchBarPriceMin, searchBarPriceMax);

		result = stock.searchByPrice(searchBarPriceMin, searchBarPriceMax);

		if (result != null){
			ViewArticles(result);
		}
	})	
})
