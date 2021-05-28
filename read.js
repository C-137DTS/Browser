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
        console.log("Escriba la ruta del archivo ");
        prompt.get("file", (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          this.open(result.file);
        });
      } else {
        console.log("\nEl proceso ha finalizado exitosamente");
      }
    });
  }
}

// let prueba = new reader()
// prueba.interface()