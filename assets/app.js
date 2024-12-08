document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pokedexForm");
    const input = document.getElementById("pokemonInput");
    const card = document.getElementById("pokemonCard");
    const errorMessage = document.getElementById("errorMessage");
    const pokemonName = document.getElementById("pokemonName");
    const pokemonId = document.getElementById("pokemonId");
    const pokemonImage = document.getElementById("pokemonImage");
    const pokemonTypes = document.getElementById("pokemonTypes");
    const pokemonHeightWeight = document.getElementById("pokemonHeightWeight");
    const pokemonAbilities = document.getElementById("pokemonAbilities");
    const pokemonStats = document.getElementById("pokemonStats");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const query = input.value.trim().toLowerCase();

        // Reiniciar el estado
        card.classList.add("d-none");
        errorMessage.classList.add("d-none");
        pokemonAbilities.innerHTML = "";
        pokemonStats.innerHTML = "";

        try {
            // Llamada a la API
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!response.ok) throw new Error("Pokémon no encontrado");
            const data = await response.json();

            // Nombre, ID, imagen
            pokemonName.textContent = data.name;
            pokemonId.textContent = `ID: ${data.id}`;
            pokemonImage.src = data.sprites.front_default;

            // Tipos
            pokemonTypes.innerHTML = `Tipos: ${data.types.map(type => type.type.name).join(", ")}`;

            // Altura y peso
            pokemonHeightWeight.innerHTML = `Altura: ${(data.height / 10).toFixed(1)} m | Peso: ${(data.weight / 10).toFixed(1)} kg`;

            // Habilidades
            data.abilities.forEach(ability => {
                const li = document.createElement("li");
                li.textContent = ability.ability.name;
                pokemonAbilities.appendChild(li);
            });

            // Estadísticas base
            data.stats.forEach(stat => {
                const li = document.createElement("li");
                li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                pokemonStats.appendChild(li);
            });

            // Mostrar la tarjeta
            card.classList.remove("d-none");
        } catch (error) {
            // Mostrar mensaje de error
            errorMessage.classList.remove("d-none");
        }
    });
});