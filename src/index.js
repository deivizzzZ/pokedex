// API POKEAPI
function importData(id) {
  const loader = document.querySelector(".spinner");
  loader.className = "spinner block";
  const card2 = document.querySelector(".card-container");
  card2.className = "card-container none";
  const error = document.querySelector(".wrong");
  error.innerText = "";
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => createCard(data))
    .catch(() => {
      loader.className = "spinner none";
      const error = document.querySelector(".wrong");
      error.innerText = "Por favor, seleccione un Pokemon válido.";
      const cardOut = document.querySelector(".card-container");
      cardOut.className = "card-container none";
    });
}

function createCard(poke) {
  const loaderOut = document.querySelector(".spinner");
  loaderOut.className = "spinner none";
  const error = document.querySelector(".wrong");
  error.innerText = "";
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";
  cardContainer.classList = "card-container block";
  const card = document.createElement("div");
  card.className = "card";
  cardContainer.appendChild(card);
  const pokeName = document.createElement("div");
  pokeName.className = "name";
  pokeName.innerText = poke.name;
  card.appendChild(pokeName);
  const pokeFront = document.createElement("img");
  pokeFront.className = "photo-front";
  pokeFront.src = poke.sprites.front_default;
  card.appendChild(pokeFront);
  const pokeShiny = document.createElement("img");
  pokeShiny.className = "photo-shiny";
  pokeShiny.src = poke.sprites.front_shiny;
  card.appendChild(pokeShiny);
  const pokeBlockContainer = document.createElement("div");
  pokeBlockContainer.className = "block-container";
  card.appendChild(pokeBlockContainer);
  const pokeHeight = document.createElement("div");
  pokeHeight.className = "height";
  pokeHeight.innerText = `Altura: ${poke.height}`;
  pokeBlockContainer.appendChild(pokeHeight);
  const pokeWeight = document.createElement("div");
  pokeWeight.className = "weight";
  pokeWeight.innerText = `Peso: ${poke.weight}`;
  pokeBlockContainer.appendChild(pokeWeight);
  const pokeType = document.createElement("div");
  pokeType.className = "type";
  pokeType.innerText = "Tipo: ";
  for (const i of poke.types) {
    pokeType.innerText += i.type.name + " ";
  }
  pokeBlockContainer.appendChild(pokeType);
  const pokeMoves = document.createElement("div");
  pokeMoves.className = "moves";
  pokeMoves.innerText = "Movimientos: ";
  for (const i of poke.moves) {
    const movement = document.createElement("p");
    movement.innerText = i.move.name;
    pokeMoves.appendChild(movement);
  }
  pokeBlockContainer.appendChild(pokeMoves);
}

const button = document.querySelector(".pokeball");
button.addEventListener("click", () => {
  const id = document.querySelector(".numberPoke").value;
  const cardOut = document.querySelector(".card-container");
  cardOut.className = "card-container none";
  importData(id);
});

const input = document.querySelector(".numberPoke");
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const id = document.querySelector(".numberPoke").value;
    importData(id);
  }
});
