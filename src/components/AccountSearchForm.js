import React from 'react';
import SearchForm from './SearchForm';

class AccountSearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SearchForm title="Account Number: " onInputChange={this.props.onSearchValueChange} onSearchClick={this.props.onSearchClick} />
    );
  }
}

export default AccountSearchForm;
