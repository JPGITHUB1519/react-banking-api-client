import React from 'react';
import * as APIUtils from '../api/APIUtils';
import AccountSearchForm from './AccountSearchForm';
import AccountCardList from './AccountCardList';

class AccountDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'hola',
      notFound: false,
      accounts: []
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  async handleSearchClick() {
    const account = await APIUtils.getAccountById(this.state.searchValue);
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
      <div class="section">
        <h2 class="section-title">Account Detail</h2>
        <AccountSearchForm onSearchValueChange={this.handleSearchValueChange} onSearchClick={this.handleSearchClick} />
        
        {/* {this.state.accounts.length > 0 */}
        {!this.state.notFound
          ? <AccountCardList accountsData={this.state.accounts} />
          : <p style={{marginTop: '15px'}}>Not found</p>
        }
      </div>
    );
  }
}

export default AccountDetail;
