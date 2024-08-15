const baseUrl = "/Api"
const url = baseUrl + "/Notas"

async function obtenerTodasLasNotasAsync() {
    const response = await fetch(url)
    if (response.ok) {
        return await response.json()
    }
}

async function obtenerTodasLosEstadosAsync() {
    const response = await fetch(baseUrl + "/Estados")
    if (response.ok)
        return await response.json()
    else
        console.log(response.error)
}

async function agregarNotaAsync(nota) {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombre": nota.nombre,
        "contenido": nota.contenido,
        "tags": nota.tags,
        "estado": nota.estado,
        "fechaInicio": nota.fechaInicio,
        "fechaFin": nota.fechaFin
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const response = await fetch(url, requestOptions)
    if (response.ok)
        return response.json()
    else
        throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`)
}

async function actualizarNotaAsync(nota) {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombre": nota.nombre,
        "contenido": nota.contenido,
        "tags": nota.tags,
        "estado": nota.estado,
        "fechaInicio": nota.fechaInicio,
        "fechaFin": nota.fechaFin
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const response = await fetch(url + "/" + nota.id, requestOptions)
    if (response.ok)
        return response.json()
    else
        throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`)
}