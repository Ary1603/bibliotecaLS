let contenedor = document.querySelector('.conatiner-books')
let imgVacio = document.createElement('img')
let avisoVacio = document.createElement('span')
let formBook = document.querySelector('.form-book')
let formEditar = document.querySelector('.form-editar')
let btnEditar = document.querySelector('#editar')
imgVacio.src = "https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_960_720.png"
imgVacio.className = "img-vacio"
avisoVacio.className = "aviso-vacio"
avisoVacio.textContent = "Aun no hay libros agregados a tu bibiblioteca."

let libros = []
let librosLS = []
//Generador de libro
const libro = class {
    constructor(nombre, autor, img, comentario) {
        this._nombre = nombre;
        this._autor = autor;
        this._img = img;
        this._comentario = comentario
    }
}


//Abrir form 
function agregar() {
    if (formBook.style.display == '' || formBook.style.display == 'none') formBook.style.display = 'flex'

}

//Agregar libro
function subirLibro() {
    let nombre = document.querySelector('#input-nombre').value
    let autor = document.querySelector('#input-autor').value
    let imgBook = document.querySelector('#input-img').value
    let comentario = document.querySelector('#input-comentario').value
    libros.push(new libro(nombre, autor, imgBook, comentario))
    formBook.style.display = 'none'
    //Guardar en local Storage
    localStorage.setItem('Libros', JSON.stringify(libros))
    //Traer libros del localStorage
    librosLS = JSON.parse(localStorage.getItem('Libros'));
    //Agregar libros en la biblioteca de media noche
    let nombre1 = nombre.toLowerCase().replace(/\s+/g, '')

    let i = librosLS.length - 1
    let card = `<div class="card ${nombre1}" id = "${nombre1}">
    
        <div class="card-image">
            <img id="img-libro" src= "${librosLS[i]._img}"></img>
        </div>
          <div class="card-description">
            <p class="text-title"> ${librosLS[i]._nombre}</p>
            <p class="text-autor"> ${librosLS[i]._autor}</p>
            <p class="text-body">${librosLS[i]._comentario}</p>
          </div>
          <div class = "bg-tools">
            <i class="fas fa-cog ajustes" onclick="editarLibro(event)"></i>
            <i class="fas fa-trash-alt borrar" onclick="borrar(event)"></i>
          </div>
          
        </div>`



    contenedor.insertAdjacentHTML("afterbegin", card)
    if (librosLS.length == 0) {
        contenedor.appendChild(imgVacio)
        contenedor.appendChild(avisoVacio)
    } else {
        imgVacio.style.display = 'none'
        avisoVacio.style.display = 'none'

    }
}

function borrar(e) {
    //Trarer libros del localStorage
    librosLS = JSON.parse(localStorage.getItem('Libros'));
    let card = document.querySelectorAll('.card')


    for (let i = 0; i < card.length; i++) {
        //Traer libros del localStorage
        librosLS = JSON.parse(localStorage.getItem('Libros'));
        if (e.path[2].className == `${card[i].className}`) {
            let nombre = librosLS[i]._nombre.toLowerCase().replace(/\s+/g, '')
            let elementoEliminar = document.querySelector(`#${nombre}`)
            contenedor.removeChild(elementoEliminar)
            let librosBorrados = librosLS.filter(a => a != librosLS[i]);
            libros = librosBorrados
            //Guardar en local Storage
            localStorage.setItem('Libros', JSON.stringify(libros))

        }

    }
    if (contenedor.childElementCount == 0) {
        contenedor.appendChild(imgVacio)
        contenedor.appendChild(avisoVacio)
    } else {
        imgVacio.style.display = 'none'
        avisoVacio.style.display = 'none'
    }

}

function editarLibro(e) {

    //Trarer libros del localStorage
    librosLS = JSON.parse(localStorage.getItem('Libros'));
    let card = document.querySelectorAll('.card')


    for (let i = 0; i < card.length; i++) {
        //Traer libros del localStorage
        librosLS = JSON.parse(localStorage.getItem('Libros'));
        if (e.path[2].className == `${card[i].className}`) {
            //Abrir form editar
            formEditar.style.display = 'flex'
            let arrayLibrosEditados = librosLS.reverse()
            let nombre = arrayLibrosEditados[i]._nombre.toLowerCase().replace(/\s+/g, '')
            let tituloLibro = document.querySelector(`#${nombre} > .card-description > .text-title`)
            let autorLibro = document.querySelector(`#${nombre} > .card-description > .text-autor`)
            let imgLibro = document.querySelector(`#${nombre} > .card-image > img`)
            let comentarioLibro = document.querySelector(`#${nombre} > .card-description > .text-body`)

            //Valores de los elementos que se quieren modificar
            btnEditar.addEventListener('click', () => {
                let Nuevo_nombre = document.querySelector('#titulo-editado').value
                let Nuevo_autor = document.querySelector('#autor-editado').value
                let Nuevo_imgBook = document.querySelector('#imagen-editado').value
                let Nuevo_comentario = document.querySelector('#comentario-editado').value
                //Cambiar valores en el Card
                tituloLibro.textContent = Nuevo_nombre
                autorLibro.textContent = Nuevo_autor
                comentarioLibro.textContent = Nuevo_comentario
                imgLibro.src = Nuevo_imgBook
                librosLS[i]._nombre = Nuevo_nombre
                librosLS[i]._autor = Nuevo_autor
                librosLS[i]._img = Nuevo_imgBook
                librosLS[i]._comentario = Nuevo_comentario
                formEditar.style.display = 'none'
            })
        }
    }
}

if (contenedor.childElementCount == 0) {
    contenedor.appendChild(imgVacio)
    contenedor.appendChild(avisoVacio)
} else {
    imgVacio.style.display = 'none'
    avisoVacio.style.display = 'none'
}

