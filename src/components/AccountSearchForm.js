import React from 'react';
import PropTypes from 'prop-types';
import SearchForm from './SearchForm';

class AccountSearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SearchForm title="Account Number: " value={this.props.value} onInputChange={this.props.onSearchValueChange} onSearchClick={this.props.onSearchClick} />
    );
  }
}

AccountSearchForm.propTypes = {
  value: PropTypes.string,
  onSearchValueChange: PropTypes.func,
  onSearchClick: PropTypes.func
};

export default AccountSearchForm;
