import React from 'react';

/** Just a little widget for payers */
export default class PayerWidget extends React.Component {
  /**
   * Renders our payer
   * @return {object} jsx markup
   */
  render() {
    return (
      <div className="col col-md-2">
        <div className="panel panel-primary">
          <div className="panel-heading">{this.props.payer}</div>
          <div className="panel-body">{currencyFormat(this.props.amount)}</div>
        </div>
      </div>
    );
  }
}
