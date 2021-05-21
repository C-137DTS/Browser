/* Este programa te permite buscar leer archivos en windows */

const levenshtein = require("fast-levenshtein")
const fs = require("fs")
const { exec } = require("child_process")
const { stderr } = require("process")
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require("constants")

let file_name = "inddex.js"
let dir_files = []
function ls(directory,cb) {
    exec(`dir ${directory} /b`, (err, stdout, stderr) => {
        if(err){
            console.error(err.message) 
        } else {
            dir_files = stdout.split("\n")
            cb(dir_files)
        }
    })
}

function search(files) {
    let maybe = files.filter(file =>  file == `${file_name}\r`)
    if(maybe[0]){
        console.log("El archivo se encuentra en este directorio")
    } else {
        similars(files)
    }
}

function similars(files) {
    let suggestion = files.find(file => levenshtein.get(file, file_name) <= 3)

    if (suggestion) {
        console.log(` Upss.. no pudimos encontrar el archivo ${file_name}. Acaso quisiste decir ${suggestion}?`)
    } else {
        console.error("Lo sentimos el archivo que deseas buscar no se encuentra en este directorio")
    }
}

function run(directory) {
    ls(directory,search)
}

 run(".\\")