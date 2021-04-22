import { API_URL } from './APIUtils';

export const getData = async () => {
  const response = await fetch(`${API_URL}/accounts`);
  const json = await response.json();
  return json;
}

export const searchData = async (name) => {
  const response = await fetch(`${API_URL}/accounts?name=${name}`);
  const json = await response.json();
  return json;
}

export const addData = async (name, balance, customerId) => {
  const response = await fetch(`${API_URL}/accounts`, {
    method: 'post',
    body: JSON.stringify({
      name: name,
      balance: balance,
      customerId: customerId
    })
  });

  const json = await response.json();
  return json;
};
