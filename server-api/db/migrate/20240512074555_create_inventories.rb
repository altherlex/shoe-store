class CreateInventories < ActiveRecord::Migration[7.0]
  def change
    create_table :inventories do |t|
      t.string :store
      t.string :kind
      t.integer :inventory

      t.timestamps
    end
  end
end
