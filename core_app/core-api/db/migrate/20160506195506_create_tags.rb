class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.text :post
      t.string :link

      t.timestamps null: false
    end
  end
end
