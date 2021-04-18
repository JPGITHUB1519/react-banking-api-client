export let API_URL;

if (!process.env.NODE_ENV || process.env.NODE_ENV) {
  // development
  API_URL = 'http://localhost:8090/php-banking-api-test-gpcuaw/project/api';
} else {
  // production
  API_URL = 'https://php-banking-api.herokuapp.com/api';
}

export async function getAccountById(id) {
  const response = await fetch(`${API_URL}/accounts/${id}`);
  const json = await response.json();
  return json;
}

export async function getCustomerById(id) {
  const response = await fetch(`${API_URL}/customers/${id}`);
  const json = await response.json();
  return json;
}

export async function getAccountsByCustomerId(id) {
  const response = await fetch(`${API_URL}/customers/${id}/accounts`);
  const json = await response.json();
  return json;
}

export async function transferMoney(amount, transferorId, transfereeId) {
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'post',
    body: JSON.stringify({
      amount: amount,
      transferorAccountId: transferorId,
      transfereeAccountId: transfereeId
    })
  });
  const json = await response.json();
  return json;
}


