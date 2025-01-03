const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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
			auth: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			createuser: (inputEmail, inputPassword) => {
				fetch(process.env.BACKEND_URL + "/api/singup", 
					{method: 'POST', 
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
						   "email": inputEmail,
						   "password": inputPassword
					   
					   }),
					   redirect: "follow"
					   })
					   .then((response) => {
						console.log(response.status)
						if (response.status == 200) {
							setStore({ auth: true })
						}
						return response.json()
					})
			},
			logout: () => {
				console.log("logout")
				localStorage.removeItem("token");
				setStore({ auth: false })
			},

			login: (inputEmail, inputPassword) => {
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": inputEmail,
						"password": inputPassword
					}),
					redirect: "follow"
				})
					.then((response) => {
						console.log(response.status)
						if (response.status == 200) {
							setStore({ auth: true })
						}
						return response.json()
					})
					.then((data) => {
						localStorage.setItem("token", data.access_token);
						console.log(data.access_token)
						console.log(data)
					})
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
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
			}
		}
	};
};

export default getState;