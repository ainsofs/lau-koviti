export default {
  label: {
    save: "Sefe",
    cancel: "Fa'alēaogāina",
    login: "Saini ini",
    register: "Resitala",
    testResult: "Fa'ai'uga 'ole su'esu'ega",
    testResultPlural: "Fa'ai'uga 'o su'esu'ega",
    updated: "'Ua fa'afouina",
    added: "'Ua fa'aopoopo",
    deleted: "'Ua tapē",
    update: "Fa'afou",
    add: "Fa'aopoopo",
    delete: "Tapē",
    personalDetails: "Au fa'amatalaga",
    progressText: "{ count } o { total } ua lafo",
    completeText: "Seki! 'Ua lafo 'uma @.lower:label.testResultPlural !",
    send: "Lafo",
    date: "Aso sā fa’atinoina ai le su’esu’ega",
    close: "Tapuni",
    officialForm: "Fomu aloa'ia",
    password: "'Upu fa'alilolilo",
    signOut: "Saini fafo",
    addProfile: "@:label.add",
    moh: "Matāgaluega 'o le Soifua Mālōlōina",
    yes: "'Ioe",
    later: "Se'i 'uma",
    dismiss: "Lēai",
    // status
    testResultAdded: "@:label.added le @.lower:label.testResult",
    testResultUpdated: "@:label.updated le @.lower:label.testResult",
    testResultDeleted: "@:label.deleted le @.lower:label.testResult",
    profileAdded: "@:label.added le @.lower:pages.profile.name",
    profileUpdated: "@:label.updated le @.lower:pages.profile.name",
    profileDeleted: "@:label.deleted le @.lower:pages.profile.name",
  },
  pages: {
    home: {
      name: "Fale",
      p1: "Tālofa lava! 'E mafai 'ona 'e fa'a'aogāina lenei polokalame 'e {0}",
      p1Bold: "fa'amaumau ai au @.lower:label.testResultPlural",
      p2: "'Ole'ā mātou fa'afaigofieina 'ona 'auina atu ile @:label.moh au fa'amaumauga, pe 'e te tago e fa'atumu le lātou {0}",
      p3: "'E mafai fo'i 'ona {0} sau tusi fa'amaumauga 'e maua ai au @.lower:label.testResultPlural mai so'o se masini!",
      p4: "'O'omi le fa'amau {0} e {1}",
      p4GetStarted: "'āmata loa na fa'amau!",
      resultsFound: "Mālō lava! 'Ua fa'amauina au {pluralText} 'e {count}.",
      sortDesc: "Soka mai mea fou i mea tuai",
      sortAsc: "Soka mai mea tuai leva i mea fou",
      installApp: "Inisito \"La'u Kōviti\"?",
    },
    profile: {
      name: "Tala'aga 'oto'oto",
      p1: "Fa'afou ou fa'amaumauga. 'E 'auina atu fa'atasi ma au @.lower:label.testResultPlural",
      e1: "E lē mafai 'ona tapē. Ua pau lenei o le @.lower:pages.profile.name.",
      e2: "E lē mafai 'ona tapē. O lo'o iai @.lower:label.testResult 'e ō fa'atasi ma lenei @.lower:pages.profile.name .",
    },
    settings: {
      name: "Fa'atulagaga",
      p1: "Fa'apogisā",
      p1Caption: "Fa'apogisā le polokalame.",
      p2: "Fa'aātina'e",
      p2Caption: "Lafo au fa'amatalaga i se komepiuta atina'e.",
    },
    help: {
      name: "Fesoasoani",
      p1: "O lo'o atina'e lenei polokalame",
      p2: "Ole fa'amoemoe 'ia fa'afaigofie ai le pu'eina ma le laofina o au @.lower:label.testResult (COVID-19 Rapid Test Self-Reporting) ile @:label.moh . E lē fa'amalosia le lafoina o au @.lower:label.testResult ile @:label.moh",
      p3: "'O'omi 'i'i mo le {0}",
    },
    user: {
      name: "Tagata",
      p1: "@:label.login 'e 'aumai ai au @.lower:label.testResultPlural !",
      p2: "Resitala 'e maua ai au @.lower:label.testResultPlural mai so'o se masini!",
      p3Heading: "Psst...",
      p3: "E foliga mai o lo'o i ai ni au @.lower:label.testResult ua fa'amaumauina. Ole'ā mātou sefeina i lau tusi fa'amaumauga pe 'a 'e {tab}",
    },
    manageProfiles: {
      name: "Pūleaina o @.lower:pages.profile.name",
      p1: "Fa'a'aogā @.lower:pages.profile.name e fa'amaumau ai @.lower:label.testResult mo nisi tagata. 'Aemaise tagata e le mafai 'ona fa'aaogaina lenei polokalame",
      p2: "Ole ā le @.lower:pages.profile.name e te mana'o e fa'aogā?",
    },
  },
  modals: {
    addTest: {
      name: "Fa'aopoopo se @.lower:label.testResult",
      edit: "Sui se @.lower:label.testResult",
      view: "@.lower:label.testResult",
      e1: "Fa'amolemole toe siaki lau fomu",
    },
    submitTest: {
      name: "Lafo le @.lower:label.testResult",
      p1: "Fa'atumu fa'amatalaga o lo'o i lalo ma 'o'omi le fa'amau \" @:label.send \" 'e 'auina atu ai au @.lower:label.testResult ile @:label.moh",
      p2: "Toe iloilo au fa'amatalaga ma 'o'omi le fa'amau \" @:label.send \" 'e 'auina atu ai au @.lower:label.testResult ile @:label.moh",
      e1: "Fa'amolemole siaki lau fomu ma toe lafo",
      e2: "'E iai se mea o fa'alētonu. Fa'amolemole feso'otai le tagata na faia le polokalame",
    },
    delete: {
      name: "Koe sau sau kasi a...",
      p1: "'E tape mo'i a? 'E lē mafai 'ona toe suia lenei tūlaga.",
    },
    loginRegister: {
      name: "",
      e1: "'E lē tutusa 'upu fa'alilolilo!",
    },
    addProfile: {
      name: "@:pages.profile.name",
    },
  },
};
