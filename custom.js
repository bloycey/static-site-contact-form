const token = "your-personal-access-token-here" // Generate a Personal Access Token here: https://github.com/settings/tokens
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
