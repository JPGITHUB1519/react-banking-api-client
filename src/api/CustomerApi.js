import { API_URL } from './APIUtils';

export async function read() {
  const response = await fetch(`${API_URL}\\customers`);
  const json = await response.json();
  return json;
}

export async function findById(id) {
  const response = await fetch(`${API_URL}/customers/${id}`);
  const json = await response.json();
  return json;
}

export async function search(value) {
  const response = await fetch(`${API_URL}\\customers?name=${value}`);
  const json = await response.json();
  return json;
}

// using objects instead of variables parameters because the order matters
// 
// data = {
//   name: <name>
// }
export const create = async (data) => {
  const response = await fetch(`${API_URL}\\customers`, {
    method: 'POST',
    body: JSON.stringify({
      name: data.name
    })
  });

  const json = await response.json();
  return json;
};

// data = {
//   id:  <id_to_update>
//   name: <name>
// }
export const update = async (data) => {
  const response = await fetch(`${API_URL}\\customers\\${data.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: data.name
    })
  });

  const json = await response.json();
  return json;
};

