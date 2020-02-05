require 'faker'

class PokemonsController < ApplicationController
  before_action :render_pokemon, only: [:show, :destroy]

  def index
    @pokemons = Pokemon.all
    render json: @pokemons
  end

  def show
    render json: @pokemon
  end

  def destroy
    @pokemon.destroy
  end

  def create
    trainer_id = JSON.parse(request.raw_post)["trainer_id"].to_i
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    render json: Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
  end

  private

  def render_pokemon
    @pokemon = Pokemon.find(params[:id])
  end
end
