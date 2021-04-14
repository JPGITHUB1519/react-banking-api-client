import React from 'react';
import Alert from './alert/Alert';
import ButtonPrimary from './button/ButtonPrimary';
import * as APIUtils from '../api/APIUtils';
import * as Utils from './Utils';

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      transferorAccountId: '',
      transfereeAccountId: '',
      showAlert: true,
      formAlert: {
        show: false,
        type: 'info',
        content: ''
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAlertCloseClick = this.handleAlertCloseClick.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  handleAlertCloseClick() {
    this.setState(state => {
      return {
        formAlert: {
          show: !state.formAlert.show
        }
      };
    })
  }

  async handleClick(e) {
    e.preventDefault();

    const formValidationErrors = this.validateForm();

    if (Object.keys(formValidationErrors).length === 0) {
      const transactionResult = await this.transferMoney();
      if (transactionResult.transactionStatus === "successful") {
        const alertDOMString = `
          <p><strong>Successfull Transaction<strong>!</p><br>
          ${Utils.getAlertDOMStringFromObject(transactionResult.data)}
        `;
        this.setState({
          formAlert: {
            show: true,
            type: 'success',
            content: alertDOMString
          }
        });
      }

      if (transactionResult.transactionStatus === "failed") {
        const alertDOMString = Utils.getAlertDOMStringFromObject(transactionResult.message);
        this.setState({
          formAlert: {
            show: true,
            type: 'danger',
            content: alertDOMString
          }
        })
      }
    } else {
      const alertDOMString = Utils.getAlertDOMStringFromObject(formValidationErrors);
      this.setState({
        formAlert: {
          show: true,
          type: 'danger',
          content: alertDOMString
        }
      });
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
          <ButtonPrimary title="Transfer" onClick={this.handleClick} />
        </form>
        <Alert type={this.state.formAlert.type} show={this.state.formAlert.show} onCloseClick={this.handleAlertCloseClick}>
          {this.state.formAlert.content}
        </Alert>
      </div>
    );
  }
}

export default TransactionForm;
