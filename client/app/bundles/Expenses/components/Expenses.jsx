import PropTypes from 'prop-types';
import React from 'react';

import ExpenseForm from './ExpenseForm';
import ExpenseRow from './ExpenseRow';

export default class Expenses extends React.Component {
  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = { expenses: this.props.expenses };
  }

  getDefaultState() {
    records: []
  }

  // Tacks a new expense on!
  addExpense = (expense) => {
    var expenses = this.state.expenses;
    expenses.push(expense);
    this.setState(expenses: expenses)
  }

  render() {
    var expenses = this.state.expenses.map((expense) => {
      return (<ExpenseRow key={expense.id} expense={expense} />)
    })
    return (
      <div className="expenses">
        <h2>
          Expenses
        </h2>
        <div className="row">
          <div className="col col-md-6">
            <h3>New Expense</h3>
          </div>
          <div className="col col-md-6">
            <h3>All Expenses</h3>
          </div>
        </div>
        <div className="col col-md-6">
          <ExpenseForm handleNewRecord={this.addExpense} />
        </div>
        <div className="col col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Category</th>
                <th>Description</th>
                <th>Paid By</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
