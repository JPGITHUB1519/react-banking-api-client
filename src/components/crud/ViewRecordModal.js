import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import RecordCard from '../RecordCard';

class ViewRecordModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
  } 

  handleCloseModalClick() {
    this.props.onCloseClick();
  }

  render() {
    return (
      <Modal header="View Record Modal" onCloseClick={this.handleCloseModalClick}>
        <div className="view-record">
          <RecordCard record={this.props.record} />
        </div>
      </Modal>
    );
  }
}


ViewRecordModal.propTypes = {
  record: PropTypes.object
};

export default ViewRecordModal;
