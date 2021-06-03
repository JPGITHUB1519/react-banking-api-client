import { API_URL } from './APIUtils';

export const read = async (page=null, perPage=null) => {
  let response;
  let url = `${API_URL}/accounts`;

  if (page) {
    url = `${url}?page=${page}`;
    if (perPage) {
      url = `${url}&per_page=${perPage}`;
    }
  } 
  
  response = await fetch(url);
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

export const remove = async (id) => {
  const response = await fetch(`${API_URL}\\accounts\\${id}`, {
    method: "delete"
  });

  return response.status;
};


export const bulkDelete = async (ids) => {
  const promises = ids.map((id) => {
    // returning promises to be used in promise all
    return remove(id);
  });

  const responses = await Promise.all(promises);

  return responses;
};
