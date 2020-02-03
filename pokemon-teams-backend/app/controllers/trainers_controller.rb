class TrainersController < ApplicationController
  before_action :set_trainer, only: [:show]

  def index
    @trainers = Trainer.all
    render json: @trainers
  end

  def show
    render json: @trainer
  end

  private

  def set_trainer
    @trainer = Trainer.find(params[:id])
  end
end
