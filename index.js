/* Este programa te permite buscar leer archivos en windows
 
1- Verificar si es un archivo de texto plano y si lo es desplegar la interface del reader. (usando expresiones regulares)
2- Pedir el nombre del archivo y la ruta de inicio por consola.
3- Iniciar con el algoritmo para indicaar la profundidad.

*/

const m_reader = require("./read");
const reader = new m_reader();
const levenshtein = require("fast-levenshtein");
const fs = require("fs");
const { exec } = require("child_process");
const { stderr } = require("process");
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require("constants");

let file_name = "index.js";
let dir_files = [];
function ls(directory, cb) {
    // Muestra los archivos y directorios que tenemos en la ruta indicada
  exec(`dir ${directory} /b`, (err, stdout, stderr) => {
    if (err) {
      console.error(err.message);
    } else {
        // Convierte cada archivo y directorio en un elemento de un array
      dir_files = stdout.split("\n");
      cb(dir_files);
    }
  });
}

function search(files) {
    // Busca el la lista de archivos del directorio un archivo que coincida con el nombre de archivo que proporcionamos.
  let maybe = files.filter((file) => file == `${file_name}\r`);
  if (maybe[0]) {
    console.log("El archivo se encuentra en este directorio\n");
    // Dispara la consola interactiva para elegir si queremos abrir el archivo
    reader.interface();
  } else {
      // Si no se encuentra una coincidencia se buscara un archivo similar
    similars(files);
  }
}

function similars(files) {
    // Busca una palabra similar al archivo que buscamos usando levenshtein
  let suggestion = files.find((file) => levenshtein.get(file, file_name) <= 3);

  if (suggestion) {
    console.log(
      `Upss.. no pudimos encontrar el archivo ${file_name}. Acaso quisiste decir ${suggestion}? \n`
    );
    reader.interface();
  } else {
    console.error(
      "Lo sentimos el archivo que deseas buscar no se encuentra en este directorio"
    );
  }
}

function run(directory) {
  ls(directory, search);
}

run(".\\");
