class InventoriesController < ApplicationController
  before_action :set_inventory, only: %i[ show ]

  # GET /inventories
  def index
    range = JSON.parse(params[:range]||"null") || [0,9]
    sort = JSON.parse(params[:sort]||"null") || ["updated_at","DESC"]

    page = range[0]
    rows = (range[1]-range[0])+1

    @inventories = Inventory.all.offset(page).limit(rows).order(sort.join(' '))

    render json: @inventories
  end

  # GET /inventories/1
  def show
    render json: @inventory
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inventory
      @inventory = Inventory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def inventory_params
      params.require(:inventory).permit(:store_name, :model_name, :inventory, :range, sort: [])
    end
end
