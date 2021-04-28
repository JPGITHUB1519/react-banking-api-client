import { API_URL } from './APIUtils';

export const read = async () => {
  const response = await fetch(`${API_URL}/accounts`);
  const json = await response.json();
  return json;
}

export async function findById(id) {
  const response = await fetch(`${API_URL}/accounts/${id}`);
  const json = await response.json();
  return json;
}

export const search = async (name) => {
  const response = await fetch(`${API_URL}/accounts?name=${name}`);
  const json = await response.json();
  return json;
}

export async function findByCustomerId(id) {
  const response = await fetch(`${API_URL}/customers/${id}/accounts`);
  const json = await response.json();
  return json;
}

// data = {
//   name: <name>,
//   balance: <balance>
//   customerId: <customerId>
// }
export const create = async (data) => {
  const response = await fetch(`${API_URL}/accounts`, {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      balance: data.balance,
      customerId: data.customerId
    })
  });

  const json = await response.json();
  return json;
};

// data = {
//   id: <id_to_update>
//   name: <name>,
//   balance: <balance>
//   customerId: <customerId>
// }
export const update = async (data) => {
  const response = await fetch(`${API_URL}/accounts/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: data.name,
      balance: data.balance,
      customerId: data.customerId
    })
  });
  
  const json = await response.json();
  return json;
};
