import AccountCard from './AccountCard';
import CardList from "./CardList";

function AccountCardList(props) {
  return (
    <CardList>
      {props.accountsData.map(accountData => {
        return <AccountCard 
          key={accountData.id}
          id={accountData.id}
          name={accountData.name}
          balance={accountData.balance}
          customerId={accountData.customer_id}
          dateOpened={accountData.date_opened}
        />
      })}
    </CardList>
  );
}

export default AccountCardList;
