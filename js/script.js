'use strict';

const buscador = document.getElementById('nombrePokemon');

const appNode = document.getElementById('buscador');

const buscarPokemon = () => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=1126')
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      buscador.addEventListener('keyup', function buscar(key) {
        appNode.innerHTML = '';
        if (key.key === 'Enter') {
          const valor = buscador.value;

          async function buscarFinal() {
            let filtrado = data.results.filter(
              (pokemon) =>
                pokemon.name.includes(valor.toLowerCase()) ||
                pokemon.url.includes(`/${valor}/`)
            );

            if (filtrado.length === 0) {
              const mensajeError = document.createElement('p'); // Crea un nuevo elemento p
              mensajeError.innerText =
                'Este pokemon no está disponible. ¡Prueba con otro!'; // Establece el texto del elemento p
              appNode.appendChild(mensajeError); // Añade el elemento p al nodo principal
            }

            for (let i = 0; i < filtrado.length; i++) {
              await insertPokemon(`${filtrado[i].url}`);
            }

            async function insertPokemon(url) {
              const responsePokemon = await fetch(url);
              const responsePokemonJSON = await responsePokemon.json();
              const todaLaInfo = [];
              const resultado = [];

              for (let pokemonInfo in responsePokemonJSON) {
                resultado.push([pokemonInfo, responsePokemonJSON[pokemonInfo]]);
              }

              const typeColors = {
                electric: '#E8E100',
                normal: '#B09398',
                fire: '#FF675C',
                water: '#0596C7',
                ice: '#AFEAFD',
                rock: '#999799',
                flying: '#7AE7C7',
                grass: '#4A9681',
                psychic: '#FFC6D9',
                ghost: '#561D25',
                bug: '#A2FAA3',
                poison: '#795663',
                ground: '#D2B074',
                dragon: '#DA627D',
                steel: '#1D8A99',
                fighting: '#2F2F2F',
                default: '#2A1A1',
              };

              const contenedor = document.createElement('div'); // Crea un nuevo div
              contenedor.classList.add('ficha'); // Añade la clase "ficha" al div

              // Crea una nueva imagen para la imagen delantera del Pokémon
              const imagenPokemon = document.createElement('img');
              imagenPokemon.src = resultado[16][1].front_default;

              // Crea una nueva imagen para la imagen posterior del Pokémon
              const imagenPokemon2 = document.createElement('img');
              if (resultado[16][1].back_default) {
                imagenPokemon2.src = resultado[16][1].back_default;
              }

              // Crea un nuevo elemento h2 para el nombre del Pokémon
              const nombrePokemon = document.createElement('h2');
              nombrePokemon.innerText = `Nombre: ${resultado[11][1]}`;

              // Crea un nuevo elemento h3 para el número del Pokémon
              const numPokemon = document.createElement('h3');
              numPokemon.innerText = `#${resultado[7][1]}`;

              // Crea un nuevo elemento p para el tipo del Pokémon
              const tipoPokemon1 = document.createElement('p');
              tipoPokemon1.innerText = `Tipo: ${resultado[18][1][0].type.name}`;
              tipoPokemon1.style.color =
                typeColors[resultado[18][1][0].type.name]; // Asigna el color del primer tipo del Pokémon

              // Crea un nuevo elemento p para el segundo tipo del Pokémon
              const tipoPokemon2 = document.createElement('p');
              if (resultado[18][1][1]) {
                tipoPokemon2.innerText = `Tipo 2: ${resultado[18][1][1].type.name}`;
                tipoPokemon2.style.color =
                  typeColors[resultado[18][1][1].type.name];
              }

              // Crea nuevos elementos p para la estatura y el peso del Pokémon. Se dividen entre 10 porque la API no devuelve los resultados en m y kg
              const estaturaPokemon = document.createElement('p');
              estaturaPokemon.innerText = `Estatura: ${resultado[5][1] / 10}m`;
              const pesoPokemon = document.createElement('p');
              pesoPokemon.innerText = `Peso: ${resultado[19][1] / 10}kg`;

              // Crea nuevos elementos p para los puntos de vida, ataque, defensa y velocidad del Pokémon
              const vidaPokemon = document.createElement('p');
              vidaPokemon.innerText = `Vida: ${resultado[17][1][0].base_stat}PV`;
              const ataquePokemon = document.createElement('p');
              ataquePokemon.innerText = `Ataque: ${resultado[17][1][1].base_stat}ATQ`;
              const defensaPokemon = document.createElement('p');
              defensaPokemon.innerText = `Defensa: ${resultado[17][1][2].base_stat}DF`;
              const velocidadPokemon = document.createElement('p');
              velocidadPokemon.innerText = `Velocidad: ${resultado[17][1][5].base_stat}SP`;

              // Añade todos los elementos al contenedor
              contenedor.append(
                nombrePokemon,
                numPokemon,
                tipoPokemon1,
                tipoPokemon2,
                estaturaPokemon,
                pesoPokemon,
                vidaPokemon,
                ataquePokemon,
                defensaPokemon,
                velocidadPokemon,
                imagenPokemon,
                imagenPokemon2
              );

              // Añade el contenedor a todaLaInfo
              todaLaInfo.push(contenedor);

              // Añade todaLaInfo al appNode
              appNode.appendChild(...todaLaInfo);
            }
          }

          buscarFinal();
        }
      });
    });
};

buscarPokemon();
