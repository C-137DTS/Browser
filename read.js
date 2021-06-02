/* 
1- Agregar inputs y outputs.
2- Convertir esto en una clase.
*/

const prompt = require("prompt");
const fs = require("fs");

class reader {
  // Regresa el contenido del archivo de forma sincrona
  leer(ruta, cb) {
    return fs.readFileSync(ruta, "utf8");
  }

  // Muestra el conteido del archivo el parametro file es la ruta del archivo
  open(file) {
    let response = this.leer(file);
    console.log("\n", response);
    console.log("\nEl proceso ha terminado...");
  }

  interface() {
    // Esta sera la ruta del archivo que vamos a mostrar
    this.file = '.\\index.js'


    // Imprime los mensajes en pantalla para que el ususario decida si quiere ver o no el continido del archivo
    prompt.start();
    console.log(
      "Presiona la tecla Y si deseas abrir el archivo o presiona enter para omitir: "
    );
    prompt.get("open", (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      if (result.open.toLowerCase() === "y") {
        if(this.isPlain(this.file)){
          this.open(this.file);
        } else {
          console.log('Lo siento solo se pueden abrir archivos de texto plano...')
        }
      } else {
        console.log("\nEl proceso ha finalizado exitosamente");
      }
    });
  }
  isPlain(file){
    //Lista de extenciones de archivos de texto plano
    this.plainText = ['txt', 'js', 'json', 'py']
    this.ext = `${file[file.length - 2]}${file[file.length - 1]}`

    this.match = this.plainText.find(fileExt => fileExt === this.ext)
    if(this.match[0]){
      return true
    }
    return false
  }
}

// let prueba = new reader()
// prueba.interface()

module.exports = reader;
