import TransactionForm from './TransactionForm';
import Alert from './alert/Alert'
import AccountCard from './AccountCard';
import SearchForm from './SearchForm';
import AccountSearchForm from './AccountSearchForm';
import AccountDetail from './AccountDetail';
import CustomerDetail from './CustomerDetail';
import Modal from './modal/Modal';
import ButtonPrimary from './button/ButtonPrimary';
import ButtonBackground from './button/ButtonBackground';
import Loader from './loader/Loader';
import Crud from './crud/Crud';
import * as CustomerApi from '../api/CustomerApi';
import * as AccountApi from '../api/AccountApi';
import FullScreenLoader from './loader/FullScreenLoader';

function App() {
  // const accountsData = [
  //   {
  //     number: "1020202",
  //     name: "Tester Account",
  //     balance: 5000,
  //     customerId: 1,
  //     dateOpened: "2021-03-20"
  //   },
  //   {
  //     number: "2020203",
  //     name: "Tester Account 2",
  //     balance: 10000,
  //     customerId: 2,
  //     dateOpened: "2021-04-21"
  //   }
  // ];

  // const customerData = {
  //   id: 1,
  //   name: 'Jean Urena'
  // };

  const accountsColumnMap = {
    customer_id: 'Customer Identification',
    id: 'Identification',
    name: 'Short Name'
  };

  const customerFormFields = {
    // id: {
    //   type: 'text',
    //   disabled: true
    // },
    name: {
      type: 'text',
      disabled: false,
      isRequired: true
    }
  };
  
  const accountFormFields = {
    name: {
      type: 'text',
      disabled: false,
      isRequired: true
    },
    balance: {
      type: 'text',
      disabled: false,
      isRequired: true
    },
    customerId: {
      type: 'text',
      disabled: false,
      isRequired: true
    },
  };

  // const customersColumnMap = {
  //   name: 'full name',
  //   id: 'identification'
  // };

  return (
    <div className="app container">
      <TransactionForm />
      <AccountDetail />
      <CustomerDetail />
      {/* <Modal header="Customer Crud" onCloseClick={() => console.log('Hello There')}>
        <div>
          <p>Hola Mundo</p>
          <p>Hola Mundo</p>
        </div>     
      </Modal> */}
      {/* <ButtonBackground type="edit" onClick={() => console.log('Hello World')} /> */}
      {/* not using custom columns mapping, buttons enabled */}
      <Crud 
        // title="Customer Crud"
        entityName="customer"
        // formFields={customerFormFields}
        create={CustomerApi.create}
        update={CustomerApi.update}
        read={CustomerApi.read}
        findById={CustomerApi.findById}
        search={CustomerApi.search} 
        actionButtons={true}
        bulkDeleting={true}
      />

      {/* using customColumns Map, extra buttons disabled */}
      <Crud 
        // title="Account Crud"
        entityName="account"
        columns={accountsColumnMap}
        // formFields={accountFormFields}
        create={AccountApi.create}
        update={AccountApi.update}
        read={AccountApi.read}
        findById={AccountApi.findById}
        search={AccountApi.search}
        // actionButtons={false}
        bulkDeleting={false}
        // search={CustomerApi.search} 
        />
    </div>
  );
}

export default App;
