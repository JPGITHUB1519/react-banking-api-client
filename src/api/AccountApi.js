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

// data = {
//   name: <name>,
//   balance: <balance>
//   customerId: <customerId>
// }
export const addData = async (data) => {
  const response = await fetch(`${API_URL}/accounts`, {
    method: 'post',
    body: JSON.stringify({
      name: data.name,
      balance: data.balance,
      customerId: data.customerId
    })
  });

  const json = await response.json();
  return json;
};
