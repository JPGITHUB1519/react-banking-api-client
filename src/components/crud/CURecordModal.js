import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import Alert from '../alert/Alert';
import ButtonPrimary from '../button/ButtonPrimary';
import * as Utils from '../../Utils';

// Dynamic formFields form from Array
class CUFormModal extends React.Component {
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
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
  }

  async componentDidMount() {
    // set the initial values to empty
    let form = {};

    // if the form is create, initialize the fields as empty
    if (this.props.action === 'create') {
      Object.keys(this.props.formFields).forEach(fieldName => {
        form[fieldName] = '';
      });
      this.setState({
        form: form
      });
    } 
  
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

  // getRecord() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         id: Math.random() * 10,
  //         name: `tester name ${Math.random() * 10}` ,
  //         balance: `tester name ${Math.random() * 10}`,
  //         customerId: 1,
  //         dateOpened: `tester name ${Math.random() * 10}`
  //       });
  //     }, 5000);
  //   });
  // }

  // previous approach to fill the form with the record, network request logic in lifecycle
  // the problem with this was that we were showing the modal before getting the data
  // async componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (this.props.action === 'update') {
  //     // Only do a network request if the selected record is not the same
  //     // if the selected record is the same there is not need to make a network request again
  //     if (prevProps.selectedRecordId != this.props.selectedRecordId) {
  //       console.log('component did update');
  //       let record = await this.getRecord();
  //       // converting record keys string case
  //       record = Utils.convertObjectKeysCase(record, 'camelCase');
  //       const form = {};
        
  //       // fill the form with the record info
  //       for (const key in record) {
  //         form[key] = record[key];
  //       }
        
  //       // updating state for filling form
  //       this.setState({
  //         form: form
  //       });
  //     }
  //   }
  // }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // only if the action is update
    if (this.props.action === 'update') {
      // we should only update state if the selected record is different from the previous selected
      if (prevProps.selectedRecord.id !== this.props.selectedRecord.id) {
        this.fillFormStateFromRecord(this.props.selectedRecord);
      }
    }
  }
  
  // fill state form property from a record
  fillFormStateFromRecord(record) {
    record = Utils.convertObjectKeysCase(record, 'camelcase');
    const form = {};

    // fill the form with the record info
    for (const key in record) {
      form[key] = record[key];
    }
    
    // updating state for filling form
    this.setState({
      form: form
    });
  }

  async handleSaveClick(e) {
    e.preventDefault();

    const formValidationErrors = this.validateForm();

    if (Object.keys(formValidationErrors).length === 0) {
      if (this.props.action === 'create') {
        this.create(formValidationErrors);
      }

      if (this.props.action === 'update') {
        this.update(formValidationErrors);
      }
    } else {
      this.showErrorAlert(formValidationErrors);
    }
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

  async create(formValidationErrors) {
    const response = await this.props.create(this.state.form);

    if (!response.error) {
      // fill the datatable
      this.props.resetDatatable();

      const alertContent = [
        <><strong><p>Record Added Succesfully!</p></strong><br/></>,
        ...Utils.getObjectDetailsJSX(response)
      ];
      
      this.clearForm();

      this.setState({
        formAlert: {
          show: true,
          type: 'success',
          content: alertContent
        }
      })

      // remove alert notification after a few seconds:
      this.closeAlert(5000);
    } else {
      this.showErrorAlert(response);
    }
  } 

  async update(formValidationErrors) {
    const response = await this.props.update(this.state.form);

    if (!response.error) {
      this.props.resetDatatable();

      const alertContent = [
        <><strong><p>Record Updated Successfully</p></strong><br /></>,
        ...Utils.getObjectDetailsJSX(response)
      ];

      this.setState({
        formAlert: {
          show: true,
          type: 'success',
          content: alertContent
        }
      });

      this.closeAlert(5000);
    } else {
      this.showErrorAlert(response);
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

  closeAlert(timeout) {
    if (!timeout) {
      this.setState({
        formAlert: {
          show: false
        }
      });
    } else {
      setTimeout(() => {
        this.setState({
          formAlert: {
            show: false
          }
        });
      }, timeout);
    }
  }

  handleAlertCloseClick() {
    this.closeAlert();
  }

  handleCloseModalClick() {
    // call custom component code on modal close click before call parent method
    // close alert before Closing Modal
    this.closeAlert();

    // call props close function
    this.props.onCloseClick();
  }
  
  render() {
    const formFields = this.props.formFields;
    let modalHeader = '';

    if (this.props.action === 'create') {
      modalHeader = `Create ${this.props.entityName} Record`;
    } else if (this.props.action === 'update') {
      modalHeader = `Update ${this.props.entityName} Record`;
    }

    return (
      <Modal header={modalHeader} show={this.props.show} onCloseClick={this.handleCloseModalClick}>
        <form className="form">
          {Object.keys(formFields).map((field, index) => {
            // if the form is create, hide id field
            let disableField = formFields[field].disabled;

            if (this.props.action === 'create' && field === 'id') {
              return;
            }

            // if the form is update show id field as disabled   
            if (this.props.action === 'update' && field === 'id') {
              disableField = true;
            }

            return (
              <div className="form-group" key={index}> 
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
                  disabled={disableField} />
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

CUFormModal.propTypes = {
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
  action: PropTypes.string,      // can be create or update
  entityName: PropTypes.string,
  formFields: PropTypes.object,  // array of formFields objects
  show: PropTypes.bool,
  create: PropTypes.func,     // can be a create or update(add, edit) function
  findById: PropTypes.func,
  fillDatatable: PropTypes.func, // fill the crud datatable function.
  resetDatatable: PropTypes.func, // reset crud datatable function
  onCloseClick: PropTypes.func,
  selectedRecord: PropTypes.object,  // only for update modal,
};

CUFormModal.defaultProps  = {
  action: 'create',
  pagination: true
}

export default CUFormModal;
