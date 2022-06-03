const villageOptions = [
  { label: "Aai o Fiti", value: "Aai o Fiti" },
  { label: "Aai o Niue", value: "Aai o Niue" },
  { label: "Aele Fou", value: "Aele Fou" },
  { label: "Afega", value: "Afega" },
  { label: "Afia", value: "Afia" },
  { label: "Afiamalu East", value: "Afiamalu East" },
  { label: "Afiamalu West", value: "Afiamalu West" },
  { label: "Alafou", value: "Alafou" },
  { label: "Alafua", value: "Alafua" },
  { label: "Alamagoto", value: "Alamagoto" },
  { label: "Alamutu", value: "Alamutu" },
  { label: "Aleisa East", value: "Aleisa East" },
  { label: "Aleisa West", value: "Aleisa West" },
  { label: "Amaile", value: "Amaile" },
  { label: "Aopo", value: "Aopo" },
  { label: "Apai", value: "Apai" },
  { label: "Apia", value: "Apia" },
  { label: "Apolima Fou", value: "Apolima Fou" },
  { label: "Apolima Island", value: "Apolima Island" },
  { label: "Asaga", value: "Asaga" },
  { label: "Auala", value: "Auala" },
  { label: "Aufaga", value: "Aufaga" },
  { label: "Avao", value: "Avao" },
  { label: "Avata", value: "Avata" },
  { label: "Avele", value: "Avele" },
  { label: "Choose", value: "Choose" },
  { label: "Elise Fou", value: "Elise Fou" },
  { label: "Eva", value: "Eva" },
  { label: "Eveeve", value: "Eveeve" },
  { label: "Faala", value: "Faala" },
  { label: "Faatoialemanu", value: "Faatoialemanu" },
  { label: "Faga", value: "Faga" },
  { label: "Fagaee", value: "Fagaee" },
  { label: "Fagafau", value: "Fagafau" },
  { label: "Fagalii", value: "Fagalii" },
  { label: "Fagamalo", value: "Fagamalo" },
  { label: "Fagasa", value: "Fagasa" },
  { label: "Faiaai", value: "Faiaai" },
  { label: "Falealupo", value: "Falealupo" },
  { label: "Faleapuna", value: "Faleapuna" },
  { label: "Faleaseela", value: "Faleaseela" },
  { label: "Faleasiu", value: "Faleasiu" },
  { label: "Faleatiu", value: "Faleatiu" },
  { label: "Falefa", value: "Falefa" },
  { label: "Falefia", value: "Falefia" },
  { label: "Falelauniu", value: "Falelauniu" },
  { label: "Falelima", value: "Falelima" },
  { label: "Faleolo", value: "Faleolo" },
  { label: "Falepuna", value: "Falepuna" },
  { label: "Faletagaloa", value: "Faletagaloa" },
  { label: "Faleu", value: "Faleu" },
  { label: "Faleula", value: "Faleula" },
  { label: "Falevai", value: "Falevai" },
  { label: "Falevao", value: "Falevao" },
  { label: "Fasitoo Tai", value: "Fasitoo Tai" },
  { label: "Fasitoo Uta", value: "Fasitoo Uta" },
  { label: "Fataloa", value: "Fataloa" },
  { label: "Fatausi", value: "Fatausi" },
  { label: "Fatitu", value: "Fatitu" },
  { label: "Fatuvalu", value: "Fatuvalu" },
  { label: "Fausaga", value: "Fausaga" },
  { label: "Foailalo", value: "Foailalo" },
  { label: "Foailuga", value: "Foailuga" },
  { label: "Fogapoa", value: "Fogapoa" },
  { label: "Fogasavaii", value: "Fogasavaii" },
  { label: "Fogatuli", value: "Fogatuli" },
  { label: "Foua", value: "Foua" },
  { label: "Fuailoloo", value: "Fuailoloo" },
  { label: "Fugalei", value: "Fugalei" },
  { label: "Fuifatu", value: "Fuifatu" },
  { label: "Fusi Anoamaa", value: "Fusi Anoamaa" },
  { label: "Fusi Faasaleleaga", value: "Fusi Faasaleleaga" },
  { label: "Fusi Safata", value: "Fusi Safata" },
  { label: "Gagaifolevao", value: "Gagaifolevao" },
  { label: "Gataivai", value: "Gataivai" },
  { label: "Gautavai", value: "Gautavai" },
  { label: "Lalomalava", value: "Lalomalava" },
  { label: "Lalomanu", value: "Lalomanu" },
  { label: "Lalomauga", value: "Lalomauga" },
  { label: "Lalovaea East", value: "Lalovaea East" },
  { label: "Lalovaea West", value: "Lalovaea West" },
  { label: "Lalovi", value: "Lalovi" },
  { label: "Lano", value: "Lano" },
  { label: "Laulii", value: "Laulii" },
  { label: "Leagiagi", value: "Leagiagi" },
  { label: "Lealatele", value: "Lealatele" },
  { label: "Leaupuni", value: "Leaupuni" },
  { label: "Leauvaa", value: "Leauvaa" },
  { label: "Lefagaoalii", value: "Lefagaoalii" },
  { label: "Leififi", value: "Leififi" },
  { label: "Lelata", value: "Lelata" },
  { label: "Lelepa", value: "Lelepa" },
  { label: "Leone", value: "Leone" },
  { label: "Lepa", value: "Lepa" },
  { label: "Lepale", value: "Lepale" },
  { label: "Lepea", value: "Lepea" },
  { label: "Lepuiai", value: "Lepuiai" },
  { label: "Letava", value: "Letava" },
  { label: "Letogo", value: "Letogo" },
  { label: "Letui", value: "Letui" },
  { label: "Leufisa", value: "Leufisa" },
  { label: "Leulumoega", value: "Leulumoega" },
  { label: "Leusoalii", value: "Leusoalii" },
  { label: "Levi Falelatai", value: "Levi Falelatai" },
  { label: "Levi Saleimoa", value: "Levi Saleimoa" },
  { label: "Levili", value: "Levili" },
  { label: "Lona", value: "Lona" },
  { label: "Lotofaga", value: "Lotofaga" },
  { label: "LotofagA", value: "LotofagA" },
  { label: "Lotopa", value: "Lotopa" },
  { label: "Lotopue", value: "Lotopue" },
  { label: "Lotosoa", value: "Lotosoa" },
  { label: "Luatuanuu", value: "Luatuanuu" },
  { label: "Lufilufi", value: "Lufilufi" },
  { label: "Luua", value: "Luua" },
  { label: "Maasina", value: "Maasina" },
  { label: "Magiagi Tai", value: "Magiagi Tai" },
  { label: "Magiagi Uta", value: "Magiagi Uta" },
  { label: "Malae", value: "Malae" },
  { label: "Malaela", value: "Malaela" },
  { label: "Malaemalu", value: "Malaemalu" },
  { label: "Malie", value: "Malie" },
  { label: "Malifa", value: "Malifa" },
  { label: "Malololelei", value: "Malololelei" },
  { label: "Malua", value: "Malua" },
  { label: "Maluafou", value: "Maluafou" },
  { label: "Manase", value: "Manase" },
  { label: "Maninoa", value: "Maninoa" },
  { label: "Manono Tai", value: "Manono Tai" },
  { label: "Manono Uta", value: "Manono Uta" },
  { label: "Manunu", value: "Manunu" },
  { label: "Maota Faasaleleaga", value: "Maota Faasaleleaga" },
  { label: "Matafaa", value: "Matafaa" },
  { label: "Matafele", value: "Matafele" },
  { label: "Matanofo", value: "Matanofo" },
  { label: "Matatufu", value: "Matatufu" },
  { label: "Matautu Falealili", value: "Matautu Falealili" },
  { label: "Matautu Falelatai", value: "Matautu Falelatai" },
  { label: "Matautu Lefaga", value: "Matautu Lefaga" },
  { label: "Matautu Tai", value: "Matautu Tai" },
  { label: "Matautu Uta", value: "Matautu Uta" },
  { label: "Matavai (Asau)", value: "Matavai (Asau)" },
  { label: "Matavai", value: "Matavai" },
  { label: "Mauga", value: "Mauga" },
  { label: "Moamoa Fou", value: "Moamoa Fou" },
  { label: "Moamoa", value: "Moamoa" },
  { label: "Moasula", value: "Moasula" },
  { label: "Moataa Uta", value: "Moataa Uta" },
  { label: "Moataa", value: "Moataa" },
  { label: "Motootua", value: "Motootua" },
  { label: "Mulifanua", value: "Mulifanua" },
  { label: "Mulinuu", value: "Mulinuu" },
  { label: "Mulivai Safata", value: "Mulivai Safata" },
  { label: "Mulivai", value: "Mulivai" },
  { label: "Musumusu", value: "Musumusu" },
  { label: "Mutiatele", value: "Mutiatele" },
  { label: "Nafanua", value: "Nafanua" },
  { label: "Nefunefu", value: "Nefunefu" },
  { label: "Neiafu Tai", value: "Neiafu Tai" },
  { label: "Neiafu Uta", value: "Neiafu Uta" },
  { label: "Nofoalii", value: "Nofoalii" },
  { label: "Nonoa", value: "Nonoa" },
  { label: "Nuu", value: "Nuu" },
  { label: "Nuusuatia", value: "Nuusuatia" },
  { label: "Paepaeala", value: "Paepaeala" },
  { label: "Paia", value: "Paia" },
  { label: "Palisi", value: "Palisi" },
  { label: "Papa Puleia", value: "Papa Puleia" },
  { label: "Papa Uta", value: "Papa Uta" },
  { label: "Papaloloa", value: "Papaloloa" },
  { label: "Papauta", value: "Papauta" },
  { label: "Pata", value: "Pata" },
  { label: "Patamea", value: "Patamea" },
  { label: "Pesega", value: "Pesega" },
  { label: "Pitonuu", value: "Pitonuu" },
  { label: "Piu", value: "Piu" },
  { label: "Poutasi", value: "Poutasi" },
  { label: "Puapua", value: "Puapua" },
  { label: "Puipaa", value: "Puipaa" },
  { label: "Puleia", value: "Puleia" },
  { label: "Saaga", value: "Saaga" },
  { label: "Saanapu Tai", value: "Saanapu Tai" },
  { label: "Saanapu Uta", value: "Saanapu Uta" },
  { label: "Saasaai", value: "Saasaai" },
  { label: "Safaatoa", value: "Safaatoa" },
  { label: "Safai", value: "Safai" },
  { label: "Safotu", value: "Safotu" },
  { label: "Safua", value: "Safua" },
  { label: "Safune", value: "Safune" },
  { label: "Sagone", value: "Sagone" },
  { label: "Saina", value: "Saina" },
  { label: "Saipipi", value: "Saipipi" },
  { label: "Salailua", value: "Salailua" },
  { label: "Salamumu Tai", value: "Salamumu Tai" },
  { label: "Salamumu Uta", value: "Salamumu Uta" },
  { label: "Salani", value: "Salani" },
  { label: "Saleaaumua", value: "Saleaaumua" },
  { label: "Saleapaga", value: "Saleapaga" },
  { label: "Saleaula", value: "Saleaula" },
  { label: "Saleia", value: "Saleia" },
  { label: "Saleilua", value: "Saleilua" },
  { label: "Saleimoa", value: "Saleimoa" },
  { label: "Salelavalu Tai", value: "Salelavalu Tai" },
  { label: "Salelavalu Uta", value: "Salelavalu Uta" },
  { label: "Salelesi", value: "Salelesi" },
  { label: "Salelologa", value: "Salelologa" },
  { label: "Salepouae", value: "Salepouae" },
  { label: "Salesatele", value: "Salesatele" },
  { label: "Saletagaloa", value: "Saletagaloa" },
  { label: "Saletele", value: "Saletele" },
  { label: "Saleufi", value: "Saleufi" },
  { label: "Salimu Faasaleleaga", value: "Salimu Faasaleleaga" },
  { label: "Salimu i Vaa o Fonoti", value: "Salimu i Vaa o Fonoti" },
  { label: "Salua", value: "Salua" },
  { label: "Samai", value: "Samai" },
  { label: "Samalaeulu", value: "Samalaeulu" },
  { label: "Samamea", value: "Samamea" },
  { label: "Samata Tai", value: "Samata Tai" },
  { label: "Samata Uta", value: "Samata Uta" },
  { label: "Samatau", value: "Samatau" },
  { label: "Samauga", value: "Samauga" },
  { label: "Samea", value: "Samea" },
  { label: "Samusu", value: "Samusu" },
  { label: "Saoluafata", value: "Saoluafata" },
  { label: "Sapapalii", value: "Sapapalii" },
  { label: "Sapini", value: "Sapini" },
  { label: "Sapoe", value: "Sapoe" },
  { label: "Sapulu", value: "Sapulu" },
  { label: "Sapunaoa", value: "Sapunaoa" },
  { label: "Sasina", value: "Sasina" },
  { label: "Satalafai", value: "Satalafai" },
  { label: "Satalo", value: "Satalo" },
  { label: "Sataoa Tai", value: "Sataoa Tai" },
  { label: "Sataoa Uta", value: "Sataoa Uta" },
  { label: "Satapuala", value: "Satapuala" },
  { label: "Sataua", value: "Sataua" },
  { label: "Satitoa", value: "Satitoa" },
  { label: "Satoalepai", value: "Satoalepai" },
  { label: "Satoi", value: "Satoi" },
  { label: "Satufia", value: "Satufia" },
  { label: "Satuiatua", value: "Satuiatua" },
  { label: "Satuilagi", value: "Satuilagi" },
  { label: "Satuimalufilufi", value: "Satuimalufilufi" },
  { label: "Sauano", value: "Sauano" },
  { label: "Sauniatu", value: "Sauniatu" },
  { label: "Savaia", value: "Savaia" },
  { label: "Savalalo", value: "Savalalo" },
  { label: "Seesee", value: "Seesee" },
  { label: "Sili", value: "Sili" },
  { label: "Sinamoga", value: "Sinamoga" },
  { label: "Siufaga Faasaleleaga", value: "Siufaga Faasaleleaga" },
  { label: "Siufaga Falelatai", value: "Siufaga Falelatai" },
  { label: "Siumu Uta", value: "Siumu Uta" },
  { label: "Siumu", value: "Siumu" },
  { label: "Siuniu", value: "Siuniu" },
  { label: "Siupapa", value: "Siupapa" },
  { label: "Siusega", value: "Siusega" },
  { label: "Siutu", value: "Siutu" },
  { label: "Sogi", value: "Sogi" },
  { label: "Solaua", value: "Solaua" },
  { label: "Solosolo", value: "Solosolo" },
  { label: "Taelefaga", value: "Taelefaga" },
  { label: "Tafagamanu", value: "Tafagamanu" },
  { label: "Tafaigata", value: "Tafaigata" },
  { label: "Tafatafa", value: "Tafatafa" },
  { label: "Tafitoala", value: "Tafitoala" },
  { label: "Tafua", value: "Tafua" },
  { label: "Taga", value: "Taga" },
  { label: "Talimatau", value: "Talimatau" },
  { label: "Tanoaleia", value: "Tanoaleia" },
  { label: "Tanugamanono", value: "Tanugamanono" },
  { label: "Tanumalala", value: "Tanumalala" },
  { label: "Tanumaleko", value: "Tanumaleko" },
  { label: "Tanumapua", value: "Tanumapua" },
  { label: "Tapatapao", value: "Tapatapao" },
  { label: "Tapueleele", value: "Tapueleele" },
  { label: "Tauese", value: "Tauese" },
  { label: "Taufusi", value: "Taufusi" },
  { label: "Tausagi", value: "Tausagi" },
  { label: "Tiapapata", value: "Tiapapata" },
  { label: "Tiavea", value: "Tiavea" },
  { label: "Tiavi", value: "Tiavi" },
  { label: "Tino I Iva", value: "Tino I Iva" },
  { label: "Toamua", value: "Toamua" },
  { label: "Togafuafua", value: "Togafuafua" },
  { label: "Togitogiga", value: "Togitogiga" },
  { label: "Toomatagi", value: "Toomatagi" },
  { label: "Tuaefu", value: "Tuaefu" },
  { label: "Tuanai", value: "Tuanai" },
  { label: "Tuanaimato East", value: "Tuanaimato East" },
  { label: "Tuanaimato West", value: "Tuanaimato West" },
  { label: "Tuasivi", value: "Tuasivi" },
  { label: "Tufuiopa", value: "Tufuiopa" },
  { label: "Tufulele", value: "Tufulele" },
  { label: "Tufutafoe", value: "Tufutafoe" },
  { label: "Tulaele", value: "Tulaele" },
  { label: "Tuloto", value: "Tuloto" },
  { label: "Uafato", value: "Uafato" },
  { label: "Ululoloa", value: "Ululoloa" },
  { label: "Ulutogia", value: "Ulutogia" },
  { label: "Utualii", value: "Utualii" },
  { label: "Utufaalalafa", value: "Utufaalalafa" },
  { label: "Utulaelae", value: "Utulaelae" },
  { label: "Utuloa", value: "Utuloa" },
  { label: "Vaega", value: "Vaega" },
  { label: "Vaiaata", value: "Vaiaata" },
  { label: "Vaiafai", value: "Vaiafai" },
  { label: "Vaiala Tai", value: "Vaiala Tai" },
  { label: "Vaiala Uta", value: "Vaiala Uta" },
  { label: "Vaiala", value: "Vaiala" },
  { label: "Vaiee", value: "Vaiee" },
  { label: "Vaifou", value: "Vaifou" },
  { label: "Vaigaga", value: "Vaigaga" },
  { label: "Vaigalu", value: "Vaigalu" },
  { label: "Vailele Tai", value: "Vailele Tai" },
  { label: "Vailele Uta", value: "Vailele Uta" },
  { label: "Vailima", value: "Vailima" },
  { label: "Vailoa Aleipata", value: "Vailoa Aleipata" },
  { label: "Vailoa Faleata", value: "Vailoa Faleata" },
  { label: "Vailoa Palauli", value: "Vailoa Palauli" },
  { label: "Vailoa Savaii", value: "Vailoa Savaii" },
  { label: "Vailuutai", value: "Vailuutai" },
  { label: "Vaimaga", value: "Vaimaga" },
  { label: "Vaimea", value: "Vaimea" },
  { label: "Vaimoso", value: "Vaimoso" },
  { label: "Vaiola", value: "Vaiola" },
  { label: "Vaipouli", value: "Vaipouli" },
  { label: "Vaipua", value: "Vaipua" },
  { label: "Vaipuna", value: "Vaipuna" },
  { label: "Vaisala", value: "Vaisala" },
  { label: "Vaisaulu", value: "Vaisaulu" },
  { label: "Vaisigano", value: "Vaisigano" },
  { label: "Vaitele Fou", value: "Vaitele Fou" },
  { label: "Vaitele Tai", value: "Vaitele Tai" },
  { label: "Vaitele Uta", value: "Vaitele Uta" },
  { label: "Vaitoloa", value: "Vaitoloa" },
  { label: "Vaitoomuli", value: "Vaitoomuli" },
  { label: "Vaiusu", value: "Vaiusu" },
  { label: "Vaivase Tai", value: "Vaivase Tai" },
  { label: "Vaivase Uta", value: "Vaivase Uta" },
  { label: "Vaoala", value: "Vaoala" },
  { label: "Vaotupua", value: "Vaotupua" },
  { label: "Vaovai", value: "Vaovai" },
  { label: "Vavau", value: "Vavau" },
  { label: "Vinifou", value: "Vinifou" },
]


const conditionOptions = [
  { label: "Diabetes / Ma'i Suka", value: "Diabetes / Ma'i Suka" },
  { label: "Hypertension / Toto Maualuga", value: "Hypertension / Toto Maualuga" },
  { label: "Cardiac disease / Ma'i Fatu", value: "Cardiac disease / Ma'i Fatu" },
  { label: "Chronic lung disease Ma'i o le Māmā", value: "Chronic lung disease Ma'i o le Māmā" },
  { label: "Cerebrovascular disease / Gasegase punitia o alatoto", value: "Cerebrovascular disease / Gasegase punitia o alatoto" },
  { label: "Dementia / Valevale matua", value: "Dementia / Valevale matua" },
  { label: "Mental disorders / A'afiaga o le mafaufau", value: "Mental disorders / A'afiaga o le mafaufau" },
  { label: "Chronic kidney disease / Aafiaga o fatu ga'o", value: "Chronic kidney disease / Aafiaga o fatu ga'o" },
  { label: "Immunosuppression / Vaivai malosiaga faalenatura", value: "Immunosuppression / Vaivai malosiaga faalenatura" },
  { label: "HIV / HIV", value: "HIV / HIV" },
  { label: "Obesity / Tino puta", value: "Obesity / Tino puta" },
  { label: "Cancer / Kanesa", value: "Cancer / Kanesa" },
]

const genderOptions = [
  { label: "Male / Alii", value: "Male / Alii" },
  { label: "Female / Tamaitai", value: "Female / Tamaitai" },
]

const testResultOptions = [
  { label: 'Positive / Ua aafia', value: 'Positive / Ua aafia' },
  { label: 'Negative / E lei aafia', value: 'Negative / E lei aafia' },
  { label: 'Inconclusive / Le mautinoa', value: 'Inconclusive / Le mautinoa' },
]

export { villageOptions, conditionOptions, genderOptions, testResultOptions }
