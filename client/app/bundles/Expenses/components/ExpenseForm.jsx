import React from 'react';

const initialState = {amount: '',
                      category: '',
                      description: '',
                      paid_by: '',
                      vendor: ''};

/** A form to create new expenses */
export default class ExpenseForm extends React.Component {
  /**
   * @param {object} props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = initialState;
  }

  /**
   * Handles changes to the form
   * @param {object} e the event
   */
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  /**
   * Handles form submission
   * @param {object} e the event
   */
  handleSubmit = (e) => {
    e.preventDefault();
    $.post('',
           {expense: this.state},
           (data) => {
             this.props.handleNewExpense(data);
             this.setState(initialState);
           },
           'JSON');
  }

  /**
   * Checks if the form is ready to submit
   * @return {boolean}
   */
  valid = () => {
    return this.state.amount > 0 &&
             this.state.category &&
             this.state.description &&
             this.state.paid_by &&
             this.state.vendor;
  }

  /**
   * @return {object} the jsx markup
   */
  render() {
    return (
      <form className="form-horizontal"
            onSubmit={this.handleSubmit}>
        <div className="input-group form-group">
          <label className="input-group-addon">Vendor</label>
          <input className="form-control"
                 name="vendor"
                 onChange={this.handleChange}
                 placeholder="Royal Alfred"
                 type="text"
                 value={this.state.vendor} />
        </div>
        <div className="input-group form-group">
          <label className="input-group-addon">Category</label>
          <input className="form-control"
                 name="category"
                 onChange={this.handleChange}
                 placeholder="Refreshments"
                 type="text"
                 value={this.state.category} />
        </div>
        <div className="input-group form-group">
          <label className="input-group-addon">Description</label>
          <input className="form-control"
                 name="description"
                 onChange={this.handleChange}
                 placeholder="Beers"
                 type="text"
                 value={this.state.description} />
        </div>
        <div className="input-group form-group">
          <label className="input-group-addon">Paid By</label>
          <input className="form-control"
                 name="paid_by"
                 onChange={this.handleChange}
                 placeholder="SJA"
                 type="text"
                 value={this.state.paid_by} />
        </div>
        <div className="input-group form-group">
          <label className="input-group-addon">Amount</label>
          <input className="form-control"
                 min="0"
                 name="amount"
                 onChange={this.handleChange}
                 placeholder="69"
                 type="number"
                 value={this.state.amount} />
        </div>
        <button className="btn btn-primary"
                disabled={!this.valid()}
                type="submit">
          <i className="fa fa-plus" />
          &nbsp;Add Expense
        </button>
      </form>
    );
  }
}
