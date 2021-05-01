import React from 'react';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import SearchForm from '../SearchForm';
import ButtonContainer from '../button/ButtonContainer';
import ButtonPrimary from '../button/ButtonPrimary';
import CUFormModal from './CURecordModal';
import FullScreenLoader from '../loader/FullScreenLoader';
import Loader from '../loader/Loader';
import * as Utils from '../../Utils';
// import * as AccountApi from '../../api/AccountApi';

class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isDataLoaded: false,
      searchText: '',
      showCreateRecordModal: false,
      showUpdateRecordModal: false,
      showFullScreenLoader: false,
      selectedRecord: {}
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleAddRecordModalClick = this.handleAddRecordModalClick.bind(this);
    this.handleEditActionButtonClick = this.handleEditActionButtonClick.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    this.fillDatatable = this.fillDatatable.bind(this);
  }

  async componentDidMount() {
    // using get data method to fill the datatable
    const response = await this.fillDatatable();
  }

  async fillDatatable(searchText=null) {
    let data;

    this.setState({
      isDataLoaded: false
    });

    // if search text exists the method is called from the searchForm, else is called for the main CRUD component
    if (!searchText) {
      data = await this.props.read();
    } else {
      data = await this.props.search(searchText);
    }

    if (data.data) {
      data = data.data;
    } else {
      data = [];
    }

    this.setState({
      data: data,
      isDataLoaded: true
    });
  }

  handleSearchValueChange(searchValue) {
    this.setState({
      searchText: searchValue
    });
  }

  async handleSearchClick() {
    this.fillDatatable(this.state.searchText);
  }

  handleAddRecordModalClick() {
    this.setState({
      showCreateRecordModal: true
    })
  }

  async handleEditActionButtonClick(e) {
    // id of the clicked element
    const id = e.target.closest('tr').dataset.id;

    // show full screen loader
    this.showFullScreenLoader();

    const record = await this.props.findById(id);
    // TODO loading modal for slow ajax request
    // const record = await Utils.slowAjaxRequestSingle();

    // hide loader
    this.hideFullScreenLoader();
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

  showFullScreenLoader() {
    this.setState({
      showFullScreenLoader: true
    });
  }

  hideFullScreenLoader() {
    this.setState({
      showFullScreenLoader: false
    })
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
    // if (!this.state.data) {
    //   return null;
    // }

    let formFields = {};

    if (this.state.data) {
      formFields = this.props.formFields ? this.props.formFields : Utils.generateFieldsFromData(this.state.data, 'camelCase');
    }

    return (
      <div className="section" id={`${this.props.entityName}`}>
        <h2 className="section-title">{Utils.convertToCase(this.props.entityName, 'pascalCase')} CRUD</h2>
        <CUFormModal
          action="create"
          entityName={this.props.entityName}
          create={this.props.create}
          show={this.state.showCreateRecordModal} 
          // fields={Object.keys(Utils.getColumnsFromData(this.state.data))} 
          // if the form fields is speficated use those, if not generate it automatically
          formFields={formFields} 
          fillDatatable={this.fillDatatable}
          onCloseClick={this.handleCloseModalClick.bind(this, 'addModal')} />
        
        <CUFormModal
          action="update"
          entityName={this.props.entityName}
          update={this.props.update}
          findById={this.props.findById}
          selectedRecord={this.state.selectedRecord}
          formFields={formFields}
          show={this.state.showUpdateRecordModal}
          fillDatatable={this.fillDatatable}
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

        {!this.state.isDataLoaded &&
          <div class='loader-container'>
            <Loader />
          </div>
        }

        {this.state.isDataLoaded && this.state.data.length > 0 &&
          <Datatable 
            theme="red" 
            columns={this.props.columns} 
            rows={this.state.data} 
            bulkDeleting={this.props.bulkDeleting}
            actionButtons={this.props.actionButtons} 
            onEditActionButtonClick={this.handleEditActionButtonClick}
          />      
        }

        {this.state.isDataLoaded && !this.state.data.length &&
         <p className="no-results-paragraph">No results have been found.</p>
        }
        <FullScreenLoader show={this.state.showFullScreenLoader} />
      </div>
    );
  }
}

Crud.propTypes = {
  // title: PropTypes.string,
  entityName: PropTypes.string.isRequired,
  columns: PropTypes.object,
  formFields: PropTypes.object,
  create: PropTypes.func,
  update: PropTypes.func,
  read: PropTypes.func,
  findById: PropTypes.func,
  search: PropTypes.func.isRequired,
  actionButtons: PropTypes.bool,
  bulkDeleting: PropTypes.bool,
};

Crud.defaultProps = {
  actionButtons: true,
  bulkDeleting: true
};

export default Crud;                                                
