import React from 'react';
import PropTypes from 'prop-types';
import ButtonBackground from '../button/ButtonBackground';
import DatatableRow from './DatatableRow';
import * as Utils from '../../Utils';

class Datatable extends React.Component {
  constructor(props) {
    super(props);

    // columns for datatable, it is not on state because this will not change over the time 
    // sample
    // const columns = {
    //   customerId: "Customer Identification",
    //   id: "Identifier",
    //   name: "shortName"
    // };
    // this.columns = {};
  }

  // componentDidMount() {
  //   if (this.props.columns) {
  //     this.columns = this.props.columns;
  //   } else {
  //     // props.rows is empty because as a result of the initial render of the crud component
  //     console.log(this.props);
  //     //this.columns = this.getColumnsFromData(this.props.rows);
  //   }

  //   console.log(this.columns);
  // }

  render() {
    // sample column prop:
    //  {
    //   customer_id: "Customer Identification",
    //   id: "Identifier",
    //   name: "shortName"
    // };

    // columns prop format
    // {
    //   data_fielname: custom_column_title_in_datatable
    // }

    // a custom column prop allow us to:
    //   - Set which columns should appear and which not (black list and white list columns)
    //   - Specify the order of columns in the Datatable
    //   - Mapping a field to a custom title

    // if a custom column prop is not specified this component generates
    // the columns automatically using the method getColumnsFromData

    // avoiding perfomance issues
    if (!this.columns) {
      if (this.props.columns) {
        this.columns = this.props.columns;
      } else {
        // props.rows is empty because as a result of the initial render of the crud component
        this.columns = Utils.getColumnsFromData(this.props.rows);
      }
    }
  
    return (
      <div className="table-container">
        <table className={`datatable datatable--${this.props.theme}-theme`}>
          <thead>
            <tr>
              {this.props.bulkDeleting && <th></th>}
              {Object.keys(this.columns).map(column => {
                return <th>{this.columns[column]}</th>
              })}
              {/* {this.props.columns.map(column => {
                return <th>{column}</th>
              })}
               */}
              {this.props.actionButtons && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map(row => {
              return (
                <DatatableRow 
                  id={row.id} 
                  rowData={row} 
                  columns={this.columns}
                  checkboxes={this.props.checkboxes}
                  onCheckboxValueChange={this.props.onCheckboxValueChange}
                  bulkDeleting={this.props.bulkDeleting} 
                  actionButtons={this.props.actionButtons}
                  onEditActionButtonClick={this.props.onEditActionButtonClick}
                  onDeleteActionButtonClick={this.props.onDeleteActionButtonClick}
                  onViewActionButtonClick={this.props.onViewActionButtonClick}
                  // onDeleteActionButtonClick={this.props.onDeleteActionButtonClick}
                />
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
  columns: PropTypes.object, // optional, if not provided it is generated automatically
  rows: PropTypes.array,
  checkboxes: PropTypes.object, // only required if bulk deleting is enabled
  onCheckboxValueChange: PropTypes.func, // only required if bulk deleting is enabled
  bulkDeleting: PropTypes.bool,
  actionButtons: PropTypes.bool,
  onEditActionButtonClick: PropTypes.func, // only needed if actionButtons is true
  onViewActionButtonClick: PropTypes.func, // only needed if actionButtons is true
  onDeleteActionButtonClick: PropTypes.func // only needed if actionButtons is true
}

Datatable.defaultProps = {
  bulkDeleting: true,
  checkboxes: {},
  actionButtons: true,
  theme: 'red'
};

export default Datatable;
