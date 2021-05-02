import React from 'react';
import PropTypes from 'prop-types';
import RecordCard from './RecordCard';
import SearchForm from './SearchForm';
import Loader from './loader/Loader';  
import NotResultsFound from './NotResultsFound';

import * as Utils from '../Utils';

class RecordDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      record: {},
      loading: false,
      isLoaded: false
    }
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
  }

  handleSearchClick(e) {
    const id = this.state.searchValue;
    if (!id) {
      alert(`${this.props.entityName} id cannot be empty`);
      return ;
    }
    this.showRecordDetails(id);
  }

  handleSearchValueChange(searchValue) {
    this.setState({
      searchValue: searchValue
    });
  }

  async showRecordDetails(id) {
    this.setState({
      loading: true,
      isLoaded: false
    });

    const record = await this.props.findById(id);
    
    if (record && !record.error) {
      this.setState({
        record: record
      });
    } else {
      this.setState({
        record: {}
      })
    }

    this.setState({
      loading: false,
      isLoaded: true
    });
  }

  render() {
    return (
      <div className="section section--height-fullviewport">
        <h2 className="section-title">{this.props.entityName} Details</h2>
        <SearchForm 
          title={`${this.props.entityName} id: `} 
          value={this.state.searchValue} 
          onInputChange={this.handleSearchValueChange} 
          onSearchClick={this.handleSearchClick} />

        {this.state.loading &&
          <div class='loader-container'>
            <Loader />
          </div>
        }
        
        {this.state.isLoaded && Object.keys(this.state.record).length > 0 &&
          <RecordCard record={this.state.record}/>
        }

        {this.state.isLoaded && Object.keys(this.state.record).length === 0 &&
          <NotResultsFound />
        } 

      </div>
    );
  }
}

RecordDetails.propTypes = {
  entityName: PropTypes.string,
  findById: PropTypes.func
};


export default RecordDetails;
