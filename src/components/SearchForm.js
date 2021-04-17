import React from 'react';
import PropTypes from 'prop-types';
import ButtonBackground from './button/ButtonBackground';
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
    // prop.buttonType = background || text
    return (
      <React.Fragment>
        <form className="form">
          <div className="form-group">
            <label className="form-label">{this.props.title}</label>
            <input className="form-input" type="text" name="search-value" onChange={this.handleInputChange} />
            
            {this.props.typeOfButton === 'background' && <ButtonBackground type="search" onClick={this.handleSearchClick} />}
          </div>
          
          {this.props.typeOfButton === 'text' && <ButtonPrimary title="Search" onClick={this.handleSearchClick} />}
        </form>
      </React.Fragment>
    );
  }
}

SearchForm.propTypes = {
  onSearchClick: PropTypes.func,
  title: PropTypes.string,
  typeOfButton: PropTypes.string,
}

SearchForm.defaultProps = {
  typeOfButton: "text"
};

export default SearchForm;
