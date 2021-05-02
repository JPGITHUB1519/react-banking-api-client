import camelCase from "lodash/camelCase";
import startCase from "lodash/startCase";
import snakeCase from "lodash/snakeCase";
import kebabCase from "lodash/kebabCase";
import ObjectDetail from './components/ObjectDetail';

// getObjectDetailsJSX
export const getObjectDetailsJSX = (object) => {
  // const items = Object.keys(object).map(key => {
  //   return <p className="object-detail"><strong>{key}: </strong>{object[key]}</p>;
  // });

  const items = Object.keys(object).map(key => {
    return <ObjectDetail title={key} value={object[key]} />
  })
  return items;
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
// generates a fields object from a list of records or a single recod
export const generateFieldsFromData = (data, fieldStringCase="camelCase") => {
  const fields = {
  };

  if (data) {
    let firstRecord;

    // determining if the data is an array of data or a single record
    if (data[0]) {
      firstRecord = data[0]
    } else {
      firstRecord = data;
    }

    for (const key in firstRecord) { 
      let fieldName = convertToCase(key, fieldStringCase);

      fields[fieldName] = {
        type: 'text',
        disabled: false
      }

      // id should not be required
      if (fieldName !== 'id') {
        fields[fieldName]['isRequired'] = true;
      }
    }

    return fields;
  }
};

// convert the object keys case
export const convertObjectKeysCase = (object, stringCase="camelCase") => {
  const newObject = {};
  Object.keys(object).forEach(key => {
    newObject[convertToCase(key, stringCase)] = object[key];
  });

  return newObject;
}

// transform the a string case
export function convertToCase(string, stringCase="camelCase") {
  let convertedString;
  switch (stringCase) {
    case 'camelCase':
      convertedString = camelCase(string);
      break;
    case 'pascalCase':
      convertedString = pascalCase(string);
      break;
    case 'snakeCase':
      convertedString = snakeCase(string);
      break;
    case 'kebabCase':
      convertedString = kebabCase(string);
      break;
    default: 
    convertedString = camelCase(string);
    break;
  }

  return convertedString;
}

export const slowAjaxRequestSingle = (timeout=5000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: Math.random() * 10,
        name: `tester name` ,
        balance: `tester name ${Math.random() * 1000}`,
        customerId: 1,
        dateOpened: `10/20/2020`
      });
    }, timeout);
  });
};

export const slowAjaxRequestMultiple = (timeout=5000) => {
  const data = {
    data: [
      {
        id: 1,
        name: 'jean' 
      },
      {
        id: 2,
        name: 'Branded Gipson'
      },
      {
        id: 3,
        name: 'Georgina Hazel'
      }
    ]
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, timeout)
  })
}

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
