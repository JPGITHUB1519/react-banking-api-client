import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import Alert from '../alert/Alert';
import ButtonPrimary from '../button/ButtonPrimary';
import * as Utils from '../../Utils';

// Dynamic formFields form from Array
class AddRecordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      formAlert: {
        show: false,
        type: 'info',
        content: []
      }
    };

    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAlertCloseClick = this.handleAlertCloseClick.bind(this);
  }

  componentDidMount() {
    // set the initial values to empty
    const form = {};
    Object.keys(this.props.formFields).forEach(fieldName => {
      form[fieldName] = '';
    });
    // this.props.formFields.forEach(field => {
    //   form[field] = '';
    // });
    
    this.setState({
      form: form
    });
 
    // do not do this
    // this.props.formFields.forEach(field => {
    //   this.setState({
    //     form: {
    //       [field]: ''
    //     }
    //   });
    // });

    // this.setState({
    //   [field]: ''
    // });
  }

  async handleSaveClick(e) {
    // const response = await this.props.saveData(...Object.values(this.state.form));
    e.preventDefault();

    const formValidationErrors = this.validateForm();

    if (Object.keys(formValidationErrors).length === 0) {
      this.saveData(formValidationErrors);
    } else {
      this.showErrorAlert(formValidationErrors);
    }
    // if (this.props.formFields) {

    // }
  }

  showErrorAlert(errorsObject) {
    const alertContent = Utils.getJSXFromObject(errorsObject);
      this.setState({
        formAlert: {
          show: true,
          type: 'danger',
          content: alertContent
        }
      });
  }

  handleChange(e) {
    this.setState(previousState => {
      return {
        form: {
          ...previousState.form,
          [e.target.name]: e.target.value
        }
      }
    });
  }

  async saveData(formValidationErrors) {
    const response = await this.props.saveData(this.state.form);

    if (!response.error) {

      const alertContent = [
        <><strong><p>Record Added Succesfully!</p></strong><br/></>,
        ...Utils.getJSXFromObject(response)
      ];
      
      this.clearForm();

      this.setState({
        formAlert: {
          show: true,
          type: 'success',
          content: alertContent
        }
      })
    } else {
      this.showErrorAlert(response);
      console.log('error');
      console.log(response);
    }
  } 

  clearForm() {
    // clean every form field
    const form = {};
    for (const key in this.state.form) {
      form[key] = '';
    }

    this.setState({
      form: form
    });
  }
  
  validateForm() {
    const inputs = this.state.form;
    const errors = {};

    for (const key in inputs) {
      if (this.props.formFields[key].isRequired) {
        if (!inputs[key]) {
          errors[key] = `${key} cannot be empty`;
        }
      }
    }
    
    return errors;
  }

  handleAlertCloseClick() {
    this.setState({
      formAlert: {
        show: false
      }
    });
  }
  
  render() {
    const formFields = this.props.formFields;

    return (
      <Modal header="Add New Record" show={this.props.show} onCloseClick={this.props.onCloseClick}>
        <form className="form">
          {Object.keys(formFields).map(field => {
            return (
              <div className="form-group"> 
                <label>{field}</label>
                {/*
                To avoid rendering undefined at the first render(component did mount is executed after the first render)
                we need to do a short circuit validation to avoid rendering undefined */
                }
                <input 
                  name={field} 
                  type={formFields[field].type} 
                  className="form-input" 
                  value={this.state.form[field] || ''} 
                  onChange={this.handleChange} 
                  disabled={formFields[field].disabled} />
              </div>
            );
          })}
        </form>

        <Alert type={this.state.formAlert.type} show={this.state.formAlert.show} onCloseClick={this.handleAlertCloseClick}>
          {this.state.formAlert.content}
        </Alert>
        <ButtonPrimary title="Save" onClick={this.handleSaveClick} />
      </Modal>
    );
  }
}

AddRecordModal.propTypes = {
  // formFields = {
  //   name: {
  //     type: text,
  //     enable: true
  //   },

  //   lastName: {
  //     type: text,
  //     enable: true
  //   }
  //   age: {
  //     type: text,
  //     enable: true
  //   }
  //   status: {
  //     type: combo,
  //     enable: false
  //   }
  formFields: PropTypes.object,  // array of formFields objects
  show: PropTypes.bool,
  saveData: PropTypes.func,
  onCloseClick: PropTypes.func
};

export default AddRecordModal;
