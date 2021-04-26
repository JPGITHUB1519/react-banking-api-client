import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';

class EditRecordModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal header="Edit Record" show={this.props.show} onCloseClick={this.props.onCloseClick}>

      </Modal>
    );
  }

}

EditRecordModal.propTypes = {
  show: PropTypes.bool,
  saveData: PropTypes.func,
  findData: PropTypes.func,
  onCloseClick: PropTypes.func
}

export default EditRecordModal;
