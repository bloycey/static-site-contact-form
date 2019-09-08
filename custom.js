const token = "8f91ca56eca507210ca2deb97b7239b75c82a528" // This is a dummy account set up purely for testing. Usually it is not advised to EVER expose a key like this.
const contactForm = document.getElementById("contactForm");
const formIds = ["name", "email", "enquiry", "about"]
const formTitle = {
    prefix: "New Enquiry from",
    formId: "name"
}
const labelId = "about";
const confirmationNote = document.getElementById("confirmation-note");

const showConfirmation = () => {
    confirmationNote.style.display = "block";
        setTimeout(() => {
            confirmationNote.style.display = "none";
    }, 7000);
}

const repoDetails = {
    accountName: "static-contact-form-example",
    repoName: "static-contact-form-example"
}

const issueOptions = {
    repoDetails,
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