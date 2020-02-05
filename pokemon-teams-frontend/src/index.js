const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

let TRAINERS;
document.addEventListener('DOMContentLoaded', init);

function init() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => {
      TRAINERS = json.reduce((a, c) => {
        a[c.id] = c;
        return a;
      }, {});
      renderTrainers();
    });
}

function addPokemon(id) {
  console.log('adding poke for ', id);
}

function releasePokemon(trainerId, pokeId) {
  TRAINERS[trainerId].pokemons = TRAINERS[trainerId].pokemons.filter(
    e => e.id !== pokeId
  );
  renderTrainerTeam(trainerId);
  fetch(POKEMONS_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: pokeId }),
  });
}

function renderTrainers() {
  const el = document.getElementById('trainers');
  Object.values(TRAINERS).forEach(trainer => {
    const trainerCard = createTrainerCard(trainer);
    el.append(trainerCard);
    TRAINERS[trainer.id].card = trainerCard;
    renderTrainerTeam(trainer.id);
  });
}

function renderTrainerTeam(id) {
  const card = TRAINERS[id].card;
  if (card.querySelector('ul')) {
    card.removeChild(card.querySelector('ul'));
  }
  const pokeList = createPokemonList(TRAINERS[id]);
  card.append(pokeList);
}

function createTrainerCard(trainer) {
  const trainerCard = document.createElement('div');
  trainerCard.classList.add('card');
  trainerCard.setAttribute('data-id', trainer.id);

  const trainerName = document.createElement('p');
  trainerName.innerText = trainer.name;

  const addButton = document.createElement('button');
  addButton.setAttribute('data-trainer-id', trainer.id);
  addButton.innerText = 'Add Pokemon';
  addButton.addEventListener('click', () => addPokemon(trainer.id));

  trainerCard.append(trainerName);
  trainerCard.append(addButton);
  return trainerCard;
}

function createPokemonList(trainer) {
  const ul = document.createElement('ul');
  trainer.pokemons.forEach(poke => {
    const li = document.createElement('li');
    li.innerText = `${poke.nickname} (${poke.species}) `;
    const releaseButton = document.createElement('button');
    releaseButton.classList.add('release');
    releaseButton.setAttribute('data-pokemon-id', poke.id);
    releaseButton.innerText = 'Release';
    releaseButton.addEventListener('click', () =>
      releasePokemon(trainer.id, poke.id)
    );
    li.append(releaseButton);
    ul.append(li);
  });
  return ul;
}
