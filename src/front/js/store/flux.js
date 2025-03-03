const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: null,
		},
		actions: {
			login: async (email, password, navigate) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					if (!resp.ok) {
						throw new Error("Error al iniciar sesión");
					}

					const data = await resp.json();
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
				} catch (error) {
					console.log("Error al iniciar sesión", error);
					alert("Error al iniciar sesión");
				}
			},
			signup: async (dataUser, navigate) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(dataUser)
					});
			
					if (!resp.ok) {
						throw new Error("Error en el registro");
					}
			
					const data = await resp.json();
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
				} catch (error) {
				}
			},
			getUser: async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) throw new Error("No token found");

					const resp = await fetch(`${process.env.BACKEND_URL}api/user`, {
						headers: {
							"Authorization": `Bearer ${token}`
						}
					});

					if (!resp.ok) throw new Error("Error al obtener el usuario");

					const data = await resp.json();
					setStore({ user: data });
				} catch (error) {
					console.log("Error al obtener usuario", error);
				}
			},
			logout: () => {
				localStorage.removeItem('token');
				setStore({token: null, user: null})
				
			},
		}
	};
};

export default getState;
