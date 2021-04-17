import PropTypes from 'prop-types';
import ButtonBackground from '../button/ButtonBackground'
import CheckboxTableCell from './CheckboxTableCell';

function DatatableRow(props) {
  return (
    <tr id={props.id}>
      {props.bulkDeleting && 
        <CheckboxTableCell />
      }
      {Object.keys(props.rowData).map(key => {
        return <td key={key}>{props.rowData[key]}</td>
      })}
      {props.actionButtons && 
        <td>
          <ButtonBackground type="edit" onClick={() => console.log('edit')} />
          <ButtonBackground type="delete" onClick={() => console.log('delete')} />
          <ButtonBackground type="read" onClick={() => console.log('read')} />
        </td>
      }
    </tr>
  );
}

DatatableRow.propTypes = {
  id: PropTypes.number,
  rowData: PropTypes.object,
  bulkDeleting: PropTypes.bool,
  actionButtons: PropTypes.bool
};

export default DatatableRow;
