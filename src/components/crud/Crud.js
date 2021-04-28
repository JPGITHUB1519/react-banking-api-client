import React from 'react';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import SearchForm from '../SearchForm';
import ButtonContainer from '../button/ButtonContainer';
import ButtonPrimary from '../button/ButtonPrimary';
import CUFormModal from './CURecordModal';
import * as Utils from '../../Utils';
// import * as AccountApi from '../../api/AccountApi';

class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showCreateRecordModal: false,
      showUpdateRecordModal: false,
      selectedRecord: {}
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleAddRecordModalClick = this.handleAddRecordModalClick.bind(this);
    this.handleEditActionButtonClick = this.handleEditActionButtonClick.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
  }

  async componentDidMount() {
    // using get data method to fill the datatable
    const data = await this.props.read();
    
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
    const data = await this.props.search(this.state.searchText);
    this.setState({
      data: data.data
    });
  }

  handleAddRecordModalClick() {
    this.setState({
      showCreateRecordModal: true
    })
  }

  async handleEditActionButtonClick(e) {
    // id of the clicked element
    const id = e.target.closest('tr').dataset.id;

    const record = await this.props.findById(id);
    // TODO loading modal for slow ajax request
    //const record = await Utils.slowAjaxRequest();

    // showing modal after getting data
    this.setState({
      selectedRecord: record,
      showUpdateRecordModal: true,
    });
  }


  handleCloseModalClick(modalName) {
    if (modalName === 'addModal') {
      this.setState({
        showCreateRecordModal: false
      })
    }

    if (modalName === 'editModal') {
      this.setState({
        showUpdateRecordModal: false
      });
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

    const formFields = this.props.formFields ? this.props.formFields : Utils.generateFieldsFromData(this.state.data, 'camelCase');
    return (
      <div className="section">
        <h2 className="section-title">{this.props.title}</h2>
        <CUFormModal
          action="create"
          create={this.props.create}
          show={this.state.showCreateRecordModal} 
          // fields={Object.keys(Utils.getColumnsFromData(this.state.data))} 
          // if the form fields is speficated use those, if not generate it automatically
          formFields={formFields} 
          onCloseClick={this.handleCloseModalClick.bind(this, 'addModal')} />
        
        <CUFormModal
          action="update"
          findById={this.props.findById}
          selectedRecord={this.state.selectedRecord}
          formFields={formFields}
          show={this.state.showUpdateRecordModal}
          onCloseClick={this.handleCloseModalClick.bind(this, 'editModal')}
        />
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
        <Datatable 
          theme="red" 
          columns={this.props.columns} 
          rows={this.state.data} 
          bulkDeleting={this.props.bulkDeleting}
          actionButtons={this.props.actionButtons} 
          onEditActionButtonClick={this.handleEditActionButtonClick}
        />
      </div>
    );
  }
}

Crud.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.object,
  formFields: PropTypes.object,
  read: PropTypes.func,
  findById: PropTypes.func,
  search: PropTypes.func.isRequired,
  create: PropTypes.func,
  actionButtons: PropTypes.bool,
  bulkDeleting: PropTypes.bool,
};

Crud.defaultProps = {
  actionButtons: true,
  bulkDeleting: true
};

export default Crud;                                                
