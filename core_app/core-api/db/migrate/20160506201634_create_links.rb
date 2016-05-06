class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :topic
      t.text :about

      t.timestamps null: false
    end
  end
end
