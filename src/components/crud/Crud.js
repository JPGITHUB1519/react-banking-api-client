import React from 'react';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import SearchForm from '../SearchForm';
import ButtonContainer from '../button/ButtonContainer';
import ButtonPrimary from '../button/ButtonPrimary';

class Crud extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = ['id', 'name'];
    const rows = [
      {
        id: 1,
        name: 'jean'
      },
      {
        id: 2,
        name: 'pedro'
      }
    ];

    return (
      <div className="section">
        <h2 className="section-title">{this.props.title}</h2>
        <SearchForm title="Search: " typeOfButton="background" />
        <ButtonContainer>
          <ButtonPrimary title="Add Record" spacing='none' />
          <ButtonPrimary title="Bulk Delete" spacing='none' />
        </ButtonContainer>
        <Datatable theme="red" columns={columns} rows={rows} actionButtons={true} bulkDeleting={true} />
      </div>
    );
  }
}

Crud.propTypes = {
  title: PropTypes.string
};

export default Crud;                                                
