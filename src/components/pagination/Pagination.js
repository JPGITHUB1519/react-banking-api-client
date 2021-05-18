import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePageNumberClick = this.handlePageNumberClick.bind(this);
  } 

  handlePreviousClick(e) {
    e.preventDefault();
    this.props.onPreviousClick(e);
  }

  handlePageNumberClick(e) {
    e.preventDefault();
    const pageClicked = parseInt(e.target.parentNode.dataset.page);
    this.props.onPageNumberClick(pageClicked);
  }

  handleNextClick(e) {
    e.preventDefault();
    this.props.onNextClick(e);
  }

  render() {
    const liElements = [];
    let element;
    // ES6 array.from or ...Array(this.props.totalPages) can be used too
    for (let i = 1; i <= this.props.totalPages; i++) {
      // refactor this to use classnames package
      element = <li key={i} data-page={i} className="page-item">
                    <a className={`page-link ${this.props.activePage === i ? 'page-link--active' : ''} `} href="#" onClick={this.handlePageNumberClick}>
                      {i}
                    </a>
                </li>;
      liElements.push(element);

    }

    return (
      <nav className="pagination-container">
        <ul className="pagination">

          <li className="page-item">
            <a className={`page-link ${!this.props.isPreviousEnabled ? 'page-link--disabled': ''} `} href="#" onClick={this.handlePreviousClick}>
              Previous
            </a>
          </li>
          {liElements}
          {/* 
          <li class="page-item"><a className="page-link" href="#">1</a></li>
          <li class="page-item"><a className="page-link" href="#">2</a></li>
          <li class="page-item"><a className="page-link" href="#">3</a></li> */}
          <li className="page-item">
            <a className={`page-link ${!this.props.isNextEnabled ? 'page-link--disabled' : ''} `} href="#" onClick={this.handleNextClick}>Next</a>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number,
  activePage: PropTypes.number,
  isPreviousEnabled: PropTypes.bool,
  isNextEnabled: PropTypes.bool,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onPageNumberClick: PropTypes.func
};

export default Pagination;
