import TransactionForm from './TransactionForm';
import Alert from './alert/Alert'
import AccountCard from './AccountCard';
import SearchForm from './SearchForm';
import AccountSearchForm from './AccountSearchForm';
import AccountDetail from './AccountDetail';
import CustomerDetail from './CustomerDetail';

function App() {
  const accountsData = [
    {
      number: "1020202",
      name: "Tester Account",
      balance: 5000,
      customerId: 1,
      dateOpened: "2021-03-20"
    },
    {
      number: "2020203",
      name: "Tester Account 2",
      balance: 10000,
      customerId: 2,
      dateOpened: "2021-04-21"
    }
  ];

  const customerData = {
    id: 1,
    name: 'Jean Urena'
  };

  return (
    <div className="app container">
      <TransactionForm />
      <AccountDetail accountsData={accountsData} />
      <CustomerDetail customerData={customerData} accountsData={accountsData} />
      <Alert type="dark" show={false}>
        Hello World
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
        <p>lorem</p>
      </Alert>
    </div>
  );
}

export default App;
