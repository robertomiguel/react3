//import fetch from 'isomorphic-fetch';

const rutaMenuPrincipal = `http://${location.hostname}`

//console.log(location.hostname)

const api = {
	menu: {
					async getLista() {
									const datos = await fetch(`${rutaMenuPrincipal}/menu_principal.php`, {
															  method: 'GET',
																credentials: 'include'
															})
															  .then((response) => {
																	const data  = response.json();
																	return data
															  }).catch((err) => {
															    console.log(err)
																	return 'error'
																});
									return datos
					},
	}
}

export default api;
