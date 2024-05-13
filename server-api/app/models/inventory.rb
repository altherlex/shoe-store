class Inventory < ApplicationRecord
  def formatted_created_at
    self[:created_at].to_datetime.strftime("%Y-%m-%d %H:%M")
  end
end
