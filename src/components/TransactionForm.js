import React from 'react';
import PrimaryButton from './PrimaryButton';

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      transferorAccount: '',
      transfereeAccount: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    return (
      <div className="section">
        <h1 className="section-title">Bank Transaction</h1>
        <form className="form">
          <div className="form-group">
            <label>Amount</label>
            <input className="form-input" type="number" name="amount" value={this.state.amount} onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label>Transferor Account</label>
            <input className="form-input" type="text" name="transferorAccount" value={this.state.transferorAccount} onChange={this.handleInputChange} />
          </div>
          <div class="form-group">
            <label>Transferee Account</label>
            <input className="form-input" type="text" name="transfereeAccount" value={this.state.transfereeAccount} onChange={this.handleInputChange} />
          </div>
          <PrimaryButton title="Transfer" />
        </form>
      </div>
    );
  }
}

export default TransactionForm;
