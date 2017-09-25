import FlipMove from 'react-flip-move';
import React from 'react';
import update from 'immutability-helper';

import ExpenseForm from '../components/ExpenseForm';
import ExpenseRow from '../components/ExpenseRow';
import PayerWidget from '../components/PayerWidget';

/** Index view for expenses */
export default class Expenses extends React.Component {
  /**
   * @param {object} props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#
    // es6-classes
    this.state = {expenses: this.props.expenses};
  }

  /**
   * Initialise with an empty array
   * */
  getDefaultState() {
    expenses: [];
  }

  /**
   * Tacks a new expense on!
   * @param {ExpenseRow} expense
   */
  addExpense = (expense) => {
    const expenses = update(this.state.expenses, {$push: [expense]});

    this.setState({expenses: expenses});
  }

  /**
   * Removes an expense from the view
   * @param {ExpenseRow} expense
   */
  deleteExpense = (expense) => {
    const index = this.state.expenses.indexOf(expense);
    const expenses = update(this.state.expenses, {$splice: [[index, 1]]});

    this.setState({expenses: expenses});
  }

  /**
   * Updates an expense!
   * @param {ExpenseRow} expense the expense to be updated
   * @param {Json} data the new expense data
   */
  updateExpense = (expense, data) => {
    const index = this.state.expenses.indexOf(expense);
    const expenses = update(this.state.expenses,
                            {$splice: [[index, 1, data]]});
    this.setState({expenses: expenses});
  }

  /**
   * @return {object} jsx markup
   */
  render() {
    // Creates the expenses, sorted by value and ready to render
    const expenses = this.state.expenses.sort(
      (a, b) => {
        return b.amount - a.amount;
      }
    ).map((expense) => {
      return (
        <ExpenseRow key={expense.id}
                    expense={expense}
                    handleDeleteExpense={this.deleteExpense}
                    handleUpdateExpense={this.updateExpense} />
      );
    });

    // Sum the amounts paid per payer
    let payers = new Map();
    for (let expense of this.state.expenses) {
      const amount = payers.get(expense.paid_by) || 0;
      payers.set(expense.paid_by, amount + expense.amount);
    }
    // Sort the amounts
    payers = new Map([...payers.entries()].sort(
      (a, b) => {
        return b[1] - a[1];
      }
    ));
    // Build the list of widgets to be rendered
    const payersView = [];
    for (let payer of payers) {
      payersView.push(
        <PayerWidget key={payer[0]}
                     payer={payer[0]}
                     amount={payer[1]} />
      );
    };

    return (
      <div className="expenses">
        <h2>
          Expenses
        </h2>
        <FlipMove className="row" duration={750} easing="ease-in">
          {payersView}
        </FlipMove>
        <div className="col col-md-3">
          <h3>New Expense</h3>
        </div>
        <div className="col col-md-9">
          <h3>All Expenses</h3>
        </div>
        <div className="col col-md-3">
          <ExpenseForm handleNewExpense={this.addExpense} />
        </div>
        <div className="col col-md-9">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Vendor</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Paid By</th>
                <th scope="col">Amount</th>
                <th scope="col" className="numeric">Action</th>
              </tr>
            </thead>
            <FlipMove typeName="tbody">
              {expenses}
            </FlipMove>
          </table>
        </div>
      </div>
    );
  }
}
