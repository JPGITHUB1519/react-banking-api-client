import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import ButtonPrimary from '../button/ButtonPrimary';

// Dynamic formFields form from Array
class AddRecordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };

    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSaveClick() {
    console.log(this.state.form);
    console.log(this.props.saveData);
    // this.props.saveData();
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
  
  render() {
    const formFields = this.props.formFields;
    console.log(formFields);

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
