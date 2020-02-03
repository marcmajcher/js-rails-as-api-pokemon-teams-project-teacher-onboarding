const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

let trainers = [];
document.addEventListener('DOMContentLoaded', init);

function init() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => renderTrainers(json));
}

function renderTrainers(trainers) {
  const el = document.getElementById('trainers');

  trainers.forEach(trainer => {
    const trainerCard = document.createElement('div');
    trainerCard.classList.add('card');
    trainerCard.setAttribute('data-id', trainer.id);

    const trainerName = document.createElement('p');
    trainerName.innerText = trainer.name;

    const addButton = document.createElement('button');
    addButton.setAttribute('data-trainer-id', trainer.id);
    addButton.innerText = 'Add Pokemon';

    const pokeList = document.createElement('ul');

    trainerCard.append(trainerName);
    trainerCard.append(addButton);
    trainerCard.append(pokeList);
    el.append(trainerCard);
  });
}
