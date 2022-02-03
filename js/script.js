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
const btnAddItem = document.querySelector(".btn-primary");

let stock = new Products();

stock.newProduct("1", "roues", "110");
stock.newProduct("2", "pare-choc", "90");
stock.newProduct("3", "jantes", "110");
stock.newProduct("4", "rétroviseurs", "1140");
stock.newProduct("5", "aileron", "11560");

ViewArticles(stock.getStock());

// FONCTIONS

function ViewArticles(tab) {
	// tab = stock.getStock();
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
}

// EVENTS

btnAddItem.addEventListener("click", function(){

	let alert = document.querySelector("#alert");

	let ref = document.querySelector("#inputReference").value;
	let name = document.querySelector("#inputName").value;
	let price = document.querySelector("#inputPrice").value;

	let reponse = stock.newProduct(ref, name, price);

	if (reponse == false) {
		alert.classList.remove('d-none');
	}else{
		ViewArticles(stock.getStock());
		// Initialisation des champs de saisie
		form.reset();
	}

});

searchBarRef.addEventListener("input", function(){

	let searchBarRef = document.querySelector("#searchBarRef").value;
	// console.log(searchBarRef);

	const result = stock.searchByRef(searchBarRef);

	if (result != null){
		ViewArticles(result);
	}
})

searchBarName.addEventListener("input", function(){

	let searchBarName = document.querySelector("#searchBarName").value;
	// console.log(searchBarName);

	result = stock.searchByName(searchBarName);

	if (result != null){
		ViewArticles(result);
	}
})

// console.log(searchBarName);

let searchBarPrice = document.querySelectorAll("#searchBarPriceMin, #searchBarPriceMax");

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

let btnRemove = document.querySelectorAll(".bi-trash");
// console.log(btnRemove);

btnRemove.forEach(element => {
	element.addEventListener("click", function(){

		let ref = element.parentElement.parentElement.children[1].innerText;
		// console.log(ref);

		stock.removeProduct(ref);

		result = stock.getStock();
		if (result != null){
			ViewArticles(result);
		}
	})
})