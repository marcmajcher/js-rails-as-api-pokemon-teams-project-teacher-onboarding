class PokemonsController < ApplicationController
  before_action :render_pokemon, only: [:show]

  def index
    @pokemons = Pokemon.all
    render json: @pokemons
  end

  def show
    render json: @pokemon
  end

  private

  def render_pokemon
    @pokemon = Pokemon.find(params[:id])
  end
end
