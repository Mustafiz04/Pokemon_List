const poke_container = document.getElementById('singlepoke');

const pokemons_number = 1;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async (name) => {
	// for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(name);
	// }
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
		<div class="img-container">
			<img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
		</div>
		<div class="info">
			<span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
			<h3 class="name">${name}</h3>
			<small class="type"><strong>Type:</strong> <span>${poke_types}</span></small>
			<br>
			<small class="type"><strong>Weight:</strong> <span>${pokemon.weight}</span></small>
			<br>
			<small class="type"><strong>Height:</strong> <span>${pokemon.height}</span></small>
			<br>
			<small class="type"><strong>Base experience:</strong> <span>${pokemon.base_experience}</span></small>
			<br>
			<small class="type"><strong>Abilities:</strong> <span>${pokemon.abilities.map(ability => ability.ability.name+"<br>")}</span></small>
		</div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.innerHTML = '';
	poke_container.appendChild(pokemonEl);
}



var get = document.getElementById('get');
get.addEventListener('click', () => {
    var pokemonnameid = document.getElementById("searchinput").value;
    fetchPokemons(pokemonnameid.toLowerCase());
})