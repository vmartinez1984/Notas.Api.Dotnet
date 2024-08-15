// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var notas;
var notaId = ''
function saludar() {
    console.log('Hola mundo');
}

async function pintarLasNotasAsync(json) {
    var tbody = document.getElementById('tbodyDeNotas')
    tbody.innerHTML = ""
    json.forEach(element => {
        var tr = document.createElement('tr')

        var td = document.createElement('td')
        var boton = document.createElement('button')
        boton.className = "btn btn-info text-white"
        boton.innerText = "Copiar"
        boton.onclick = function () { copiar(element.nombre) }
        td.appendChild(boton)
        tr.appendChild(td)
        var span = document.createElement("span")
        span.innerText = element.nombre
        td.appendChild(span)

        var td = document.createElement('td')
        tr.appendChild(td)
        td.innerText = element.tags

        var td = document.createElement('td')
        tr.appendChild(td)
        td.innerText = element.estado

        if (element.estado.toLowerCase() == "url") {
            var td = document.createElement('td')
            var a = document.createElement('a')
            a.innerText = element.contenido.substring(0, 15) + "..."
            a.href = element.contenido
            a.target = "blank"
            td.appendChild(a)
        } else {
            var td = document.createElement('td')
            var boton = document.createElement('button')
            boton.className = "btn btn-info text-white"
            boton.innerText = "Copiar"
            boton.onclick = function () { copiar(element.contenido) }
            td.appendChild(boton)
            var div = document.createElement("span")
            if (element.contenido.length > 20)
                div.innerHTML = element.contenido.substring(0, 20) + "..."
            else
                div.innerHTML = element.contenido
            td.appendChild(div)
        }
        tr.appendChild(td)

        var td = document.createElement('td')
        tr.appendChild(td)
        var button = document.createElement('button')
        button.innerText = "Editar"
        button.className = "btn btn-primary"
        button.onclick = function () { editar(element.id) }
        td.appendChild(button)

        tbody.appendChild(tr)
    });
}

function editar(id) {
    //console.log(id)
    notaId = id
    const index = notas.findIndex(x=> x.id == id)
    const nota = notas[index]
    document.getElementById('nombre').value = nota.nombre
    document.getElementById('contenido').value = nota.contenido
    document.getElementById('tags').value = nota.tags
    document.getElementById('estado').value = nota.estado
    document.getElementById('fechaInicio').value = nota.fechaInicio
    document.getElementById('fechaFin').value = nota.fechaFin

    abrirModal()
}

/**
 * Copiar al portapapeles
 * @param {any} texto
 */
async function copiar(texto) {
    await navigator.clipboard.writeText(texto)
}
async function pintarLosOptionsAsync(json) {
    json.forEach(item => {
        var option = document.createElement('option')
        option.value = item
        option.text = item
        document.getElementById('estado').appendChild(option)
    })
}

async function enviarNota() {
    //debugger
    const nota = {
        "nombre": document.getElementById('nombre').value,
        "contenido": document.getElementById('contenido').value,
        "tags": document.getElementById('tags').value,
        "estado": document.getElementById('estado').value,
        "fechaInicio": document.getElementById('fechaInicio').value == "" ? null : document.getElementById('fechaInicio').value,
        "fechaFin": document.getElementById('fechaFin').value == "" ? null : document.getElementById('fechaFin').value,
    }
    if (notaId == '') {
    // Guardar nota
    const data = await agregarNotaAsync(nota)
    nota.id = data.id;
    console.log(nota)
    notas.unshift(nota)
    //fin guardar nota
    } else {
        nota.id = notaId
        await actualizarNotaAsync(nota)
        const index = notas.findIndex(x => x.id == notaId)
        notas[index] = nota
    }
    pintarLasNotasAsync(notas)
    limpiarFormulario();
    cerrarModal()
}

async function cargarLasNotas() {
    try {
        notas = await obtenerTodasLasNotasAsync()
        await pintarLasNotasAsync(notas)
        const estados = await obtenerTodasLosEstadosAsync()
        await pintarLosOptionsAsync(estados)
    } catch (e) {
        console.log(e)
    }
}

function cerrarModal() {
    var myModalEl = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}

function abrirModal() {
    var myModalEl = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.show();
}

function limpiarFormulario() {
    document.getElementById('nombre').value = ''
    document.getElementById('contenido').value = ''
    document.getElementById('tags').value = ''
    document.getElementById('estado').value = ''
    document.getElementById('fechaInicio').value = ""
    document.getElementById('fechaFin').value = ""
    notaId = ''
}

function ordenarPor(propiedad) {
    if (ordenDeNombre == 'asc') {
        orden = 'asc'
        ordenDeNombre = 'desc'
    } else {
        orden = 'desc'
        ordenDeNombre = 'asc'
    }

    notas = notas.sort((a, b) => {
        if (orden === 'asc') {
            return a[propiedad] > b[propiedad] ? 1 : -1;
        } else {
            return a[propiedad] < b[propiedad] ? 1 : -1;
        }
    });
    pintarLasNotasAsync(notas)
}

ordenDeNombre = 'asc'