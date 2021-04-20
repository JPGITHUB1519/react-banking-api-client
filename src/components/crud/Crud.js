import React from 'react';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import SearchForm from '../SearchForm';
import ButtonContainer from '../button/ButtonContainer';
import ButtonPrimary from '../button/ButtonPrimary';

class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      data: []
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  async componentDidMount() {
    // using get aata method to fill the datatable
    const data = await this.props.getData();
    
    this.setState({
      data: data.data
    });
  }

  handleSearchValueChange(searchValue) {
    this.setState({
      searchText: searchValue
    });
  }

  async handleSearchClick() {
    const data = await this.props.searchData(this.state.searchText);
    this.setState({
      data: data.data
    });
  }

  render() {
    // const columns = ['id', 'name'];
    // const rows = [
    //   {
    //     id: 1,
    //     name: 'jean'
    //   },
    //   {
    //     id: 2,
    //     name: 'pedro'
    //   }
    // ];

    return (
      <div className="section">
        <h2 className="section-title">{this.props.title}</h2>
        <SearchForm 
          title="Search: " 
          value={this.state.searchText} 
          onInputChange={this.handleSearchValueChange} 
          onSearchClick={this.handleSearchClick}
          typeOfButton="background" />
        <ButtonContainer>
          <ButtonPrimary title="Add Record" spacing='none'  />
          <ButtonPrimary title="Bulk Delete" spacing='none' />
        </ButtonContainer>
        <Datatable theme="red" columns={this.props.columns} rows={this.state.data} actionButtons={this.props.actionButtons} bulkDeleting={this.props.bulkDeleting} />
      </div>
    );
  }
}

Crud.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.object,
  getData: PropTypes.func,
  searchData: PropTypes.func.isRequired,
  actionButtons: PropTypes.bool,
  bulkDeleting: PropTypes.bool,
};

Crud.defaultProps = {
  actionButtons: true,
  bulkDeleting: true
};

export default Crud;                                                
