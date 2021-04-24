import { API_URL } from './APIUtils';

export async function getData() {
  const response = await fetch(`${API_URL}\\customers`);
  const json = await response.json();
  return json;
}

export async function searchData(value) {
  const response = await fetch(`${API_URL}\\customers?name=${value}`);
  const json = await response.json();
  return json;
}

// using objects instead of variables parameters because the order matters
// 
// data = {
//   name: <name>
// }
export const saveData = async (data) => {
  const response = await fetch(`${API_URL}\\customers`, {
    method: 'post',
    body: JSON.stringify({
      name: data.name
    })
  });

  const json = await response.json();
  return json;
}

