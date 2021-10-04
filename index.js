//Objetos
//-Crea tres objetos usuario1, usuario2, usuario3 que tengan las propiedades nombreUsuario y contrasenia como strings.

const usuario1 = {
  nombreUsuario: "Naty",
  contrasenia: "1234",
};

const usuario2 = {
  nombreUsuario: "Sandra",
  contrasenia: "456",
};

const usuario3 = {
  nombreUsuario: "Kary",
  contrasenia: "789",
};

//-Definí una función saludar que reciba como parámetro un objeto y que modifique el HTML de tu página para que aparezca un h1 que diga "Hola, {nombreUsuario}".
const h1 = document.querySelector("h1");

const saludar = (objeto) => {
  h1.textContent = `Hola ${objeto.nombreUsuario}!`;
};

//Probá tu función con los tres objetos definidos antes.
//-Definí una función modificarNombreDeUsuario que reciba dos parametros: un objeto usuario y un string nuevoNombre. La función debe retornar el objeto con la propiedad nombreUsuario modificada para tener el valor de nuevoNombre.

const modificarNombreDeUsuario = (user, nuevoNombre) => {
  user.nombreUsuario = nuevoNombre;
  return user;
};

modificarNombreDeUsuario(usuario1, "Claudia");

//-Probá tu función con los tres objetos definidos antes.

//-Definí una función modificarContrasenia que reciba dos parametros: un objeto usuario y un string nuevaContrasenia. La función debe retornar el objeto con la propiedad contrasenia modificada para tener el valor de nuevaContrasenia.
//-Probá tu función con los tres objetos definidos antes.

const modificarContrasenia = (user, nuevaContrasenia) => {
  user.contrasenia = nuevaContrasenia;
};

modificarContrasenia(usuario2, "1452");

//Crea la función convertirAJSON. La función debe recibir un objeto usuario como parámetro y retornar el objeto convertido a JSON.

const convertirAJSON = (user) => {
  return JSON.stringify(user);
};

const objetoConvertidoAJSON = convertirAJSON(usuario3);

//Crea la función convertirDesdeJSON. La función debe recibir una cadena JSON objetoJSON y retornar la cadena convertida a un objeto de Javascript.

const convertirDesdeJSON = (objetoEnJSON) => {
  return JSON.parse(objetoEnJSON);
};

//Probá tus funciones con los tres objetos definidos antes.

//Definí la función guardarEnLocalStorage que reciba como parámetro un objeto de Javascript y un string, y guarde en localStorage la cadena con el string como nombre de la clave (Recordá que antes de guardar un objeto en localStorage hay que convertirlo a JSON: usá la función convertirAJSON que declaraste antes)

const JSONConvertidoAObjeto = convertirDesdeJSON(objetoConvertidoAJSON);

const guardarEnLocalStorage = (objeto, clave) => {
  const objetoJSON = convertirAJSON(objeto);

  localStorage.setItem(clave, objetoJSON);
};

guardarEnLocalStorage(usuario2, "Usuarios");

//Definí la función leerDesdeLocalStorage que reciba como parámetro un string clave y retorne un objeto de Javascript con los datos guardados bajo esa clave en localStorage. (Utilizá la función convertirDesdeJSON!)
const leerDesdeLocalStorage = (clave) => {
  const datosLocalStorage = localStorage.getItem(clave);

  return convertirDesdeJSON(datosLocalStorage);
};

console.log(leerDesdeLocalStorage("Usuarios"));

////Ejercitación integradora///
//Tratá de usar las funciones declaradas en los ejercicios anteriores.

/*-Crea una pagina que tenga un titulo que diga "Hola!" y un botón que diga "Iniciar sesión"
Al hacer click en el botón Iniciar Sesión, debe hacerse visible un formulario con un campo usuario y otro contraseña, y un botón para enviar el form.
Definí un objeto usuario en javascript en donde estén definidas dos propiedades: nombreUsuario y contrasenia (o usá los objetos definidos antes).
Si los datos ingresados por el usuario en el form coinciden con los guardados en el objeto, la web debe:
Mostrar como saludo "Hola {nombreUsuario}"
Ocultar el botón "iniciar sesión"
Mostrar dos botones nuevos: Cambiar mis datos, Cerrar sesión.*/

const botonInicio = document.querySelector("#boton-inicio");
const inputUsuario = document.querySelector("#usuario");
const inputContrasenia = document.querySelector("#input-contrasenia");
const botonSubmit = document.querySelector("#boton-submit");
const formulario = document.querySelector("form");
const botonCambiarDatos = document.querySelector("#cambiar-datos");
const botonCerrarSesion = document.querySelector("#cerrar-sesion");

botonInicio.onclick = () => {
  formulario.classList.remove("ocultar");
};

const usuarioNuevo = {
  nombreUsuario: "Stella",
  contrasenia: "963",
  sesionIniciada: false,
};

const comprobarDatos = (usuario) => {
  if (
    inputUsuario.value === usuario.nombreUsuario &&
    inputContrasenia.value === usuario.contrasenia
  ) {
    //saludar(usuario);
    botonInicio.classList.add("ocultar");
    botonCambiarDatos.classList.remove("ocultar");
    botonCerrarSesion.classList.remove("ocultar");
  }
};

botonSubmit.onclick = () => {
  comprobarDatos(usuarioNuevo);
  usuarioNuevo.sesionIniciada = true;
  guardarEnLocalStorage(usuarioNuevo, "Stella");
  saludar(leerDesdeLocalStorage("Stella"));
};

//Pista: Definí una variable global para guardar si el usuario inició sesión o no, y determinar a partir de ella qué elementos se deben mostrar en la página.

/*
-Si el usuario hace click en "cerrar sesión", el titulo debe volver a decir "Hola!" y el botón "Iniciar sesión" debe volver a ser visible.*/

botonCerrarSesion.onclick = () => {
  h1.textContent = "Hola!";
  botonInicio.classList.remove("ocultar");
  usuarioNuevo.sesionIniciada = false;
};

/*-Si el usuario hace click en "Cambiar mis datos", se abre un formulario con un campo usuario y otro contraseña, y un botón para enviar el form. Al enviarse, se deben modificar las propiedades nombreUsuario y contrasenia del objeto usuario.*/

/*-Una vez completados todos los puntos anteriores, queremos que la sesión del usuario persista aunque cierre la página.

-Al iniciar sesión, se deben guardar en localStorage el nombre del usuario y la propiedad: sesionIniciada: true.
-Al saludar al usuario, el título debe consumir la propiedad guardada en localStorage.
-Al cerrar sesión, la propiedad sesionIniciada debe pasar a ser false.

-Para determinar si la sesión está iniciada o no, usar la propiedad sesionIniciada desde localStorage.

-Si el usuario cambia su nombre o contraseña desde el formulario, los datos en localStorage deben actualizarse también.*/

const formularioCambioDatos = document.querySelector(
  "#formulario-cambiar-datos"
);
const inputNuevoNombre = document.querySelector("#usuario-nuevo-dato");
const inputNuevaContrasenia = document.querySelector(
  "#input-contrasenia-nueva"
);
const botonNuevaInformacion = document.querySelector(
  "#boton-nueva-informacion"
);

botonCambiarDatos.onclick = () => {
  formularioCambioDatos.classList.remove("ocultar");
};

botonNuevaInformacion.onclick = () => {
  usuarioNuevo.nombreUsuario = inputNuevoNombre.value;
  usuarioNuevo.contrasenia = inputNuevaContrasenia.value;
  guardarEnLocalStorage(usuarioNuevo, "Stella");
};

console.log(usuarioNuevo);
