import camelCase from "lodash/camelCase";
import startCase from "lodash/startCase";
import snakeCase from "lodash/snakeCase";
import kebabCase from "lodash/kebabCase";



export const getJSXFromObject = (object) => {
  const result = [];

  for (const key in object) {
    const element = 
      <>
        <strong>
          {key}: {object[key]}
        </strong>
        <br />
      </>;
      
    result.push(element);
  }

  return result;
};

/*
  const object = {id: 1, name: 'jean'}
  to
  <strong>id:</strong>:1
  <strong>name:</strong jean
*/
export const getDOMStringFromObject = (object) => {
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

const pascalCase = (string) => {
  return startCase(camelCase(string)).replace(/ /g, '');
}

// FieldStringStyle
// camelCase (customerId) 
// pascalCase (CustomerId)
// snakeCase (customer_id)
// kebabCase (customer-id)
export const generateFieldsFromData = (data, fieldStringStyle="camelCase") => {
  const fields = {
  };

  if (data && data[0]) {
    const firstRecord = data[0];
    for (const key in firstRecord) { 
      let fieldName;
      switch (fieldStringStyle) {
        case 'camelCase':
          fieldName = camelCase(key);
          break;
        case 'pascalCase':
          fieldName = pascalCase(key);
          break;
        case 'snakeCase':
          fieldName = snakeCase(key);
          break;
        case 'kebabCase':
          fieldName = kebabCase(key);
          break;
      }
      fields[fieldName] = {
        type: 'text',
        disabled: false,
        isRequired: true
      }
    }

    return fields;
  }
};

// const convertHyphenCaseToPascalCase = (string) => {
//   const hyphenSplit = string.split("_");
//   const result = hyphenSplit
//     .map((string) => {
//       const stringSplit = string.split("");
//       const firstCharMayus = stringSplit[0].toUpperCase();
//       const sliced = stringSplit.slice(1, stringSplit.length).join("");
//       const upperCaseString = firstCharMayus + sliced;
//       return upperCaseString;
//     })
//     .join("");

//   return result;
// };
