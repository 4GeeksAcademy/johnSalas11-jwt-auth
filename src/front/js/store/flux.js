const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: null,
		},
		actions: {
			login: (email, password, navigate) => {
				const resp = fetch(`${process.env.BACKEND_URL}api/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				});

				resp.then(response => {
					if (!response.ok) {
						throw new Error("Error al iniciar sesión");
					}

					return response.json();
				})
				.then(data => {
					console.log("Inicio de sesión exitoso:", data);

					const token = data.token;
					if (!token) {
						throw new Error("No se recibió el token");
					}

					localStorage.setItem("token", token);
					setStore({ token });

					const actions = getActions();
					actions.getUser();
					navigate("/dashboard");
				})
				.catch(error => {
					console.log("Error al iniciar sesión", error);
					alert("Error al iniciar sesión");
				});
			},
			signup: (dataUser, navigate) => {
				const resp = fetch(`${process.env.BACKEND_URL}api/signup`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataUser)
				});

				resp.then(response => {
					if (!response.ok) {
						throw new Error("Error en el registro");
					}

					return response.json();
				})
				.then(data => {
					console.log("Usuario registrado exitosamente", data);

					const token = data.token;
					if (!token) {
						throw new Error("No se recibió el token");
					}

					localStorage.setItem("token", token);
					setStore({ token });

					const actions = getActions();
					actions.getUser();
					navigate("/dashboard");
				})
				.catch(error => {
				});
			},
			getUser: () => {
				const token = localStorage.getItem("token");
				if (!token) {
					console.log("No token found");
					return;
				}

				const resp = fetch(`${process.env.BACKEND_URL}api/user`, {
					headers: {
						"Authorization": `Bearer ${token}`
					}
				});

				resp.then(response => {
					if (!response.ok) {
						throw new Error("Error al obtener el usuario");
					}

					return response.json();
				})
				.then(data => {
					setStore({ user: data });
				})
				.catch(error => {
					console.log("Error al obtener usuario", error);
				});
			},
			logout: () => {
				localStorage.removeItem('token');
				setStore({token: null, user: null});
			},
		}
	};
};

export default getState;
