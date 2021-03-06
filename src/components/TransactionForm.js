import React from 'react';
import PropTypes from 'prop-types';
import Alert from './alert/Alert';
import ButtonPrimary from './button/ButtonPrimary';
import * as APIUtils from '../api/APIUtils';
import * as Utils from '../Utils';

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
        content: []
      }
    };

    // DOM element to use focus DOM method
    this.initialInput = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAlertCloseClick = this.handleAlertCloseClick.bind(this);
  }

  componentDidMount() {
    // focus on initial input
    this.focusInitialInput();
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
        const alertContent = [
          <><strong>Successfull Transaction!</strong><br /><br /></>,
          ...Utils.getObjectDetailsJSX(transactionResult.data)
        ];
        this.setState({
          formAlert: {
            show: true,
            type: 'success',
            content: alertContent
          }
        });

        this.clearForm();
      }

      if (transactionResult.transactionStatus === "failed") {
        this.showErrorAlert(transactionResult.message);
      }
    } else {
      this.showErrorAlert(formValidationErrors);
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

  clearForm() {
    this.setState({
      amount: '',
      transferorAccountId: '',
      transfereeAccountId: '',
    });

    this.focusInitialInput();
  }

  focusInitialInput() {
    this.initialInput.current.focus();
  }

  showErrorAlert(errorsObject) {
    const alertContent = Utils.getObjectDetailsJSX(errorsObject);

    this.setState({
      formAlert: {
        show: true,
        type: 'danger',
        content: alertContent
      }
    });
  }

  render() {
    return (
      <div className="section section--height-fullviewport">
        <h1 className="section-title">Bank Transaction</h1>
        <form className="form">
          <div className="form-group">
            <label>Amount</label>
            <input 
              ref={this.initialInput}
              className="form-input" 
              type="number" 
              name="amount" 
              min="0"
              value={this.state.amount} 
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Transferor Account</label>
            <input 
              className="form-input" 
              type="text"
              name="transferorAccountId" 
              value={this.state.transferorAccountId} 
              onChange={this.handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label>Transferee Account</label>
            <input 
              className="form-input" 
              type="text" 
              name="transfereeAccountId" 
              value={this.state.transfereeAccountId} 
              onChange={this.handleInputChange} 
            />
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

TransactionForm.propTypes = {};

export default TransactionForm;
