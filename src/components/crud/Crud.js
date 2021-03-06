import React from 'react';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import SearchForm from '../SearchForm';
import ButtonContainer from '../button/ButtonContainer';
import ButtonPrimary from '../button/ButtonPrimary';
import CUFormModal from './CURecordModal';
import ViewRecordModal from './ViewRecordModal';
import FullScreenLoader from '../loader/FullScreenLoader';
import Loader from '../loader/Loader';
import NotResultsFound from '../NotResultsFound';
import Pagination from '../pagination/Pagination';
import * as Utils from '../../Utils';
// import * as AccountApi from '../../api/AccountApi';

class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      // fully controlled form checkboxes
      checkboxes: {},
      data: [],
      isDataLoaded: false,
      showCreateRecordModal: false,
      showUpdateRecordModal: false,
      showViewRecordModal: false,
      showFullScreenLoader: false,
      selectedRecord: {},
      pagination: {
        page: 1,
        isPreviousEnabled: false,
        isNextEnabled: true,
        totalPages: 1
      }
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleCheckboxValueChange = this.handleCheckboxValueChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleAddRecordModalClick = this.handleAddRecordModalClick.bind(this);
    this.handleEditActionButtonClick = this.handleEditActionButtonClick.bind(this);
    this.handleViewActionButtonClick = this.handleViewActionButtonClick.bind(this);
    this.handleDeleteActionButtonClick = this.handleDeleteActionButtonClick.bind(this);
    this.handleBulkDeletingButton = this.handleBulkDeletingButton.bind(this);
    this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    this.handlePaginationPreviousClick = this.handlePaginationPreviousClick.bind(this);
    this.handlePaginationNumberClick = this.handlePaginationNumberClick.bind(this);
    this.handlePaginationNextClick = this.handlePaginationNextClick.bind(this);
    this.fillDatatable = this.fillDatatable.bind(this);
    this.resetDatatable = this.resetDatatable.bind(this);
  }

  async componentDidMount() {
    this.resetDatatable();
  }

  // lifesaver method
  // refill datatable and go to the first page if the pagination is enabled
  // if pagination is not enabled, just fill the datatable
  resetDatatable() {
    if (this.props.pagination) {
      this.setPageOnPagination(1);
    } else {
      this.fillDatatable();
    }
  }

  // refactor this in the future? nehh....
  // fill the datatable, if not parameters is set get all the records
  // if search text parameter is set, filter the data 
  // if page paramer is set, fill the datatable with pagination at the specified page
  async fillDatatable(searchText=null, page=null) {
    let data;
    let stateObject = {};

    this.setState({
      isDataLoaded: false
    });

    // if search text exists the method is called from the searchForm, else is called for the main CRUD component
    if (!searchText) {
      // if page parameter is enabled, make a pagination result else get all the records
      if (page) {
        data = await this.props.read(page, this.props.perPage);
        
        // setting the total pages in state
        stateObject.pagination = {
          ...this.state.pagination,
          totalPages: data.total_pages
        }
      } else {
        data = await this.props.read();
      }
    } else {
      data = await this.props.search(searchText);
    }

    if (data.data) {
      data = data.data;
    } else {
      data = [];
    }

    stateObject.data = data;
    stateObject.isDataLoaded = true;

    // if bulk deleting is enabled create checkboxes
    if (this.props.bulkDeleting) {
      const checkboxesObject = Utils.generateCheckboxObject(data);
      stateObject['checkboxes'] = checkboxesObject;
    } 

    this.setState(stateObject);
  }

  handleSearchValueChange(searchValue) {
    this.setState({
      searchText: searchValue
    });
  }

  handleCheckboxValueChange(e) {
    const target = e.target;
    const name = e.target.name;
    
    if (target.type === 'checkbox') {
      const value = target.checked;
      // shallow copy the state object
      let checkboxesCopy = { ...this.state.checkboxes };

      // do not do this because we are assigning the point to the state object
      // let checkboxesCopy = this.state.checkboxes ;
      checkboxesCopy[name] = value;
      this.setState({
        checkboxes: checkboxesCopy
      });
    }
  }

  async handleSearchClick() {
    // if search text is empty, go to the first page
    const searchText = this.state.searchText;
    if (searchText) {
      this.fillDatatable(this.state.searchText);
    } else {
      this.resetDatatable();
    }
  }

  handleAddRecordModalClick() {
    this.setState({
      showCreateRecordModal: true
    });
  }

  async handleEditActionButtonClick(e) {
    // id of the clicked element
    const id = this.getSelectedRecordId(e);

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

  async handleViewActionButtonClick(e) {
    const id = this.getSelectedRecordId(e);
    
    this.showFullScreenLoader();

    const record = await this.props.findById(id);

    this.hideFullScreenLoader();

    this.setState({
      selectedRecord: record,
      showViewRecordModal: true
    });
  }

  async handleDeleteActionButtonClick(e) {
    const id = this.getSelectedRecordId(e);

    const userConfirmation = window.confirm(`Are you sure you want to delete this ${this.props.entityName} with id: ${id}?`);

    if (userConfirmation) {
      const deleteStatusCode = await this.props.delete(id);

      if (deleteStatusCode === 204) {
        this.resetDatatable();
        // this message can be a little annoying, let's notify only when there is an error
        // alert(`${this.props.entityName} with id: ${id} deleted succesfully`);
      }

      if (deleteStatusCode === 404) {
        alert(`Failed to delete ${this.props.entityName} with id: ${id}, 404 Record not found`);
      }
    }
  }

  async handleBulkDeletingButton() {
    const checkedIds = this.getCheckedRecordsIds();

    if (checkedIds.length > 0) {
      const userConfirmation = window.confirm(`Are you sure you want to delete the selected records:?\n[${checkedIds.join(", ")}]`);
      if (userConfirmation) {
        this.showFullScreenLoader();
        const responses = await this.props.bulkDelete(checkedIds);
        this.hideFullScreenLoader();
        this.resetDatatable();
      }
    } else {
      alert("Please select the records to be deleted");
    }
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

    if (modalName === 'viewModal') {
      this.setState({
        showViewRecordModal: false
      });
    }
  }

  handlePaginationPreviousClick(e) {
    this.previousPage();
  }

  handlePaginationNextClick(e) {
    this.nextPage();
  }
  
  handlePaginationNumberClick(page) {
    this.setPageOnPagination(page);
  }

  getCheckedRecordsIds() {
    const checkedIds = Object.keys(this.state.checkboxes).filter(key => {
      if (this.state.checkboxes[key]) {
        return key;
      }
    });

    return checkedIds;
  }
  
  getSelectedRecordId(e) {
    const id = e.target.closest('tr').dataset.id;
    return id;
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

  previousPage() {
    let page = this.state.pagination.page;

    if (page > 1) {
      page--;
    }

    this.setPageOnPagination(page);
  }

  nextPage() {
    let page = this.state.pagination.page;
    const totalPages = this.state.pagination.totalPages;

    if (page < totalPages) {
      page++;
    }

    this.setPageOnPagination(page);
  }

  // set the actual page on the state and fill the datatable with the specified page
  setPageOnPagination(page) {
    let isPreviousEnabled;
    let isNextEnabled;
    
    // check if previous should be enabled
    if (page === 1) {
      isPreviousEnabled = false
    } else {
      isPreviousEnabled = true;
    }

    // check if next should be enabled
    if (page === this.state.pagination.totalPages) {
      isNextEnabled = false;
    } else {
      isNextEnabled = true;
    }

    // fill datatable with page
    this.fillDatatable(null,  page);

    this.setState({
      pagination: {
          ...this.state.pagination,
        page: page,
        isPreviousEnabled: isPreviousEnabled,
        isNextEnabled: isNextEnabled
      }
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

    // making sure the children elements get the data on first render
    // do not render children until the data is fullfilled after initial render (componentDidMount)
    // if (!this.state.data) {
    //   return null;
    // }

    let formFields = {};

    // formFields = customFormFields or generate fields from the database columns
    if (this.props.formFields) {
      formFields = this.props.formFields;
    } else {
      if (this.state.data) {
        formFields = Utils.generateFieldsFromData(this.state.data, 'camelCase');
      }
    }

    // if (this.state.data) {
    //   formFields = this.props.formFields ? this.props.formFields : Utils.generateFieldsFromData(this.state.data, 'camelCase');
    // }

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
          onCloseClick={this.handleCloseModalClick.bind(this, 'addModal')} 
          resetDatatable={this.resetDatatable}
        />
        
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
          resetDatatable={this.resetDatatable}
        />
        {this.state.showViewRecordModal && 
          <ViewRecordModal 
            record={this.state.selectedRecord} 
            onCloseClick={this.handleCloseModalClick.bind(this, 'viewModal')}
          />
        }
        <SearchForm 
          title="Search: " 
          value={this.state.searchText} 
          onInputChange={this.handleSearchValueChange} 
          onSearchClick={this.handleSearchClick}
          typeOfButton="background" />
        <ButtonContainer>
          <ButtonPrimary title="Add Record" spacing='none' onClick={this.handleAddRecordModalClick} />
          
          {this.props.bulkDeleting && 
            <ButtonPrimary title="Bulk Delete" spacing='none' onClick={this.handleBulkDeletingButton} /> 
          }
        </ButtonContainer>

        {!this.state.isDataLoaded &&
          <div className='loader-container'>
            <Loader />
          </div>
        }

        {this.state.isDataLoaded && this.state.data.length > 0 &&
          <Datatable 
            theme="red" 
            columns={this.props.columns} 
            rows={this.state.data} 
            checkboxes={this.state.checkboxes}
            onCheckboxValueChange={this.handleCheckboxValueChange}
            bulkDeleting={this.props.bulkDeleting}
            actionButtons={this.props.actionButtons} 
            onEditActionButtonClick={this.handleEditActionButtonClick}
            onViewActionButtonClick={this.handleViewActionButtonClick}
            onDeleteActionButtonClick={this.handleDeleteActionButtonClick}
          />      
        }

        {this.state.isDataLoaded && !this.state.data.length &&
          <NotResultsFound />
        }
        <FullScreenLoader show={this.state.showFullScreenLoader} />

        {this.props.pagination &&
          <Pagination
            totalPages={this.state.pagination.totalPages} 
            activePage={this.state.pagination.page} 
            isPreviousEnabled={this.state.pagination.isPreviousEnabled}
            isNextEnabled={this.state.pagination.isNextEnabled}
            onPreviousClick={this.handlePaginationPreviousClick}
            onNextClick={this.handlePaginationNextClick}
            onPageNumberClick={this.handlePaginationNumberClick}
          />
        }
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
  delete: PropTypes.func,
  bulkDelete: PropTypes.func, // only required if bulk deleting is enabled
  search: PropTypes.func.isRequired,
  actionButtons: PropTypes.bool,
  bulkDeleting: PropTypes.bool,
  pagination: PropTypes.bool,
  perPage: PropTypes.number
};

Crud.defaultProps = {
  actionButtons: true,
  bulkDeleting: true,
  pagination: true,
  perPage: 10
};

export default Crud;                                                
