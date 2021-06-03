export let API_URL;

if (!process.env.NODE_ENV || process.env.NODE_ENV) {
  console.log('development');
  // development
  API_URL = 'http://localhost:8090/php-banking-api-test-gpcuaw/project/api';
} else {
  console.log('production');
  // production
  API_URL = 'https://php-banking-api.herokuapp.com/api';
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


