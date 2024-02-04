"use strict";

const buscador = document.getElementById("buscar");

const buscarPokemon = () => {

    fetch("https://pokeapi.co/api/v2/pokemon?limit=1126")

        .then((response) => { 
            return response.json(); 
        })

        .then((data) => {

            console.log(data.results);

            buscador.addEventListener("keyup", function buscar(key) {

                if (key.key === "Enter") {

                    const valor = buscador.value.toLowerCase();

                    console.log(valor);

                    function buscarFinal() {

                        let filtrado = data.results.filter(pokemon => pokemon.name === valor);

                        console.log(filtrado[0].name);

                        if (filtrado[0].name !== valor) {

                            console.log("algo esta mal");

                        }

                    }

                    buscarFinal();

                };

            });

        });

}

buscarPokemon();