import React from 'react';
import PropTypes from 'prop-types';
import ButtonBackground from '../button/ButtonBackground';

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
              {this.props.columns.map(column => {
                return <th>{column}</th>
              })}
              
              {!this.props.hideActionButtons && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map(row => {
              return (
                <tr id={row.id}>
                  {Object.keys(row).map(key => {
                    return <td>{row[key]}</td>
                  })}

                  {!this.props.hideActionButtons && 
                    <td>
                      <ButtonBackground type="edit" onClick={() => console.log('edit')} />
                      <ButtonBackground type="delete" onClick={() => console.log('delete')} />
                      <ButtonBackground type="read" onClick={() => console.log('read')} />
                    </td>
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Datatable.propTypes = {
  columns: PropTypes.array,
  hideActionButtons: PropTypes.bool,
  rows: PropTypes.array,
  theme: PropTypes.string
}

Datatable.defaultProps = {
  hideActionButtons: false,
  theme: 'red'
};

export default Datatable;
