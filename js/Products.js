/* ************************************************************************************** */
/*                                                                                        */																					  
/* Project: GestionStocks                               / $$      /$$ /$$$$$$$$ /$$$$$$   */
/*                  			                        | $$  /$ | $$| $$_____//$$__  $$  */
/* product.js                                     	    | $$ /$$$| $$| $$     |__/  \ $$  */
/*                                                  	| $$/$$ $$ $$| $$$$$     /$$$$$/  */
/* By: vcastell <valeriocastellipro@gmail.com>	        | $$$$_  $$$$| $$__/    |___  $$  */
/*                                              		| $$$/ \  $$$| $$      /$$  \ $$  */
/* Created: 2022/02/02 10:41:35 vcastell     	        | $$/   \  $$| $$     |  $$$$$$/  */
/* Updated: 2022/02/02 11:21:38 vcastell                |__/     \__/|__/      \______/   */
/*                                                                    				      */
/******************************************************************************************/

class Products {
	constructor(){
		this.products = [];
	}

	newProduct(ref, name, price) {
		if (this.products.length != 0) {
			const articles = this.products.map(article => article.includes(ref));

			if (articles.includes(true)) {
				return false;
			}
			else {
				this.products = [...this.products, ...[[ref, name, price]]]
			}
		}
		else {
			this.products = [[ref, name, price]];
		}
		return true;
	}

	getStock() {
		return this.products;
	}

	searchByRef(reference) {
		const result = this.products.filter(element => {
			if (element[0].includes(reference)) {
				return element;
			}
		});

		// console.log(result);
		return result;
	}

	searchByName(name) {
		const result = this.products.filter(element => {
			if (element[1].includes(name)) {
				return element;
			}
		});

		// console.log(result);
		return result;
	}

	searchByPrice(min, max) {
		const result = this.products.filter(element => {

			let valeur = parseInt(element[2]);

			console.clear();
			console.log(valeur, "plus petit: ", valeur <= max);
			console.log(valeur, "plus grand: ", valeur >= min);

			if (valeur >= min && valeur <= max){
				console.log(element);
				return element;
			}
		});

		// console.log(result);
		return result;
	}

	removeProduct(ref) {
		this.products.filter(element => {
			if (element[0].includes(ref)) {

				this.products.splice((ref -1), 1);
				// console.log(element);
			}
		})
	}
}