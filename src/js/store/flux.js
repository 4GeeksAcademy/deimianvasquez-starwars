const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			urlBase: "https://www.swapi.tech/api",
			people: JSON.parse(localStorage.getItem("people")) || []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				Raquila
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getAllPeople: async () => {
				const store = getStore()
				try {
					if (store.people <= 0) {
						let response = await fetch(`${store.urlBase}/people`)
						let data = await response.json()

						for (let item of data.results) {
							let responseDetail = await fetch(`${item.url}`)
							let dataDetail = await responseDetail.json()
							console.log(dataDetail.result)
							setStore({
								people: [...store.people, dataDetail.result]
							})
						}

						localStorage.setItem("people", JSON.stringify(store.people))
					}


				} catch (error) {
					console.log(error)
				}
			}
		}
	};
};

export default getState;
