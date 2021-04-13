
/*
  const object = {id: 1, name: 'jean'}
  to
  <strong>id:</strong>:1
  <strong>name:</strong jean
*/
export const getAlertDOMStringFromObject = (object) => {
  let alertDOMString = '';
  for (const key in object) {
    alertDOMString += `<strong>${key}: ${object[key]}</strong><br>`;
  }
  return alertDOMString;
};
