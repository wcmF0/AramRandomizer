// api/aram/[id].js

const champions = [
  {
    id: "Aatrox",
    apiname: "Aatrox",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Ahri",
    apiname: "Ahri",
    aram: {
      dmg_dealt: 0.97,
      healing: 0.9,
    },
  },
  {
    id: "Akali",
    apiname: "Akali",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.9,
      energyregen_mod: 1.2,
      tenacity: 1.2,
    },
  },
  {
    id: "Akshan",
    apiname: "Akshan",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
    },
  },

  {
    id: "Alistar",
    apiname: "Alistar",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
      healing: 0.8,
    },
  },

  {
    id: "Ambessa",
    apiname: "Ambessa",
    aram: {
      dmg_taken: 1.05,
    },
  },

  {
    id: "Amumu",
    apiname: "Amumu",
    aram: {},
  },
  {
    id: "Anivia",
    apiname: "Anivia",
    aram: {
      dmg_dealt: 1.05,
    },
  },

  {
    id: "Annie",
    apiname: "Annie",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
      shielding: 0.9,
    },
  },
  {
    id: "Aphelios",
    apiname: "Aphelios",
    aram: {},
  },
  {
    id: "Ashe",
    apiname: "Ashe",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "AurelionSol",
    apiname: "Aurelion Sol",
    aram: {
      dmg_dealt: 1.02,
      dmg_taken: 0.92,
      ability_haste: -20,
    },
  },
  {
    id: "Aurora",
    apiname: "Aurora",
    aram: {},
  },

  {
    id: "Azir",
    apiname: "Azir",
    aram: {
      dmg_taken: 0.95,
      total_as: 1.025,
      ability_haste: 20,
    },
  },
  {
    id: "Bard",
    apiname: "Bard",
    aram: {
      dmg_dealt: 1.15,
      dmg_taken: 0.85,
      healing: 1.2,
    },
  },
  {
    id: "BelVeth",
    apiname: "Bel'Veth",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Blitzcrank",
    apiname: "Blitzcrank",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Brand",
    apiname: "Brand",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.1,
      ability_haste: -10,
    },
  },
  {
    id: "Braum",
    apiname: "Braum",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
    },
  },
  {
    id: "Briar",
    apiname: "Briar",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
      healing: 1.05,
    },
  },
  {
    id: "Caitlyn",
    apiname: "Caitlyn",
    aram: {
      dmg_taken: 1.05,
    },
  },
  {
    id: "Camille",
    apiname: "Camille",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
      healing: 1.2,
      shielding: 1.1,
      ability_haste: 10,
    },
  },
  {
    id: "Cassiopeia",
    apiname: "Cassiopeia",
    aram: {},
  },
  {
    id: "Chogath",
    apiname: "Cho'Gath",
    aram: {
      dmg_taken: 1.1,
    },
  },
  {
    id: "Corki",
    apiname: "Corki",
    aram: {
      dmg_taken: 0.9,
      ability_haste: -20,
    },
  },
  {
    id: "Darius",
    apiname: "Darius",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Diana",
    apiname: "Diana",
    aram: {},
  },
  {
    id: "DrMundo",
    apiname: "Dr. Mundo",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
      healing: 0.9,
    },
  },
  {
    id: "Draven",
    apiname: "Draven",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
    },
  },
  {
    id: "Ekko",
    apiname: "Ekko",
    aram: {
      dmg_dealt: 1.1,
      tenacity: 1.2,
    },
  },
  {
    id: "Elise",
    apiname: "Elise",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.9,
      tenacity: 1.1,
    },
  },
  {
    id: "Evelynn",
    apiname: "Evelynn",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
      tenacity: 1.2,
    },
  },
  {
    id: "Ezreal",
    apiname: "Ezreal",
    aram: {},
  },
  {
    id: "Fiddlesticks",
    apiname: "Fiddlesticks",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Fiora",
    apiname: "Fiora",
    aram: {
      dmg_taken: 0.95,
    },
  },
  {
    id: "Fizz",
    apiname: "Fizz",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
      tenacity: 1.1,
    },
  },
  {
    id: "Galio",
    apiname: "Galio",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Gangplank",
    apiname: "Gangplank",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Garen",
    apiname: "Garen",
    aram: {
      dmg_taken: 0.95,
    },
  },
  {
    id: "Gnar",
    apiname: "Gnar",
    aram: {
      total_as: 1.025,
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
    },
  },
  {
    id: "Gragas",
    apiname: "Gragas",
    aram: {
      dmg_taken: 0.95,
    },
  },
  {
    id: "Graves",
    apiname: "Graves",
    aram: {},
  },
  {
    id: "Gwen",
    apiname: "Gwen",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Hecarim",
    apiname: "Hecarim",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.9,
      healing: 1.2,
      ability_haste: 10,
    },
  },
  {
    id: "Heimerdinger",
    apiname: "Heimerdinger",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.1,
    },
  },
  {
    id: "Hwei",
    apiname: "Hwei",
    aram: {
      dmg_dealt: 0.95,
    },
  },
  {
    id: "Illaoi",
    apiname: "Illaoi",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
      healing: 0.8,
    },
  },
  {
    id: "Irelia",
    apiname: "Irelia",
    aram: {
      ability_haste: 20,
    },
  },
  {
    id: "Ivern",
    apiname: "Ivern",
    aram: {
      dmg_dealt: 0.95,
      shielding: 0.8,
    },
  },
  {
    id: "Janna",
    apiname: "Janna",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
      healing: 0.9,
      shielding: 0.95,
    },
  },
  {
    id: "JarvanIV",
    apiname: "Jarvan IV",
    aram: {},
  },
  {
    id: "Jax",
    apiname: "Jax",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.97,
    },
  },
  {
    id: "Jayce",
    apiname: "Jayce",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Jhin",
    apiname: "Jhin",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Jinx",
    apiname: "Jinx",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
    },
  },
  {
    id: "KSante",
    apiname: "K'Sante",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Kaisa",
    apiname: "Kai'Sa",
    aram: {
      total_as: 1.025,
      dmg_taken: 0.9,
    },
  },
  {
    id: "Kalista",
    apiname: "Kalista",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
    },
  },
  {
    id: "Karma",
    apiname: "Karma",
    aram: {},
  },
  {
    id: "Karthus",
    apiname: "Karthus",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Kassadin",
    apiname: "Kassadin",
    aram: {
      dmg_taken: 0.95,
    },
  },
  {
    id: "Katarina",
    apiname: "Katarina",
    aram: {
      tenacity: 1.2,
      ability_haste: 10,
    },
  },
  {
    id: "Kayle",
    apiname: "Kayle",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.1,
    },
  },
  {
    id: "Kayn",
    apiname: "Kayn",
    aram: {
      healing: 0.8,
      tenacity: 1.2,
    },
  },
  {
    id: "Kennen",
    apiname: "Kennen",
    aram: {
      dmg_dealt: 1.05,
      energyregen_mod: 1.2,
    },
  },
  {
    id: "Khazix",
    apiname: "Kha'Zix",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
      healing: 1.2,
      tenacity: 1.2,
    },
  },
  {
    id: "Kindred",
    apiname: "Kindred",
    aram: {
      total_as: 1.025,
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
    },
  },
  {
    id: "Kled",
    apiname: "Kled",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.9,
    },
  },
  {
    id: "KogMaw",
    apiname: "Kog'Maw",
    aram: {
      dmg_dealt: 0.88,
      dmg_taken: 1.1,
    },
  },
  {
    id: "LeBlanc",
    apiname: "LeBlanc",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
      ability_haste: 20,
    },
  },
  {
    id: "LeeSin",
    apiname: "Lee Sin",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
      healing: 1.1,
      shielding: 1.2,
      energyregen_mod: 1.2,
    },
  },
  {
    id: "Leona",
    apiname: "Leona",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Lillia",
    apiname: "Lillia",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Lissandra",
    apiname: "Lissandra",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Lucian",
    apiname: "Lucian",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
      tenacity: 1.2,
      ability_haste: 10,
    },
  },
  {
    id: "Lulu",
    apiname: "Lulu",
    aram: {},
  },
  {
    id: "Lux",
    apiname: "Lux",
    aram: {
      dmg_dealt: 0.85,
      dmg_taken: 1.1,
      shielding: 0.8,
    },
  },
  {
    id: "Malphite",
    apiname: "Malphite",
    aram: {},
  },
  {
    id: "Malzahar",
    apiname: "Malzahar",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.1,
    },
  },
  {
    id: "Maokai",
    apiname: "Maokai",
    aram: {
      dmg_dealt: 0.8,
      dmg_taken: 1.1,
      healing: 0.9,
    },
  },
  {
    id: "MasterYi",
    apiname: "Master Yi",
    aram: {},
  },
  {
    id: "Mel",
    apiname: "Mel",
    aram: {},
  },
  {
    id: "Milio",
    apiname: "Milio",
    aram: {
      healing: 0.95,
      shielding: 0.9,
      ability_haste: -10,
    },
  },
  {
    id: "MissFortune",
    apiname: "Miss Fortune",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Mordekaiser",
    apiname: "Mordekaiser",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Morgana",
    apiname: "Morgana",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.1,
    },
  },
  {
    id: "Naafiri",
    apiname: "Naafiri",
    aram: {
      dmg_dealt: 1.1,
      ability_haste: 10,
    },
  },
  {
    id: "Nami",
    apiname: "Nami",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Nasus",
    apiname: "Nasus",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Nautilus",
    apiname: "Nautilus",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.1,
    },
  },
  {
    id: "Neeko",
    apiname: "Neeko",
    aram: {},
  },
  {
    id: "Nidalee",
    apiname: "Nidalee",
    aram: {
      dmg_dealt: 1.1,
    },
  },
  {
    id: "Nilah",
    apiname: "Nilah",
    aram: {
      dmg_dealt: 0.97,
    },
  },
  {
    id: "Nocturne",
    apiname: "Nocturne",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
      healing: 1.2,
    },
  },
  {
    id: "Nunu",
    apiname: "Nunu e Willump",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
      healing: 1.1,
      shielding: 1.2,
      tenacity: 1.2,
    },
  },
  {
    id: "Olaf",
    apiname: "Olaf",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Orianna",
    apiname: "Orianna",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.1,
      shielding: 0.8,
    },
  },
  {
    id: "Ornn",
    apiname: "Ornn",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Pantheon",
    apiname: "Pantheon",
    aram: {},
  },
  {
    id: "Poppy",
    apiname: "Poppy",
    aram: {},
  },
  {
    id: "Pyke",
    apiname: "Pyke",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.95,
      tenacity: 1.2,
    },
  },
  {
    id: "Qiyana",
    apiname: "Qiyana",
    aram: {
      dmg_dealt: 1.15,
      dmg_taken: 0.9,
      tenacity: 1.2,
    },
  },
  {
    id: "Quinn",
    apiname: "Quinn",
    aram: {
      total_as: 1.025,
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
      tenacity: 1.2,
    },
  },
  {
    id: "Rakan",
    apiname: "Rakan",
    aram: {
      dmg_taken: 0.95,
    },
  },
  {
    id: "Rammus",
    apiname: "Rammus",
    aram: {},
  },
  {
    id: "RekSai",
    apiname: "Rek'Sai",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.9,
    },
  },
  {
    id: "Rell",
    apiname: "Rell",
    aram: {
      dmg_dealt: 0.95,
      healing: 0.9,
      shielding: 0.9,
    },
  },
  {
    id: "Renata",
    apiname: "Renata Glasc",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
      shielding: 0.8,
    },
  },
  {
    id: "Renekton",
    apiname: "Renekton",
    aram: {
      healing: 1.05,
    },
  },
  {
    id: "Rengar",
    apiname: "Rengar",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.92,
      tenacity: 1.2,
    },
  },
  {
    id: "Riven",
    apiname: "Riven",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.92,
    },
  },
  {
    id: "Rumble",
    apiname: "Rumble",
    aram: {},
  },
  {
    id: "Ryze",
    apiname: "Ryze",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
    },
  },
  {
    id: "Samira",
    apiname: "Samira",
    aram: {
      dmg_dealt: 1,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Sejuani",
    apiname: "Sejuani",
    aram: {},
  },
  {
    id: "Senna",
    apiname: "Senna",
    aram: {
      dmg_dealt: 0.97,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Seraphine",
    apiname: "Seraphine",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.2,
      healing: 0.8,
      shielding: 0.8,
      ability_haste: -20,
    },
  },
  {
    id: "Sett",
    apiname: "Sett",
    aram: {},
  },
  {
    id: "Shaco",
    apiname: "Shaco",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Shen",
    apiname: "Shen",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Shyvana",
    apiname: "Shyvana",
    aram: {
      dmg_taken: 0.95,
    },
  },
  {
    id: "Singed",
    apiname: "Singed",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.08,
    },
  },
  {
    id: "Sion",
    apiname: "Sion",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.1,
      ability_haste: -10,
    },
  },
  {
    id: "Sivir",
    apiname: "Sivir",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Skarner",
    apiname: "Skarner",
    aram: {
      dmg_taken: 1.05,
    },
  },
  {
    id: "Smolder",
    apiname: "Smolder",
    aram: {
      dmg_taken: 1.02,
      ability_haste: -10,
    },
  },

  {
    id: "Sona",
    apiname: "Sona",
    aram: {},
  },
  {
    id: "Soraka",
    apiname: "Soraka",
    aram: {
      dmg_taken: 0.97,
      ability_haste: 10,
    },
  },
  {
    id: "Swain",
    apiname: "Swain",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.15,
      healing: 0.8,
    },
  },
  {
    id: "Sylas",
    apiname: "Sylas",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Syndra",
    apiname: "Syndra",
    aram: {
      dmg_dealt: 1.05,
      ability_haste: 5,
    },
  },
  {
    id: "TahmKench",
    apiname: "Tahm Kench",
    aram: {
      dmg_taken: 1.05,
    },
  },
  {
    id: "Taliyah",
    apiname: "Taliyah",
    aram: {},
  },
  {
    id: "Talon",
    apiname: "Talon",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
      tenacity: 1.2,
    },
  },
  {
    id: "Taric",
    apiname: "Taric",
    aram: {
      dmg_taken: 1.1,
    },
  },
  {
    id: "Teemo",
    apiname: "Teemo",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.1,
      ability_haste: -10,
    },
  },
  {
    id: "Thresh",
    apiname: "Thresh",
    aram: {
      dmg_taken: 1.05,
    },
  },
  {
    id: "Tristana",
    apiname: "Tristana",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
    },
  },
  {
    id: "Trundle",
    apiname: "Trundle",
    aram: {
      dmg_taken: 1.05,
    },
  },
  {
    id: "Tryndamere",
    apiname: "Tryndamere",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.9,
      healing: 1.2,
    },
  },
  {
    id: "TwistedFate",
    apiname: "Twisted Fate",
    aram: {},
  },
  {
    id: "Twitch",
    apiname: "Twitch",
    aram: {
      dmg_taken: 0.95,
    },
  },
  {
    id: "Udyr",
    apiname: "Udyr",
    aram: {
      healing: 0.9,
      shielding: 0.9,
    },
  },
  {
    id: "Urgot",
    apiname: "Urgot",
    aram: {
      dmg_taken: 1.05,
    },
  },
  {
    id: "Varus",
    apiname: "Varus",
    aram: {
      dmg_dealt: 0.98,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Vayne",
    apiname: "Vayne",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
    },
  },
  {
    id: "Veigar",
    apiname: "Veigar",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.1,
    },
  },
  {
    id: "Velkoz",
    apiname: "Vel'Koz",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Vex",
    apiname: "Vex",
    aram: {
      dmg_dealt: 0.95,
    },
  },
  {
    id: "Vi",
    apiname: "Vi",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
    },
  },
  {
    id: "Viego",
    apiname: "Viego",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Viktor",
    apiname: "Viktor",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
    },
  },
  {
    id: "Vladimir",
    apiname: "Vladimir",
    aram: {
      dmg_dealt: 0.95,
      dmg_taken: 1.05,
      healing: 0.9,
    },
  },
  {
    id: "Volibear",
    apiname: "Volibear",
    aram: {},
  },
  {
    id: "Warwick",
    apiname: "Warwick",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
    },
  },
  {
    id: "MonkeyKing",
    apiname: "Wukong",
    aram: {},
  },
  {
    id: "Xayah",
    apiname: "Xayah",
    aram: {
      total_as: 1.03,
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Xerath",
    apiname: "Xerath",
    aram: {
      dmg_dealt: 0.93,
      dmg_taken: 1.05,
    },
  },
  {
    id: "XinZhao",
    apiname: "Xin Zhao",
    aram: {
      dmg_dealt: 0.95,
    },
  },
  {
    id: "Yasuo",
    apiname: "Yasuo",
    aram: {
      total_as: 1.025,
    },
  },
  {
    id: "Yone",
    apiname: "Yone",
    aram: {
      total_as: 1.025,
      dmg_dealt: 1.05,
      dmg_taken: 0.97,
    },
  },
  {
    id: "Yorick",
    apiname: "Yorick",
    aram: {},
  },
  {
    id: "Yuumi",
    apiname: "Yuumi",
    aram: {
      dmg_dealt: 1.05,
    },
  },
  {
    id: "Zac",
    apiname: "Zac",
    aram: {
      dmg_taken: 0.96,
      healing: 1.1,
    },
  },
  {
    id: "Zed",
    apiname: "Zed",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
      energyregen_mod: 1.2,
      tenacity: 1.2,
    },
  },
  {
    id: "Zeri",
    apiname: "Zeri",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.95,
    },
  },
  {
    id: "Ziggs",
    apiname: "Ziggs",
    aram: {
      dmg_dealt: 0.87,
      dmg_taken: 1.2,
      ability_haste: -20,
    },
  },
  {
    id: "Zilean",
    apiname: "Zilean",
    aram: {
      dmg_dealt: 1.05,
      dmg_taken: 0.95,
    },
  },
  {
    id: "Zoe",
    apiname: "Zoe",
    aram: {
      dmg_dealt: 1.1,
      dmg_taken: 0.95,
    },
  },
  {
    id: "Zyra",
    apiname: "Zyra",
    aram: {
      dmg_dealt: 0.9,
      dmg_taken: 1.05,
      ability_haste: -10,
    },
  },
];

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === "GET") {
    const championData = champions.find(
      (champ) => champ.id.toLowerCase() === id.toLowerCase()
    );

    if (championData) {
      res.status(200).json(championData);
    } else {
      res.status(404).send("Campeão não encontrado");
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${method} não permitido`);
  }
}
