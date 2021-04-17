import React from 'react';
import PropTypes from 'prop-types';
import ButtonBackground from '../button/ButtonBackground';
import DatatableRow from './DatatableRow';
import CheckboxTableCell from './CheckboxTableCell';

class Datatable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="table-container">
        <table className={`datatable datatable--${this.props.theme}-theme`}>
          <thead>
            <tr>
              {this.props.bulkDeleting && <th></th>}
              {this.props.columns.map(column => {
                return <th>{column}</th>
              })}
              
              {this.props.actionButtons && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map(row => {
              return (
                <DatatableRow id={row.id} rowData={row} bulkDeleting={this.props.bulkDeleting} actionButtons={this.props.actionButtons} />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Datatable.propTypes = {
  theme: PropTypes.string,
  columns: PropTypes.array,
  rows: PropTypes.array,
  actionButtons: PropTypes.bool,
  bulkDeleting: PropTypes.bool
}

Datatable.defaultProps = {
  bulkDeleting: true,
  actionButtons: true,
  theme: 'red'
};

export default Datatable;
