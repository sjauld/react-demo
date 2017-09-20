import React from 'react';

export default class ExpenseRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.expense.vendor}</td>
        <td>{this.props.expense.category}</td>
        <td>{this.props.expense.description}</td>
        <td>{this.props.expense.paid_by}</td>
        <td>{this.props.expense.amount}</td>
        <td>:boom:</td>
      </tr>
    );
  }
}
