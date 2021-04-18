import React from 'react';
import PropTypes from 'prop-types';
import * as APIUtils from '../api/APIUtils';
import AccountSearchForm from './AccountSearchForm';
import AccountCardList from './AccountCardList';

class AccountDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      notFound: false,
      accounts: []
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  async handleSearchClick() {
    const id = this.state.searchValue;
    if (!id) {
      alert('Account number cannot be empty');
      return;
    }

    const account = await APIUtils.getAccountById(id);
    
    if (account && !account.error) {
      this.setState({
        accounts: [account],
        notFound: false
      });
    } else {
      this.setState({
        accounts: [],
        notFound: true
      });
    }
    
  }

  handleSearchValueChange(accountNumber) {
    this.setState({
      searchValue: accountNumber
    });
  }

  render() {
    return (
      <div className="section">
        <h2 className="section-title">Account Detail</h2>
        <AccountSearchForm value={this.state.searchValue} onSearchValueChange={this.handleSearchValueChange} onSearchClick={this.handleSearchClick} />
        
        {/* {this.state.accounts.length > 0 */}
        {!this.state.notFound
          ? <AccountCardList accountsData={this.state.accounts} />
          : <p style={{marginTop: '15px'}}>Not found</p>
        }
      </div>
    );
  }
}

AccountDetail.propTypes = {};

export default AccountDetail;
