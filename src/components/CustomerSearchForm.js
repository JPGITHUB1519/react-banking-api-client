import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';

class CustomerSearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SearchForm title="CustomerId: " onInputChange={this.props.onSearchValueChange} onSearchClick={this.props.onSearchClick} />
    );
  }
}

CustomerSearchForm.propTypes = {
  onSearchValueChange: PropTypes.func,
  onSearchClick: PropTypes.func
};

export default CustomerSearchForm;
