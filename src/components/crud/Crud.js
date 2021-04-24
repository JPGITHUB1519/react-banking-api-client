import React from 'react';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import SearchForm from '../SearchForm';
import ButtonContainer from '../button/ButtonContainer';
import ButtonPrimary from '../button/ButtonPrimary';
import AddRecordModal from './AddRecordModal';
import * as Utils from '../../Utils';
// import * as AccountApi from '../../api/AccountApi';

class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showAddRecordModal: false
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleAddRecordModalClick = this.handleAddRecordModalClick.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
  }

  async componentDidMount() {
    // using get data method to fill the datatable
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

  handleAddRecordModalClick() {
    this.setState({
      showAddRecordModal: true
    })
  }

  handleCloseModalClick(modalName) {
    if (modalName === 'addModal') {
      this.setState({
        showAddRecordModal: false
      })
    }
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

    // making sure the children elements get the data on first render
    // do not render children until the data is fullfilled after initial render (componentDidMount)
    if (!this.state.data) {
      return null;
    }

    return (
      <div className="section">
        <h2 className="section-title">{this.props.title}</h2>
        <AddRecordModal 
          saveData={this.props.saveData}
          show={this.state.showAddRecordModal} 
          // fields={Object.keys(Utils.getColumnsFromData(this.state.data))} 
          // if the form fields is speficated use those, if not generate it automatically
          formFields={this.props.formFields ? this.props.formFields : Utils.generateFieldsFromData(this.state.data, 'camelCase')} 
          onCloseClick={this.handleCloseModalClick.bind(this, 'addModal')} />
        <SearchForm 
          title="Search: " 
          value={this.state.searchText} 
          onInputChange={this.handleSearchValueChange} 
          onSearchClick={this.handleSearchClick}
          typeOfButton="background" />
        <ButtonContainer>
          <ButtonPrimary title="Add Record" spacing='none' onClick={this.handleAddRecordModalClick} />
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
  saveData: PropTypes.func,
  actionButtons: PropTypes.bool,
  bulkDeleting: PropTypes.bool,
};

Crud.defaultProps = {
  actionButtons: true,
  bulkDeleting: true
};

export default Crud;                                                
