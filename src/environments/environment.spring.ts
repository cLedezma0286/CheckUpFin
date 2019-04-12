const BASE_URL = '/CheckUpFinanciero/';
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
		  	'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
		  	'Pragma': 'no-cache',
		  	'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
  		}
};