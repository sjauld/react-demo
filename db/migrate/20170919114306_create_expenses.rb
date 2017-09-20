class CreateExpenses < ActiveRecord::Migration[5.1]
  def change
    create_table :expenses do |t|
      t.string :category
      t.string :vendor
      t.string :description
      t.string :paid_by
      t.float :amount

      t.timestamps
    end
  end
end
