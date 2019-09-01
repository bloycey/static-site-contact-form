async function createIssue({endpoint, token, formTitle, labelId, formIds, callbackFn = () => null}) {
    
    const headers = {
        "Authorization" : `Token ${token}`
    }
    
    const convertFieldsToAPIBody = fieldsObject => {
        const keys = Object.keys(fieldsObject);
        const values = Object.values(fieldsObject);
        const strings = keys.map((key, index) => `${key}: ${values[index]}`);
        return strings;
    }

    const fieldsToObject = (obj, fieldName) => ({...obj, [fieldName]: document.getElementById(fieldName).value});
    const createTitle = ({ prefix, formId }) => `${prefix} ${document.getElementById(formId).value}`;
    const createLabels = labelId => ["Contact Form", document.getElementById(labelId).value];
    
    const fields = formIds.reduce(fieldsToObject, {});
    const payLoad = {
        title: createTitle(formTitle),
        labels: createLabels(labelId),
        body: convertFieldsToAPIBody(fields).join("\n"),
    }

    await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payLoad)
    }).then(callbackFn())
}