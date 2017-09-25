# frozen_string_literal: true

# [ExpensesController]
class ExpensesController < ApplicationController
  layout 'expenses'

  # GET /expenses
  # GET /expenses.json
  def index
    @expenses_props = Expense.all
  end

  # POST /expenses
  # POST /expenses.json
  def create
    @expense = Expense.new(expense_params)

    if @expense.save
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # PUT /expenses/:id
  # PUT /expenses/:id.json
  def update
    @expense = Expense.find params.fetch(:id)

    if @expense.update(expense_params)
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # DELETE /expenses/:id
  # DELETE /expenses/:id.json
  def destroy
    @expense = Expense.find params.fetch(:id)
    @expense.destroy
    head :no_content
  end

  private

  def expense_params
    params.require(:expense).permit(:amount,
                                    :category,
                                    :description,
                                    :paid_by,
                                    :vendor)
  end
end
