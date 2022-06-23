export default {
  isoName: "en-GB",
  nativeName: "English (GB)",
  label: {
    save: "Save",
    cancel: "Cancel",
    login: "Login",
    register: "Register",
    testResult: "Test Result",
    testResultPlural: "Test Results",
    updated: "Updated",
    added: "Added",
    deleted: "Deleted",
    update: "Update",
    add: "Add",
    delete: "Delete",
    personalDetails: "Personal Details",
    progressText: "{ count } of { total } submitted",
    completeText: "Seki! All @.lower:label.testResultPlural sent!",
    send: "Send",
    date: "Date",
    close: "Close",
    officialForm: "Official COVID-19 Rapid Test Self-Reporting form",
    password: "Password",
    signOut: "Sign out",
    addProfile: "@:label.add @:pages.profile.name",
    moh: "Sāmoan Ministry of Health",
    yes: "Yes",
    later: "Later",
    dismiss: "Dismiss",
    forgotPassword: "Forgot password",
    email: "Email",
    // status
    testResultAdded: "@:label.testResult @.lower:label.added",
    testResultUpdated: "@:label.testResult @.lower:label.updated",
    testResultDeleted: "@:label.testResult @.lower:label.deleted",
    profileAdded: "@:pages.profile.name @.lower:label.added",
    profileUpdated: "@:pages.profile.name @.lower:label.updated",
    profileDeleted: "@:pages.profile.name @.lower:label.deleted",
    // errors
    noInternet: "No internet detected",
    wrongPassword: "Wrong password",
    userNotFound: "Email not found",
    emailInUse: "Email already in use",
    userDisabled: "Email is disabled",
    weakPassword: "Weak password",
    invalidEmail: "Invalid emeail",
  },
  pages: {
    home: {
      name: "Home",
      p1: "Tālofa lava! You can use this app to {0}",
      p1Bold: "record your test results",
      p2: "We'll make it easy for you to send them to the @:label.moh or you can do it manually using their {0}",
      p3: "You can also {0} an account to access your tests from any device!",
      p4: "Press the {0} button to {1}",
      p4GetStarted: "get started!",
      resultsFound: "Mālō lava! You've recorded {count} {pluralText}.",
      sortDesc: "Sort newest to oldest",
      sortAsc: "Sort oldest to newest",
      installApp: 'Install "La\'u Kōviti"?',
    },
    profile: {
      name: "Profile",
      p1: "Update your profile details They will be submitted with your test results",
      e1: "Cannot delete. This is the only profile.",
      e2: "Cannot delete. There are tests associated with this profile.",
    },
    settings: {
      name: "Settings",
      p1: "Dark Mode",
      p1Caption: "Activate dark mode goodness",
      p2: "Dev Mode",
      p2Caption: "Submit tests to a Demo form",
    },
    help: {
      name: "Help",
      p1: "This app is in development",
      p2: "It aims to make recording and sharing your COVID-19 Rapid Test Self-Reporting easier. Sharing results to @:label.moh is optional",
      p3: "Press here for the {0}",
    },
    user: {
      name: "User",
      p1: "Login to download your test results!",
      p2: "Register to access your test results from any device!",
      p3Heading: "Psst...",
      p3: "Looks like you have some tests results recorded. We'll save them to your account when you {tab}",
    },
    manageProfiles: {
      name: "Manage Profiles",
      p1: "Use profiles to record tests for multiple people. Perfect for people not who dont have access to this app",
      p2: "Which profile would you like to use?",
    },
  },
  modals: {
    addTest: {
      name: "Add @.lower:label.testResult",
      edit: "Edit @.lower:label.testResult",
      view: "@:label.testResult",
      e1: "Please check your form",
    },
    submitTest: {
      name: "Send @:label.testResult",
      p1: "Fill in the details below and press @:label.send to send your reuslts to @:label.moh",
      p2: "Review your details and press @:label.send to send your reuslts to @:label.moh",
      e1: "Please check your form and re-submit",
      e2: "Somethings wrong, please contact the developer",
    },
    delete: {
      name: "Koe sau kasi a...",
      p1: "Really delete? This cannot be undone",
    },
    loginRegister: {
      name: "",
      e1: "Passwords do not match!",
    },
    addProfile: {
      name: "Profile name",
    },
  },
};
