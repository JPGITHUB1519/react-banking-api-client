import React from 'react';
import ButtonPrimary from './button/ButtonPrimary';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchClick(e) {
    e.preventDefault();
    this.props.onSearchClick();
  }

  handleInputChange(e) {
    this.props.onInputChange(e.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <form className="form">
          <div className="form-group">
            <label className="form-label">{this.props.title}</label>
            <input className="form-input" type="text" name="search-value" onChange={this.handleInputChange} />
          </div>
          <ButtonPrimary title="Search" onClick={this.handleSearchClick} />
        </form>
      </React.Fragment>
    );
  }
}

export default SearchForm;
