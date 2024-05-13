class DashboardController < ApplicationController
  def index
    render( json: {
      consolidate: {
        total: Inventory.count,
        shoe_group: Inventory.group(:kind).count,
        store_group: Inventory.group(:store).count
      },
      group: {
        latest_sale: fetch_latest_sales
      }
    })
  end

  private
    def fetch_latest_sales
      dataset = Inventory.order('created_at DESC').where('created_at > ?', 6.hours.ago)
      dataset = dataset.group_by{|item| item.formatted_created_at}  
      dataset.map{|item| { date: item[0], sales_number: item[1].size } }
    end  

end
