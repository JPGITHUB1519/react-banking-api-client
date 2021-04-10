import React from 'react';
import PrimaryButton from './PrimaryButton';
import * as APIUtils from '../api/APIUtils';

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      transferorAccountId: '',
      transfereeAccountId: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  async handleClick(e) {
    e.preventDefault();

    const formValidationErrors = this.validateForm();

    if (Object.keys(formValidationErrors).length === 0) {
      const transactionResult = await this.transferMoney();

      if (transactionResult.transactionStatus === "failed") {
        console.log('failed');
      }

      if (transactionResult.transactionStatus === "successful") {
        console.log('successful')
      }
      console.log(transactionResult);
    } else {
      console.log(formValidationErrors);
    }
  }

  async transferMoney() {
    const amount = this.state.amount;
    const transferorAccountId = this.state.transferorAccountId;
    const transfereeAccountId = this.state.transfereeAccountId;

    const response = await APIUtils.transferMoney(amount, transferorAccountId, transfereeAccountId);
    return response;
  }

  validateForm() {
    const amount = this.state.amount;
    const transferorAccountId = this.state.transferorAccountId;
    const transfereeAccountId = this.state.transfereeAccountId;
    const errors = {};

    if (!amount) {
      errors.amount = "Amount cannot be empty";
    } else if (isNaN(amount)) {
      errors.amount ="Amount should be a numeric value";
    } else if (Number(amount) <= 0) {
      errors.amount = "Amount cannot be 0 or a negative value";
    }

    if (!transferorAccountId) {
      errors.transferorAccountId = "Transferor account number cannot be empty";
    }

    if (!transfereeAccountId) {
      errors.transfereeAccountId = "Transferee account number cannot be empty";
    }

    if ((transferorAccountId && transferorAccountId) && transferorAccountId === transfereeAccountId) {
      errors.transferorAccountId = "Transferor and Transferee accounts cannot be equal";
      errors.transfereeAccountId = "Transferor and Transferee accounts cannot be equal";
    }

    return errors;
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
            <input className="form-input" type="text" name="transferorAccountId" value={this.state.transferorAccount} onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label>Transferee Account</label>
            <input className="form-input" type="text" name="transfereeAccountId" value={this.state.transfereeAccount} onChange={this.handleInputChange} />
          </div>
          <PrimaryButton title="Transfer" onClick={this.handleClick} />
        </form>
      </div>
    );
  }
}

export default TransactionForm;
