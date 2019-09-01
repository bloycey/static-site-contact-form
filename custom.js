async function createIssue({endpoint, token, formTitle, labelId, formIds, callbackFn = () => null}) {
    
    const headers = {
        "Authorization" : `Token ${token}`
    }
    
    const convertFieldsToAPIBody = fieldsObject => {
        const keys = Object.keys(fieldsObject);
        const values = Object.values(fieldsObject);
        const strings = keys.map((key, index) => {
            return key + ": " + values[index] + " "
        })
        return strings;
    }

    const fieldsToObject = (obj, fieldName) => {
        return {
            ...obj,
            [fieldName]: document.getElementById(fieldName).value 
        }
    }

    const createTitle = ({ prefix, formId }) => {
        return `${prefix} ${document.getElementById(formId).value}`
    }

    const createLabels = labelId => {
        return ["Contact Form", document.getElementById(labelId).value]
    } 
    
    const fields = formIds.reduce(fieldsToObject, {});

    const payLoad = {
        title: createTitle(formTitle),
        labels: createLabels(labelId),
        body: convertFieldsToAPIBody(fields).join("\n"),
    }

    console.log("Payload", payLoad);

    const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payLoad)
    }).then(callbackFn())
}

const endpoint = "https://api.github.com/repos/static-contact-form-example/static-contact-form-example/issues"
const token = "8f91ca56eca507210ca2deb97b7239b75c82a528" // This is a dummy account set up purely for testing. Usually it is not advised to EVER expose a key like this.
const contactForm = document.getElementById("contactForm");
const formIds = ["name", "email", "enquiry", "about"]
const formTitle = {
    prefix: "New Enquiry from",
    formId: "name"
}
const labelId = "about"
const confirmationNote = document.getElementById("confirmation-note");
const showConfirmation = () => {
    confirmationNote.style.display = "block";
        setTimeout(() => {
            confirmationNote.style.display = "none";
    }, 7000);
}

const issueOptions = {
    endpoint,
    token,
    formTitle,
    labelId,
    formIds,
    callbackFn: showConfirmation
}

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createIssue(issueOptions);
    contactForm.reset();
});