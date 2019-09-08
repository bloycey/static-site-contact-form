# Static Site Enquiry Form

### What does it do?

This form posts data to a github repo's issues section. Enquiries made through the form can be categorised automatically and dealt with using the usual methods in the issues section (e.g. Issues can be resolved, deleted, assigned to certain users, etc).

### Why do I need it?

The main reason that this would be of use to you is if you are building a static website and still need contact form functionality. Typically a server is required to send emails using a contact form, however if you're using something like github pages or Netlify to host your site you do not have access to a server side language to handle your emails. This usually means that you can't have a contact form. 

Using the static site enquiry form no server is required! Instead the github API is used to send the enquiry to the issues section of your github page. 

### What are the limitations of using this method?

In some ways this project is just a proof of concept and there are several limitations that you should be aware of.

1. If your repository is public anyone can look at the enquiries sent through this form. As such, if you are using this method your repository should be private.
2. If your repository is private you no longer have access to github pages. Hmmm, how annoying. You need to have a private repo for privacy concerns, but then you can't use the github pages service. This means that you will need to host your actual site elsewhere. I suggest Netlify for this because they offer free static site hosting. 
3. Your github API key is NOT safe. This is because your API key needs to be stored on the client side. 

Some possible work-arounds:

1. Set up a new github repo on a seperate anonymous github account purely for receiving emails from this service. Then make that repository private. This isn't a perfect solution but it at least somewhat solves all 3 issues. Someone could stil use your API key to try and meddle with the repository, but since this repository will only have 1 empty repository on there and no personal details the damage an attacker could do would be minimal. 

I have used this work-around in the demo here:
Which posts the data to a dummy repo here: 

2. Host the site on Netlify and use environment variables. This is not something that I have figured out the specifics for, however if someone can get this working with Netlify environment variables I would welcome any Pull Requests updating this repo with the information! I *think* Netlify provides functionality for hiding environment variables whilst still serving a static site. It is defintely something to look into!

## So how do I use this thing?

The main functionality lives in `createIssue.js`. You can either import the whole file into your site, or just copy/paste the function into your own JS file. 

The `createIssue` function takes in a single object with a bunch of options that you can specify. Here is an example:

```
const issueOptions = {
    repoDetails: {
        accountName: "your-github-account-name",
        repoName: "your-github-repo-name"
    }
    token: "8j91ca56859507210ca2deb97b632b75c82j528"
    formTitle: {
        prefix: "New Enquiry from",
        formId: "name"
    }
    labelId: "about"
    formIds: ["name", "email", "enquiry", "about"]
    callbackFn: () => console.log("Enquiry sent to github!")
}
```

Phew, this looks like a lot. Really it's not so bad. Let's go through each field.

##### repoDetails

This is an object with two values: `accountName` and `repoName`. These fields represent the repository that holds all of the issues. 

##### token

This accepts a Personal Access Token string. You can get an access token from here: https://github.com/settings/tokens

##### formTitle

Accepts an object with two values: `prefix` and `formId`. This will be the title of the issue when it comes through into github. The purpose of the formId is so that a dynamic value can be passed into the title. For example, you may wish to have your issue title as "New enquiry from [name]". In this case you would need to provide the HTML ID of the name field in the form. You can see that I've done exactly this in the example provided. The `value` of the specified ID will be populated after the prefix.

##### labelId

Accepts a string that maps to a HTML ID. The element that the ID corresponds to is usually a `select` element and should hold a `value` that will be used as the label for the issue.

##### formIds

Accepts an array of HTML ID's as strings. This utility has been set up to be able to use as many fields as you like. You don't necessarily have to use this functionality for a contact form. You could use it for a quiz, survey, or something else entirely! Pass in an array of fields that you would like to include in the issue. The `createIssue` function looks for a `value` on each ID and will display it in the issue.

##### callbackFn (Optional)

Accepts a function. This function fires as soon as the API request has completed.

## Putting it all together!

Once you've set up the object to pass into the `createIssue` function you'll need to do something like this to call it:

```
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createIssue(issueOptions);
    contactForm.reset();
});
```

This simply prevents the page from reloading on submission, executes the function, and then clears the form.

## Help make this thing better!

This is purely in the exploration stage right now but I think it has the potential to be useful if refined properly. Happy to accept feedback or Pull Requests!