const formulario = document.querySelector("#formulario");
const aplicacion = document.querySelector("#aplicacion");
const resultado = document.querySelector("#pokemon");


window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarPokemon);
});

function buscarPokemon(e) {
    e.preventDefault();
    const buscarInput = document.querySelector("#buscar").value;
    if (buscarInput === '') {
        limpiarHTML()
        mostrarError("Debe ingresar el nombre de un pokemon.");
        return;
    }
    limpiarHTML();
    valor = buscarInput.toLowerCase();
    fetchData(valor.trim());
}



const fetchData = async (pokemon) => {
    try {

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data = await res.json()

        mostrarPokemon(data)

    } catch (error) {
        mostrarError("No se encontro el pokemon");
    }
}

function mostrarPokemon(pokemon) {
    const { name, sprites: { other: { dream_world: { front_default } } }, abilities } = pokemon

    //  // crear un div
    const divContainer = document.createElement("DIV");
    divContainer.classList.add("aplicacion__pokemon-contenedor");
    //imagen del pokemon
    const logo = document.createElement("IMG");
    logo.src = front_default;
    //  // crear div
    const divDatos = document.createElement("DIV");
    divContainer.classList.add("aplicacion__pokemon-datos");
    //nombre del pokemon
    const nombrePokemon = document.createElement("P");
    nombrePokemon.classList.add("aplicacion__pokemon-nombre");
    nombrePokemon.textContent = name;

    //--------------------------------------------------------------

    //habilidades del pokemon

    const divHabilidades = document.createElement("DIV");
    divHabilidades.classList.add("aplicacion__pokemon-jugadores");

    const divCard = document.createElement("DIV");
    divCard.classList.add("aplicacion__pokemon-card");

    // habilidad del pokemon
    const primera_habilidad = document.createElement("P");
    primera_habilidad.innerHTML =
        `<strong>Primera habilidad: </strong> <br/> ${pokemon.abilities[0].ability.name}`;

    const divCard2 = document.createElement("DIV");

    divCard2.classList.add("aplicacion__pokemon-card");

    const segunda_habilidad = document.createElement("P");
    segunda_habilidad.innerHTML =
        `<strong>Segunda habilidad: </strong> <br/> ${pokemon.abilities[1].ability.name}`;

    // agregar al divHabilidades
    divCard.appendChild(primera_habilidad);
    divCard2.appendChild(segunda_habilidad);
    // agregar divCard a divHabilidades
    divHabilidades.appendChild(divCard);
    divHabilidades.appendChild(divCard2);

    //-----------------------------------------------------------

    const divEspecie = document.createElement("DIV");
    divEspecie.classList.add("aplicacion__pokemon");

    // especie del pokemon
    const especie = document.createElement("P");
    especie.innerHTML =
        `<strong>Especie: </strong> <br/> ${pokemon.types[0].type.name}`;

    // agregar al divHabilidades
    divEspecie.appendChild(especie);
    // agregar divCard a divHabilidades

    //---------------------------------------------------------------


    // agregar al divDatos
    divDatos.appendChild(logo);
    divDatos.appendChild(nombrePokemon);

    // agregar al div container
    divContainer.appendChild(divDatos)
    // agregar al html
    resultado.appendChild(divContainer);
    resultado.appendChild(divHabilidades);
    resultado.appendChild(divEspecie);
    console.log(divHabilidades)

}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarError(mensaje) {
    const alertaError = document.querySelector(".alerta__error");
    if (!alertaError) {
        const alerta = document.createElement("DIV");
        alerta.classList.add("alerta__error");
        alerta.innerHTML = `
            <strong class="alerta__error-bold">Error!</strong>
            <span>${mensaje}</span>
        `;
        aplicacion.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }
}

// function spinner() {
//     limpiarHTML()
//     const divSpinner = document.createElement("DIV");
//     divSpinner.classList.add("loader");
//     divSpinner.innerHTML = `
//         <div class="loader-square"></div>
//         <div class="loader-square"></div>
//         <div class="loader-square"></div>
//         <div class="loader-square"></div>
//         <div class="loader-square"></div>
//         <div class="loader-square"></div>
//         <div class="loader-square"></div>
//     `;
//     resultado.appendChild(divSpinner);
// }