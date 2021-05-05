import PropTypes from 'prop-types';
import ButtonBackground from '../button/ButtonBackground'

function DatatableRow(props) {
  return (
    <tr data-id={props.id}>
      {props.bulkDeleting && Object.keys(props.checkboxes).length > 0 &&
        <td>
          <input 
            type="checkbox" 
            name={`${props.id}`} 
            checked={props.checkboxes[`${props.id}`]} 
            onChange={props.onCheckboxValueChange}
          />
        </td>
      }
      {/* {Object.keys(props.rowData).map(key => {
        return <td key={key}>{props.rowData[key]}</td>
      })} */}
      {Object.keys(props.columns).map(column => {
        if (column in props.rowData) {
          return <td key={column}>{props.rowData[column]}</td>
        }
      })}
      {props.actionButtons && 
        <td>
          <ButtonBackground type="edit" onClick={props.onEditActionButtonClick} />
          <ButtonBackground type="delete" onClick={props.onDeleteActionButtonClick} />
          <ButtonBackground type="read" onClick={props.onViewActionButtonClick} />
        </td>
      }
    </tr>
  );
}

DatatableRow.propTypes = {
  id: PropTypes.number,
  rowData: PropTypes.object,
  columns: PropTypes.object,
  checkboxes: PropTypes.object,
  onCheckboxValueChange: PropTypes.func,
  bulkDeleting: PropTypes.bool,
  actionButtons: PropTypes.bool,
  onEditActionButtonClick: PropTypes.func,
  onViewActionButtonClick: PropTypes.func,
  onDeleteActionButtonClick: PropTypes.func
};

export default DatatableRow;
