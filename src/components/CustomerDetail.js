import React from 'react';
import PropTypes from 'prop-types';
import AccountCardList from './AccountCardList';
import CustomerSearchForm from './CustomerSearchForm';
import * as CustomerApi from '../api/CustomerApi';
import * as AccountApi from '../api/AccountApi';
import * as APIUtils from '../api/APIUtils';

class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      customer: {},
      accounts: [],
      found: null
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchValueChange(customerId) {
    this.setState({
      searchValue: customerId
    });
  }

  async handleSearchClick() {
    const id = this.state.searchValue;
    if (!id) {
      alert('CustomerId cannot be empty');
      return;
    }

    const customerData = await CustomerApi.findCustomer(id);
    
    if (customerData && !customerData.error) {
      const accountData = await AccountApi.getAccountsByCustomerId(id);
      this.setState({
        customer: customerData,
        accounts: accountData['data'],
        found: true
      }); 
    } else {
      this.setState({
        customer: {},
        accounts: [],
        found: false
      })
    }
    
  }

  render() {
    return (
      <div className="section section--height-fullviewport">
        <h2 className="section-title">Customer Detail</h2>
        <CustomerSearchForm value={this.state.searchValue} onSearchValueChange={this.handleSearchValueChange} onSearchClick={this.handleSearchClick} />
        {this.state.found && <p><span className='bold'>Name: </span> {this.state.customer.name}</p>}
        <AccountCardList accountsData={this.state.accounts} />

        {this.state.found === false && <p style={{marginTop: '15px'}}>Not found</p>}

        {this.state.accounts.length === 0 && this.state.found && <p style={{marginTop: '15px'}}>This customer does not have any accounts.</p>}
      </div>
    );
  }
}

CustomerDetail.propTypes = {};

export default CustomerDetail;
