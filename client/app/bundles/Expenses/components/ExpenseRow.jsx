import React from 'react';

/** A row in our table of expenses */
export default class ExpenseRow extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {editable: false};
  }

  // Events
  // ------

  handleEdit = (e) => {
    e.preventDefault();
    const data = {
      amount: this.refs.amount.value,
      category: this.refs.category.value,
      description: this.refs.description.value,
      id: this.props.expense.id,
      paid_by: this.refs.paid_by.value,
      vendor: this.refs.vendor.value,
    };
    $.ajax({data: {expense: data},
            dataType: 'JSON',
            method: 'PUT',
            success: () => {
              this.props.handleUpdateExpense(this.props.expense, data);
            },
            url: `/expenses/${this.props.expense.id}`});
    this.setState({editable: false});
  }

  /**
   * Toggles the row between editiable and not
   * @param {object} e the event
   */
  handleToggleEditable = (e) => {
    e.preventDefault();
    this.setState({editable: !this.state.editable});
  }

  /**
   * Deletes the expense
   * @param {object} e the event
   */
  handleDelete = (e) => {
    e.preventDefault();
    $.ajax({dataType: 'JSON',
            method: 'DELETE',
            success: () => {
              this.props.handleDeleteExpense(this.props.expense);
            },
            url: `/expenses/${this.props.expense.id}`});
  }

  // Displays
  // --------

  /**
   * Editable row
   * @return {object} jsx markup
   */
  expenseFormRow() {
    return (
      <tr>
        <td>
          <input className="form-control"
                 defaultValue={this.props.expense.vendor}
                 ref="vendor"
                 type="text" />
        </td>
        <td>
          <input className="form-control"
                 defaultValue={this.props.expense.category}
                 ref="category"
                 type="text" />
        </td>
        <td>
          <input className="form-control"
                 defaultValue={this.props.expense.description}
                 ref="description"
                 type="text" />
        </td>
        <td>
          <input className="form-control"
                 defaultValue={this.props.expense.paid_by}
                 ref="paid_by"
                 type="text" />
        </td>
        <td className="numeric">
          <input className="form-control"
                 defaultValue={this.props.expense.amount}
                 min="0"
                 ref="amount"
                 type="number" />
        </td>
        <td className="text-right">
          <a className="btn btn-danger"
             onClick={this.handleToggleEditable}>
             <i className="fa fa-times" />
             {this.state.editable}
          </a>
          <a className="btn btn-success"
             onClick={this.handleEdit}>
             <i className="fa fa-thumbs-up" />
          </a>
        </td>
      </tr>
    );
  }

  /**
   * Read only row
   * @return {object} jsx markup
   */
  expenseRow() {
    return (
      <tr>
        <td>{this.props.expense.vendor}</td>
        <td>{this.props.expense.category}</td>
        <td>{this.props.expense.description}</td>
        <td>{this.props.expense.paid_by}</td>
        <td className="numeric">{currencyFormat(this.props.expense.amount)}</td>
        <td className="text-right">
          <a className="btn btn-info"
             onClick={this.handleToggleEditable}>
             <i className="fa fa-pencil" />
             {this.state.editable}
          </a>
          <a className="btn btn-danger"
             onClick={this.handleDelete}>
             <i className="fa fa-bomb" />
          </a>
        </td>
      </tr>
    );
  }

  /**
   * Renders the expense row
   * @return {object} jsx markup
   */
  render() {
    return (this.state.editable ? this.expenseFormRow() : this.expenseRow());
  }
}
