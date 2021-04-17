import PropTypes from 'prop-types';
import Card from './card/Card';
import CardDetail from './card/CardDetail';

function AccountCard(props) {
  return (
    <Card>
      <CardDetail title="Account Number: " value={props.id}/>
      <CardDetail title="Account Name: " value={props.name} />
      <CardDetail title="Balance: " value={props.balance} />
      <CardDetail title="Customer ID: " value={props.customerId} />
      <CardDetail title="Date Opened: " value={props.dateOpened} />
    </Card>
  );
}

AccountCard.propTypes = {
  balance: PropTypes.string,
  customerId: PropTypes.number,
  dateOpened: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string
};

export default AccountCard;
