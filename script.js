
// =====================================
// 1. VARIABLES Y CONSTANTES
// =====================================

const mensajeBienvenida = document.querySelector("#mensajeBienvenida");

const formCalculadora = document.querySelector("#formCalculadora");
const numero1 = document.querySelector("#numero1");
const numero2 = document.querySelector("#numero2");
const operacion = document.querySelector("#operacion");
const resultadoCalculadora = document.querySelector("#resultadoCalculadora");

const formCalificacion = document.querySelector("#formCalificacion");
const nota = document.querySelector("#nota");
const resultadoNota = document.querySelector("#resultadoNota");

const nuevoTexto = document.querySelector("#nuevoTexto");
const botonCambiarTexto = document.querySelector("#botonCambiarTexto");
const textoDinamico = document.querySelector("#textoDinamico");
const botonCambiarEstilo = document.querySelector("#botonCambiarEstilo");
const botonAlternar = document.querySelector("#botonAlternar");
const informacionExtra = document.querySelector("#informacionExtra");

const formTecnologia = document.querySelector("#formTecnologia");
const nombreTecnologia = document.querySelector("#nombreTecnologia");
const listaTecnologias = document.querySelector("#listaTecnologias");

const formContacto = document.querySelector("#formContacto");
const nombreContacto = document.querySelector("#nombreContacto");
const resultadoContacto = document.querySelector("#resultadoContacto");

// Variables de diferentes tipos
let nombreAprendiz = "Estudiante";
let edad = 18;
let estaAprendiendo = true;

console.log("Nombre:", nombreAprendiz);
console.log("Edad:", edad);
console.log("¿Está aprendiendo?", estaAprendiendo);


// =====================================
// 2. FUNCIONES AUXILIARES
// =====================================

function mostrarResultado(elemento, mensaje, tipo = "") {
    elemento.textContent = mensaje;
    elemento.classList.remove("exito", "error");

    if (tipo !== "") {
        elemento.classList.add(tipo);
    }
}

function formatearNumero(numero) {
    return new Intl.NumberFormat("es-CO", {
        maximumFractionDigits: 8
    }).format(numero);
}


// =====================================
// 3. CALCULADORA
// =====================================

function calcular(a, b, tipoOperacion) {
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return {
            correcto: false,
            mensaje: "Ingresa dos números válidos."
        };
    }

    let resultado;

    switch (tipoOperacion) {
        case "sumar":
            resultado = a + b;
            break;

        case "restar":
            resultado = a - b;
            break;

        case "multiplicar":
            resultado = a * b;
            break;

        case "dividir":
            if (b === 0) {
                return {
                    correcto: false,
                    mensaje: "No es posible dividir entre cero."
                };
            }

            resultado = a / b;
            break;

        default:
            return {
                correcto: false,
                mensaje: "Selecciona una operación válida."
            };
    }

    if (!Number.isFinite(resultado)) {
        return {
            correcto: false,
            mensaje: "El resultado no es válido."
        };
    }

    return {
        correcto: true,
        valor: resultado
    };
}

formCalculadora.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const a = Number(numero1.value);
    const b = Number(numero2.value);
    const tipoOperacion = operacion.value;

    const respuesta = calcular(a, b, tipoOperacion);

    if (respuesta.correcto) {
        mostrarResultado(
            resultadoCalculadora,
            "Resultado: " + formatearNumero(respuesta.valor),
            "exito"
        );
    } else {
        mostrarResultado(
            resultadoCalculadora,
            respuesta.mensaje,
            "error"
        );
    }
});


// =====================================
// 4. CONDICIONALES: CALIFICACIONES
// =====================================

function evaluarNota(valorNota) {
    if (
        !Number.isFinite(valorNota) ||
        valorNota < 0 ||
        valorNota > 100
    ) {
        return {
            valido: false,
            mensaje: "Ingresa una nota entre 0 y 100."
        };
    }

    const aprobado = valorNota >= 60;

    if (aprobado) {
        return {
            valido: true,
            aprobado: true,
            mensaje: "¡Aprobaste! Tu nota es " + valorNota + "."
        };
    }

    return {
        valido: true,
        aprobado: false,
        mensaje: "Debes seguir practicando. Tu nota es " + valorNota + "."
    };
}

formCalificacion.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const valorNota = Number(nota.value);
    const evaluacion = evaluarNota(valorNota);

    if (!evaluacion.valido) {
        mostrarResultado(
            resultadoNota,
            evaluacion.mensaje,
            "error"
        );
        return;
    }

    mostrarResultado(
        resultadoNota,
        evaluacion.mensaje,
        evaluacion.aprobado ? "exito" : "error"
    );
});


// =====================================
// 5. MODIFICAR TEXTO DEL DOM
// =====================================

botonCambiarTexto.addEventListener("click", function() {
    const mensaje = nuevoTexto.value.trim();

    if (mensaje === "") {
        mostrarResultado(
            textoDinamico,
            "Primero escribe un mensaje.",
            "error"
        );
        return;
    }

    textoDinamico.textContent = mensaje;
    textoDinamico.setAttribute("title", "Mensaje actualizado");
    textoDinamico.classList.add("estilo-alternativo");
});


// =====================================
// 6. MODIFICAR ESTILOS CSS
// =====================================

botonCambiarEstilo.addEventListener("click", function() {
    const claseActiva = textoDinamico.classList.toggle(
        "estilo-alternativo"
    );

    botonCambiarEstilo.textContent = claseActiva
        ? "Restaurar estilo"
        : "Cambiar estilo";
});


// =====================================
// 7. MOSTRAR Y OCULTAR INFORMACIÓN
// =====================================

botonAlternar.addEventListener("click", function() {
    informacionExtra.hidden = !informacionExtra.hidden;

    botonAlternar.textContent = informacionExtra.hidden
        ? "Mostrar información"
        : "Ocultar información";
});


// =====================================
// 8. CREAR ELEMENTOS HTML
// =====================================

formTecnologia.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const tecnologia = nombreTecnologia.value.trim();

    if (tecnologia === "") {
        return;
    }

    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = tecnologia;

    listaTecnologias.appendChild(nuevoElemento);

    nombreTecnologia.value = "";
    nombreTecnologia.focus();
});


// =====================================
// 9. FORMULARIO DE CONTACTO
// =====================================

formContacto.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = nombreContacto.value.trim();

    if (nombre === "") {
        mostrarResultado(
            resultadoContacto,
            "Por favor, escribe tu nombre.",
            "error"
        );
        return;
    }

    mostrarResultado(
        resultadoContacto,
        "Gracias, " + nombre +
        ". El formulario se validó correctamente. " +
        "Este ejemplo no envía los datos a un servidor.",
        "exito"
    );
});

// Mostrar un mensaje al cargar la página
mensajeBienvenida.textContent =
    "Hola, " + nombreAprendiz +
    ". JavaScript está funcionando correctamente.";

console.log("El archivo script.js se cargó correctamente.");
