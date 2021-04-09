import React from 'react';
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

export default CustomerSearchForm;
