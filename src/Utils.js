
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

export const getColumnsFromData = (data) => {
  if (data && data[0]) {
    const firstRecord = data[0];
    const keys = Object.keys(firstRecord);
    let columns = {};
    keys.forEach(key => {
      columns[key] = key
    });
    return columns;
  }

  return {};
}

export const generateFieldsFromData = (data) => {
  const fields = {

  };

  if (data && data[0]) {
    const firstRecord = data[0];
    for (const key in firstRecord) {      
      fields[key] = {
        type: 'text',
        disabled: false
      }
    }
    return fields;
  }
};
