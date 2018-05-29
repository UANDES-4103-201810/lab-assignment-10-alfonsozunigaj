class AddColumnsToMovie < ActiveRecord::Migration[5.2]
  def change
    add_column :movies, :imdb_link, :string
    add_column :movies, :rt_link, :string
  end
end
