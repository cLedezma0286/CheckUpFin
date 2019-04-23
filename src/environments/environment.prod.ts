const BASE_URL = 'http://staging.api.premier.jaque.me/';
export const environment = {
  production: true,
  CLIENTS_URL: BASE_URL + 'clientes',
  NOTES_URL: BASE_URL + 'notas',
  AGREEMENTS_URL: BASE_URL + 'acuerdos',
  INTERVIEWS_URL: BASE_URL + 'entrevistas',
  OBJECTIVES_URL: BASE_URL + 'objetivos',
  PRODUCTS_URL: BASE_URL + 'productos',
  PRODUCTS_URL2: BASE_URL + 'products',
  QUESTIONS_URL: BASE_URL + 'preguntas',
  headersObj: {
		  	'Content-type': 'application/json',
		  	'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
  		}
};