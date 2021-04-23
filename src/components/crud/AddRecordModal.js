import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import ButtonPrimary from '../button/ButtonPrimary';

// Dynamic fields form from Array
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
    this.props.fields.forEach(field => {
      form[field] = '';
    });
    
    this.setState({
      form: form
    });
 
    // do not do this
    // this.props.fields.forEach(field => {
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
    const inputs = this.props.fields;

    return (
      <Modal header="Add New Record" show={this.props.show} onCloseClick={this.props.onCloseClick}>
        <form className="form">
          {inputs.map(input => {
            return (
              <div className="form-group"> 
                <label>{input}</label>
                {/*
                To avoid rendering undefined at the first render(component did mount is executed after the first render)
                we need to do a short circuit validation to avoid rendering undefined */
                }
                <input name={input} className="form-input" value={this.state.form[input] || ''} onChange={this.handleChange} />
              </div>
            )
          })}
        </form>
        <ButtonPrimary title="Save" onClick={this.handleSaveClick} />
      </Modal>
    );
  }
}

AddRecordModal.propTypes = {
  fields: PropTypes.array,  // array of fields, sample [id, name, age],
  show: PropTypes.bool,
  onCloseClick: PropTypes.func
};

export default AddRecordModal;
