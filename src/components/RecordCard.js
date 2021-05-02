import PropTypes from 'prop-types';
import Card from './card/Card';
import * as Utils from '../Utils';

function RecordCard(props) {
  const objectDetailsJSX = Utils.getObjectDetailsJSX(props.record);
  
  return (
    <Card>
      {objectDetailsJSX}
    </Card>
  );
}

RecordCard.propTypes = {
  record: PropTypes.object
};

export default RecordCard;
