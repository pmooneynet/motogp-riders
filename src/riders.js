const riders = [

  // ── CURRENT GRID ──────────────────────────────────────────────────────────

  {
    num: 93, fn: "Marc", ln: "Márquez", nat: "Spain", flag: "🇪🇸",
    team: "Gresini Racing MotoGP",
    career: [
      { year: 2024, team: "Gresini Racing MotoGP", cls: "MotoGP", pos: "3rd" },
      { year: 2023, team: "Repsol Honda Team", cls: "MotoGP", pos: "DNF (injury)" },
      { year: 2022, team: "Repsol Honda Team", cls: "MotoGP", pos: "6th" },
      { year: 2021, team: "Repsol Honda Team", cls: "MotoGP", pos: "7th" },
      { year: 2020, team: "Repsol Honda Team", cls: "MotoGP", pos: "DNF (injury)" },
      { year: 2019, team: "Repsol Honda Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2018, team: "Repsol Honda Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2017, team: "Repsol Honda Team", cls: "MotoGP", pos: "3rd" },
      { year: 2016, team: "Repsol Honda Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2015, team: "Repsol Honda Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2014, team: "Repsol Honda Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2013, team: "Repsol Honda Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2012, team: "Suter", cls: "Moto2", pos: "🥇 Champion" },
      { year: 2011, team: "Monlau Kompeticion", cls: "Moto2", pos: "2nd" },
      { year: 2009, team: "Red Bull KTM", cls: "125cc", pos: "🥇 Champion" },
      { year: 2008, team: "Red Bull KTM", cls: "125cc", pos: "2nd" },
    ]
  },
  {
    num: 1, fn: "Francesco", ln: "Bagnaia", nat: "Italy", flag: "🇮🇹",
    team: "Ducati Lenovo Team",
    career: [
      { year: 2024, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "2nd" },
      { year: 2023, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2022, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2021, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "5th" },
      { year: 2020, team: "Pramac Racing", cls: "MotoGP", pos: "15th" },
      { year: 2019, team: "Pramac Racing", cls: "MotoGP", pos: "15th" },
      { year: 2018, team: "Sky Racing Team VR46", cls: "Moto2", pos: "🥇 Champion" },
      { year: 2017, team: "Sky Racing Team VR46", cls: "Moto2", pos: "3rd" },
    ]
  },
  {
    num: 89, fn: "Jorge", ln: "Martín", nat: "Spain", flag: "🇪🇸",
    team: "Aprilia Racing",
    career: [
      { year: 2024, team: "Prima Pramac Racing", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2023, team: "Prima Pramac Racing", cls: "MotoGP", pos: "2nd" },
      { year: 2022, team: "Prima Pramac Racing", cls: "MotoGP", pos: "6th" },
      { year: 2021, team: "Prima Pramac Racing", cls: "MotoGP", pos: "11th" },
      { year: 2020, team: "Red Bull KTM Ajo", cls: "Moto2", pos: "6th" },
      { year: 2018, team: "Del Conca Gresini Moto3", cls: "Moto3", pos: "🥇 Champion" },
    ]
  },
  {
    num: 36, fn: "Joan", ln: "Mir", nat: "Spain", flag: "🇪🇸",
    team: "Repsol Honda Team",
    career: [
      { year: 2024, team: "Repsol Honda Team", cls: "MotoGP", pos: "14th" },
      { year: 2023, team: "Repsol Honda Team", cls: "MotoGP", pos: "17th" },
      { year: 2022, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "8th" },
      { year: 2021, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "3rd" },
      { year: 2020, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2019, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "12th" },
      { year: 2018, team: "Leopard Racing", cls: "Moto3", pos: "🥇 Champion" },
    ]
  },
  {
    num: 20, fn: "Fabio", ln: "Quartararo", nat: "France", flag: "🇫🇷",
    team: "Monster Energy Yamaha MotoGP",
    career: [
      { year: 2024, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "8th" },
      { year: 2023, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "7th" },
      { year: 2022, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "2nd" },
      { year: 2021, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2020, team: "Petronas Yamaha SRT", cls: "MotoGP", pos: "8th" },
      { year: 2019, team: "Petronas Yamaha SRT", cls: "MotoGP", pos: "5th" },
      { year: 2018, team: "Beta Tools Speed Up", cls: "Moto2", pos: "8th" },
      { year: 2017, team: "Leopard Racing", cls: "Moto3", pos: "7th" },
    ]
  },
  {
    num: 41, fn: "Aleix", ln: "Espargaró", nat: "Spain", flag: "🇪🇸",
    team: "Aprilia Racing",
    career: [
      { year: 2024, team: "Aprilia Racing", cls: "MotoGP", pos: "4th" },
      { year: 2023, team: "Aprilia Racing", cls: "MotoGP", pos: "4th" },
      { year: 2022, team: "Aprilia Racing", cls: "MotoGP", pos: "3rd" },
      { year: 2021, team: "Aprilia Racing", cls: "MotoGP", pos: "8th" },
      { year: 2020, team: "Aprilia Racing Team Gresini", cls: "MotoGP", pos: "14th" },
      { year: 2015, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "12th" },
      { year: 2014, team: "NGM Forward Racing", cls: "MotoGP", pos: "18th" },
      { year: 2013, team: "Power Electronics Aspar", cls: "MotoGP", pos: "16th" },
    ]
  },
  {
    num: 12, fn: "Maverick", ln: "Viñales", nat: "Spain", flag: "🇪🇸",
    team: "Aprilia Racing",
    career: [
      { year: 2024, team: "Aprilia Racing", cls: "MotoGP", pos: "6th" },
      { year: 2023, team: "Aprilia Racing", cls: "MotoGP", pos: "6th" },
      { year: 2022, team: "Aprilia Racing", cls: "MotoGP", pos: "7th" },
      { year: 2021, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "9th" },
      { year: 2020, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "6th" },
      { year: 2019, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "4th" },
      { year: 2018, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "5th" },
      { year: 2017, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "2nd" },
      { year: 2016, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "4th" },
      { year: 2015, team: "Paginas Amarillas HP 40", cls: "Moto3", pos: "🥇 Champion" },
    ]
  },
  {
    num: 88, fn: "Miguel", ln: "Oliveira", nat: "Portugal", flag: "🇵🇹",
    team: "Trackhouse Racing",
    career: [
      { year: 2024, team: "Trackhouse Racing", cls: "MotoGP", pos: "10th" },
      { year: 2023, team: "RNF MotoGP Team", cls: "MotoGP", pos: "19th" },
      { year: 2022, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "10th" },
      { year: 2021, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "9th" },
      { year: 2020, team: "Red Bull KTM Tech3", cls: "MotoGP", pos: "11th" },
      { year: 2019, team: "Red Bull KTM Tech3", cls: "MotoGP", pos: "18th" },
      { year: 2018, team: "Red Bull KTM Ajo", cls: "Moto2", pos: "2nd" },
    ]
  },
  {
    num: 33, fn: "Brad", ln: "Binder", nat: "South Africa", flag: "🇿🇦",
    team: "Red Bull KTM Factory Racing",
    career: [
      { year: 2024, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "5th" },
      { year: 2023, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "5th" },
      { year: 2022, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "8th" },
      { year: 2021, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "6th" },
      { year: 2020, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "7th" },
      { year: 2019, team: "Red Bull KTM Ajo", cls: "Moto2", pos: "4th" },
      { year: 2016, team: "Red Bull KTM Ajo", cls: "Moto3", pos: "🥇 Champion" },
    ]
  },
  {
    num: 5, fn: "Johann", ln: "Zarco", nat: "France", flag: "🇫🇷",
    team: "LCR Honda Castrol",
    career: [
      { year: 2024, team: "LCR Honda Castrol", cls: "MotoGP", pos: "18th" },
      { year: 2023, team: "Prima Pramac Racing", cls: "MotoGP", pos: "9th" },
      { year: 2022, team: "Prima Pramac Racing", cls: "MotoGP", pos: "11th" },
      { year: 2021, team: "Prima Pramac Racing", cls: "MotoGP", pos: "10th" },
      { year: 2020, team: "Esponsorama Racing", cls: "MotoGP", pos: "16th" },
      { year: 2019, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "16th" },
      { year: 2018, team: "Monster Energy Yamaha Tech3", cls: "MotoGP", pos: "6th" },
      { year: 2017, team: "Monster Energy Yamaha Tech3", cls: "MotoGP", pos: "7th" },
      { year: 2016, team: "Ajo Motorsport", cls: "Moto2", pos: "🥇 Champion" },
      { year: 2015, team: "Ajo Motorsport", cls: "Moto2", pos: "🥇 Champion" },
    ]
  },
  {
    num: 43, fn: "Jack", ln: "Miller", nat: "Australia", flag: "🇦🇺",
    team: "Red Bull KTM Factory Racing",
    career: [
      { year: 2024, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "12th" },
      { year: 2023, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "11th" },
      { year: 2022, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "5th" },
      { year: 2021, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "7th" },
      { year: 2020, team: "Pramac Racing", cls: "MotoGP", pos: "13th" },
      { year: 2019, team: "Pramac Racing", cls: "MotoGP", pos: "8th" },
      { year: 2018, team: "Pramac Racing", cls: "MotoGP", pos: "11th" },
      { year: 2015, team: "Marc VDS Racing", cls: "Moto3", pos: "🥇 Champion" },
    ]
  },
  {
    num: 23, fn: "Enea", ln: "Bastianini", nat: "Italy", flag: "🇮🇹",
    team: "Ducati Lenovo Team",
    career: [
      { year: 2024, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "9th" },
      { year: 2023, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "DNF (injury)" },
      { year: 2022, team: "Gresini Racing MotoGP", cls: "MotoGP", pos: "4th" },
      { year: 2021, team: "Esponsorama Racing", cls: "MotoGP", pos: "16th" },
      { year: 2020, team: "ONEXOX TKKR SAG", cls: "Moto2", pos: "2nd" },
      { year: 2019, team: "Italtrans Racing Team", cls: "Moto2", pos: "3rd" },
    ]
  },
  {
    num: 25, fn: "Raúl", ln: "Fernández", nat: "Spain", flag: "🇪🇸",
    team: "Trackhouse Racing",
    career: [
      { year: 2024, team: "Trackhouse Racing", cls: "MotoGP", pos: "13th" },
      { year: 2023, team: "RNF MotoGP Team", cls: "MotoGP", pos: "21st" },
      { year: 2022, team: "Tech3 KTM Factory Racing", cls: "MotoGP", pos: "16th" },
      { year: 2021, team: "Red Bull KTM Ajo", cls: "Moto2", pos: "2nd" },
    ]
  },
  {
    num: 37, fn: "Augusto", ln: "Fernández", nat: "Spain", flag: "🇪🇸",
    team: "Tech3 GasGas Factory Racing",
    career: [
      { year: 2024, team: "Tech3 GasGas Factory Racing", cls: "MotoGP", pos: "20th" },
      { year: 2023, team: "Tech3 GasGas Factory Racing", cls: "MotoGP", pos: "15th" },
      { year: 2022, team: "Red Bull KTM Ajo", cls: "Moto2", pos: "🥇 Champion" },
    ]
  },
  {
    num: 72, fn: "Marco", ln: "Bezzecchi", nat: "Italy", flag: "🇮🇹",
    team: "Pertamina Enduro VR46 Racing Team",
    career: [
      { year: 2024, team: "Pertamina Enduro VR46 Racing Team", cls: "MotoGP", pos: "7th" },
      { year: 2023, team: "Mooney VR46 Racing Team", cls: "MotoGP", pos: "3rd" },
      { year: 2022, team: "Mooney VR46 Racing Team", cls: "MotoGP", pos: "11th" },
      { year: 2021, team: "Sky Racing Team VR46", cls: "Moto2", pos: "3rd" },
    ]
  },

  // ── NEW GENERATION ────────────────────────────────────────────────────────

  {
    num: 31, fn: "Pedro", ln: "Acosta", nat: "Spain", flag: "🇪🇸",
    team: "Red Bull GasGas Tech3",
    career: [
      { year: 2024, team: "Red Bull GasGas Tech3", cls: "MotoGP", pos: "6th" },
      { year: 2023, team: "Red Bull KTM Ajo", cls: "Moto2", pos: "🥇 Champion" },
      { year: 2022, team: "Red Bull KTM Ajo", cls: "Moto2", pos: "5th" },
      { year: 2021, team: "Red Bull KTM Ajo", cls: "Moto3", pos: "🥇 Champion" },
    ]
  },
  {
    num: 49, fn: "Fabio", ln: "Di Giannantonio", nat: "Italy", flag: "🇮🇹",
    team: "Pertamina Enduro VR46 Racing Team",
    career: [
      { year: 2024, team: "Pertamina Enduro VR46 Racing Team", cls: "MotoGP", pos: "11th" },
      { year: 2023, team: "Gresini Racing MotoGP", cls: "MotoGP", pos: "14th" },
      { year: 2022, team: "Gresini Racing MotoGP", cls: "MotoGP", pos: "19th" },
      { year: 2021, team: "Speed Up Racing", cls: "Moto2", pos: "6th" },
    ]
  },
  {
    num: 10, fn: "Luca", ln: "Marini", nat: "Italy", flag: "🇮🇹",
    team: "Repsol Honda Team",
    career: [
      { year: 2024, team: "Repsol Honda Team", cls: "MotoGP", pos: "21st" },
      { year: 2023, team: "Mooney VR46 Racing Team", cls: "MotoGP", pos: "8th" },
      { year: 2022, team: "Mooney VR46 Racing Team", cls: "MotoGP", pos: "12th" },
      { year: 2021, team: "Esponsorama Racing", cls: "MotoGP", pos: "17th" },
      { year: 2020, team: "Sky Racing Team VR46", cls: "Moto2", pos: "2nd" },
      { year: 2019, team: "Sky Racing Team VR46", cls: "Moto2", pos: "6th" },
    ]
  },
  {
    num: 73, fn: "Alex", ln: "Márquez", nat: "Spain", flag: "🇪🇸",
    team: "Gresini Racing MotoGP",
    career: [
      { year: 2024, team: "Gresini Racing MotoGP", cls: "MotoGP", pos: "9th" },
      { year: 2023, team: "Gresini Racing MotoGP", cls: "MotoGP", pos: "12th" },
      { year: 2022, team: "LCR Honda Castrol", cls: "MotoGP", pos: "17th" },
      { year: 2021, team: "LCR Honda Castrol", cls: "MotoGP", pos: "13th" },
      { year: 2020, team: "Repsol Honda Team", cls: "MotoGP", pos: "13th" },
      { year: 2019, team: "EG 0,0 Marc VDS", cls: "Moto2", pos: "🥇 Champion" },
      { year: 2018, team: "EG 0,0 Marc VDS", cls: "Moto2", pos: "2nd" },
      { year: 2014, team: "Estrella Galicia 0,0", cls: "Moto3", pos: "🥇 Champion" },
    ]
  },
  {
    num: 21, fn: "Franco", ln: "Morbidelli", nat: "Italy", flag: "🇮🇹",
    team: "Prima Pramac Racing",
    career: [
      { year: 2024, team: "Prima Pramac Racing", cls: "MotoGP", pos: "9th" },
      { year: 2023, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "13th" },
      { year: 2022, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "19th" },
      { year: 2021, team: "Petronas Yamaha SRT", cls: "MotoGP", pos: "DNF (injury)" },
      { year: 2020, team: "Petronas Yamaha SRT", cls: "MotoGP", pos: "2nd" },
      { year: 2019, team: "Petronas Yamaha SRT", cls: "MotoGP", pos: "10th" },
      { year: 2018, team: "EG 0,0 Marc VDS", cls: "MotoGP", pos: "21st" },
      { year: 2017, team: "EG 0,0 Marc VDS", cls: "Moto2", pos: "🥇 Champion" },
    ]
  },
  {
    num: 42, fn: "Alex", ln: "Rins", nat: "Spain", flag: "🇪🇸",
    team: "Monster Energy Yamaha MotoGP",
    career: [
      { year: 2024, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "16th" },
      { year: 2023, team: "LCR Honda Castrol", cls: "MotoGP", pos: "22nd" },
      { year: 2022, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "7th" },
      { year: 2021, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "13th" },
      { year: 2020, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "3rd" },
      { year: 2019, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "4th" },
      { year: 2018, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "5th" },
      { year: 2017, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "16th" },
      { year: 2016, team: "Paginas Amarillas HP 40", cls: "Moto2", pos: "3rd" },
      { year: 2015, team: "Paginas Amarillas HP 40", cls: "Moto2", pos: "2nd" },
    ]
  },
  {
    num: 30, fn: "Takaaki", ln: "Nakagami", nat: "Japan", flag: "🇯🇵",
    team: "LCR Honda Idemitsu",
    career: [
      { year: 2024, team: "LCR Honda Idemitsu", cls: "MotoGP", pos: "19th" },
      { year: 2023, team: "LCR Honda Idemitsu", cls: "MotoGP", pos: "18th" },
      { year: 2022, team: "LCR Honda Idemitsu", cls: "MotoGP", pos: "18th" },
      { year: 2021, team: "LCR Honda Idemitsu", cls: "MotoGP", pos: "15th" },
      { year: 2020, team: "LCR Honda Idemitsu", cls: "MotoGP", pos: "10th" },
      { year: 2019, team: "LCR Honda Idemitsu", cls: "MotoGP", pos: "13th" },
      { year: 2018, team: "LCR Honda Idemitsu", cls: "MotoGP", pos: "20th" },
      { year: 2017, team: "Idemitsu Honda Team Asia", cls: "Moto2", pos: "7th" },
    ]
  },

  // ── LEGENDS & RETIRED CHAMPIONS ──────────────────────────────────────────

  {
    num: 46, fn: "Valentino", ln: "Rossi", nat: "Italy", flag: "🇮🇹",
    team: "Petronas Yamaha SRT (retired 2021)",
    career: [
      { year: 2021, team: "Petronas Yamaha SRT", cls: "MotoGP", pos: "18th" },
      { year: 2020, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "15th" },
      { year: 2019, team: "Monster Energy Yamaha MotoGP", cls: "MotoGP", pos: "7th" },
      { year: 2018, team: "Movistar Yamaha MotoGP", cls: "MotoGP", pos: "3rd" },
      { year: 2017, team: "Movistar Yamaha MotoGP", cls: "MotoGP", pos: "5th" },
      { year: 2016, team: "Movistar Yamaha MotoGP", cls: "MotoGP", pos: "2nd" },
      { year: 2015, team: "Movistar Yamaha MotoGP", cls: "MotoGP", pos: "2nd" },
      { year: 2014, team: "Movistar Yamaha MotoGP", cls: "MotoGP", pos: "2nd" },
      { year: 2013, team: "Yamaha Factory Racing", cls: "MotoGP", pos: "4th" },
      { year: 2012, team: "Ducati Team", cls: "MotoGP", pos: "6th" },
      { year: 2011, team: "Ducati Team", cls: "MotoGP", pos: "7th" },
      { year: 2010, team: "Fiat Yamaha Team", cls: "MotoGP", pos: "3rd" },
      { year: 2009, team: "Fiat Yamaha Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2008, team: "Fiat Yamaha Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2007, team: "Fiat Yamaha Team", cls: "MotoGP", pos: "3rd" },
      { year: 2006, team: "Camel Yamaha Team", cls: "MotoGP", pos: "2nd" },
      { year: 2005, team: "Gauloises Yamaha Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2004, team: "Gauloises Yamaha Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2003, team: "Repsol Honda Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2002, team: "Nastro Azzurro Honda", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2001, team: "Nastro Azzurro Honda", cls: "500cc", pos: "🥇 Champion" },
      { year: 1999, team: "Nastro Azzurro Aprilia", cls: "250cc", pos: "🥇 Champion" },
      { year: 1997, team: "Nastro Azzurro Aprilia", cls: "125cc", pos: "🥇 Champion" },
    ]
  },
  {
    num: 99, fn: "Jorge", ln: "Lorenzo", nat: "Spain", flag: "🇪🇸",
    team: "Repsol Honda Team (retired 2019)",
    career: [
      { year: 2019, team: "Repsol Honda Team", cls: "MotoGP", pos: "DNF (retired)" },
      { year: 2018, team: "Ducati Team", cls: "MotoGP", pos: "9th" },
      { year: 2017, team: "Ducati Team", cls: "MotoGP", pos: "7th" },
      { year: 2016, team: "Movistar Yamaha MotoGP", cls: "MotoGP", pos: "3rd" },
      { year: 2015, team: "Movistar Yamaha MotoGP", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2014, team: "Movistar Yamaha MotoGP", cls: "MotoGP", pos: "2nd" },
      { year: 2013, team: "Yamaha Factory Racing", cls: "MotoGP", pos: "2nd" },
      { year: 2012, team: "Yamaha Factory Racing", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2011, team: "Yamaha Factory Racing", cls: "MotoGP", pos: "2nd" },
      { year: 2010, team: "Fiat Yamaha Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2009, team: "Fiat Yamaha Team", cls: "MotoGP", pos: "2nd" },
      { year: 2008, team: "Fiat Yamaha Team", cls: "MotoGP", pos: "4th" },
      { year: 2007, team: "Fortuna Aprilia", cls: "250cc", pos: "🥇 Champion" },
      { year: 2006, team: "Fortuna Aprilia", cls: "250cc", pos: "🥇 Champion" },
      { year: 2005, team: "Fortuna Honda", cls: "250cc", pos: "5th" },
    ]
  },
  {
    num: 27, fn: "Casey", ln: "Stoner", nat: "Australia", flag: "🇦🇺",
    team: "Repsol Honda Team (retired 2012)",
    career: [
      { year: 2012, team: "Repsol Honda Team", cls: "MotoGP", pos: "3rd" },
      { year: 2011, team: "Repsol Honda Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2010, team: "Ducati Marlboro Team", cls: "MotoGP", pos: "4th" },
      { year: 2009, team: "Ducati Marlboro Team", cls: "MotoGP", pos: "4th" },
      { year: 2008, team: "Ducati Marlboro Team", cls: "MotoGP", pos: "2nd" },
      { year: 2007, team: "Ducati Marlboro Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2006, team: "LCR Honda", cls: "MotoGP", pos: "8th" },
    ]
  },
  {
    num: 26, fn: "Dani", ln: "Pedrosa", nat: "Spain", flag: "🇪🇸",
    team: "Repsol Honda Team (retired 2018)",
    career: [
      { year: 2018, team: "Repsol Honda Team", cls: "MotoGP", pos: "10th" },
      { year: 2017, team: "Repsol Honda Team", cls: "MotoGP", pos: "8th" },
      { year: 2016, team: "Repsol Honda Team", cls: "MotoGP", pos: "7th" },
      { year: 2015, team: "Repsol Honda Team", cls: "MotoGP", pos: "6th" },
      { year: 2014, team: "Repsol Honda Team", cls: "MotoGP", pos: "5th" },
      { year: 2013, team: "Repsol Honda Team", cls: "MotoGP", pos: "3rd" },
      { year: 2012, team: "Repsol Honda Team", cls: "MotoGP", pos: "2nd" },
      { year: 2011, team: "Repsol Honda Team", cls: "MotoGP", pos: "4th" },
      { year: 2010, team: "Repsol Honda Team", cls: "MotoGP", pos: "2nd" },
      { year: 2009, team: "Repsol Honda Team", cls: "MotoGP", pos: "3rd" },
      { year: 2008, team: "Repsol Honda Team", cls: "MotoGP", pos: "3rd" },
      { year: 2007, team: "Repsol Honda Team", cls: "MotoGP", pos: "2nd" },
      { year: 2006, team: "Repsol Honda Team", cls: "MotoGP", pos: "5th" },
      { year: 2005, team: "Telefonica Movistar Honda", cls: "250cc", pos: "🥇 Champion" },
      { year: 2004, team: "Telefonica Movistar Honda", cls: "250cc", pos: "🥇 Champion" },
      { year: 2003, team: "Telefonica Movistar Honda", cls: "125cc", pos: "🥇 Champion" },
    ]
  },
  {
    num: 69, fn: "Nicky", ln: "Hayden", nat: "USA", flag: "🇺🇸",
    team: "Aspar Team MotoGP (†2017)",
    career: [
      { year: 2016, team: "Aspar Team MotoGP", cls: "MotoGP", pos: "19th" },
      { year: 2015, team: "Drive M7 Aspar", cls: "MotoGP", pos: "20th" },
      { year: 2014, team: "Drive M7 Aspar", cls: "MotoGP", pos: "19th" },
      { year: 2013, team: "GO&FUN Honda Gresini", cls: "MotoGP", pos: "12th" },
      { year: 2012, team: "Ducati Team", cls: "MotoGP", pos: "11th" },
      { year: 2011, team: "Ducati Team", cls: "MotoGP", pos: "10th" },
      { year: 2010, team: "Ducati Team", cls: "MotoGP", pos: "7th" },
      { year: 2009, team: "Ducati Marlboro Team", cls: "MotoGP", pos: "13th" },
      { year: 2008, team: "Repsol Honda Team", cls: "MotoGP", pos: "6th" },
      { year: 2007, team: "Repsol Honda Team", cls: "MotoGP", pos: "8th" },
      { year: 2006, team: "Repsol Honda Team", cls: "MotoGP", pos: "🥇 Champion" },
      { year: 2005, team: "Repsol Honda Team", cls: "MotoGP", pos: "3rd" },
    ]
  },
  {
    num: 4, fn: "Andrea", ln: "Dovizioso", nat: "Italy", flag: "🇮🇹",
    team: "WithU Yamaha RNF (retired 2022)",
    career: [
      { year: 2022, team: "WithU Yamaha RNF MotoGP", cls: "MotoGP", pos: "21st" },
      { year: 2020, team: "Ducati Team", cls: "MotoGP", pos: "4th" },
      { year: 2019, team: "Ducati Team", cls: "MotoGP", pos: "2nd" },
      { year: 2018, team: "Ducati Team", cls: "MotoGP", pos: "2nd" },
      { year: 2017, team: "Ducati Team", cls: "MotoGP", pos: "2nd" },
      { year: 2016, team: "Ducati Team", cls: "MotoGP", pos: "4th" },
      { year: 2015, team: "Ducati Team", cls: "MotoGP", pos: "3rd" },
      { year: 2014, team: "Ducati Team", cls: "MotoGP", pos: "5th" },
      { year: 2013, team: "Ducati Team", cls: "MotoGP", pos: "8th" },
      { year: 2012, team: "Monster Yamaha Tech3", cls: "MotoGP", pos: "5th" },
      { year: 2011, team: "Repsol Honda Team", cls: "MotoGP", pos: "4th" },
      { year: 2010, team: "Repsol Honda Team", cls: "MotoGP", pos: "5th" },
      { year: 2009, team: "Repsol Honda Team", cls: "MotoGP", pos: "6th" },
      { year: 2008, team: "Repsol Honda Team", cls: "MotoGP", pos: "5th" },
      { year: 2004, team: "Fortuna Honda", cls: "125cc", pos: "🥇 Champion" },
    ]
  },

  // ── MID-ERA NOTABLES ──────────────────────────────────────────────────────

  {
    num: 58, fn: "Marco", ln: "Simoncelli", nat: "Italy", flag: "🇮🇹",
    team: "San Carlo Honda Gresini (†2011)",
    career: [
      { year: 2011, team: "San Carlo Honda Gresini", cls: "MotoGP", pos: "DNF (†)" },
      { year: 2010, team: "San Carlo Honda Gresini", cls: "MotoGP", pos: "8th" },
      { year: 2009, team: "Metis Gilera", cls: "250cc", pos: "2nd" },
      { year: 2008, team: "Metis Gilera", cls: "250cc", pos: "🥇 Champion" },
      { year: 2007, team: "Metis Gilera", cls: "250cc", pos: "5th" },
    ]
  },
  {
    num: 9, fn: "Danilo", ln: "Petrucci", nat: "Italy", flag: "🇮🇹",
    team: "Tech3 KTM Factory Racing (retired 2021)",
    career: [
      { year: 2021, team: "Tech3 KTM Factory Racing", cls: "MotoGP", pos: "21st" },
      { year: 2020, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "12th" },
      { year: 2019, team: "Ducati Lenovo Team", cls: "MotoGP", pos: "6th" },
      { year: 2018, team: "Alma Pramac Racing", cls: "MotoGP", pos: "8th" },
      { year: 2017, team: "OCTO Pramac Yakhnich", cls: "MotoGP", pos: "8th" },
      { year: 2016, team: "OCTO Pramac Yakhnich", cls: "MotoGP", pos: "14th" },
      { year: 2015, team: "OCTO Pramac Yakhnich", cls: "MotoGP", pos: "10th" },
      { year: 2014, team: "OCTO Pramac Yakhnich", cls: "MotoGP", pos: "20th" },
    ]
  },
  {
    num: 35, fn: "Cal", ln: "Crutchlow", nat: "Great Britain", flag: "🇬🇧",
    team: "LCR Honda (retired 2020)",
    career: [
      { year: 2020, team: "LCR Honda Castrol", cls: "MotoGP", pos: "8th" },
      { year: 2019, team: "LCR Honda Castrol", cls: "MotoGP", pos: "9th" },
      { year: 2018, team: "LCR Honda Castrol", cls: "MotoGP", pos: "7th" },
      { year: 2017, team: "LCR Honda Castrol", cls: "MotoGP", pos: "7th" },
      { year: 2016, team: "LCR Honda", cls: "MotoGP", pos: "5th" },
      { year: 2015, team: "LCR Honda", cls: "MotoGP", pos: "11th" },
      { year: 2014, team: "LCR Honda", cls: "MotoGP", pos: "13th" },
      { year: 2013, team: "Monster Yamaha Tech3", cls: "MotoGP", pos: "5th" },
      { year: 2012, team: "Monster Yamaha Tech3", cls: "MotoGP", pos: "7th" },
      { year: 2011, team: "Monster Yamaha Tech3", cls: "MotoGP", pos: "11th" },
    ]
  },
  {
    num: 44, fn: "Pol", ln: "Espargaró", nat: "Spain", flag: "🇪🇸",
    team: "GasGas Factory Racing Tech3 (retired 2023)",
    career: [
      { year: 2023, team: "GasGas Factory Racing Tech3", cls: "MotoGP", pos: "23rd" },
      { year: 2022, team: "Repsol Honda Team", cls: "MotoGP", pos: "22nd" },
      { year: 2021, team: "Repsol Honda Team", cls: "MotoGP", pos: "12th" },
      { year: 2020, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "5th" },
      { year: 2019, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "10th" },
      { year: 2018, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "14th" },
      { year: 2017, team: "Red Bull KTM Factory Racing", cls: "MotoGP", pos: "17th" },
      { year: 2016, team: "Monster Yamaha Tech3", cls: "MotoGP", pos: "8th" },
      { year: 2015, team: "Monster Yamaha Tech3", cls: "MotoGP", pos: "9th" },
      { year: 2014, team: "Monster Yamaha Tech3", cls: "MotoGP", pos: "6th" },
      { year: 2013, team: "Pons HP 40", cls: "Moto2", pos: "🥇 Champion" },
      { year: 2012, team: "Pons HP 40", cls: "Moto2", pos: "2nd" },
    ]
  },
  {
    num: 19, fn: "Álvaro", ln: "Bautista", nat: "Spain", flag: "🇪🇸",
    team: "Aprilia Racing Team Gresini (ret. MotoGP 2018)",
    career: [
      { year: 2018, team: "Angel Nieto Team", cls: "MotoGP", pos: "12th" },
      { year: 2017, team: "Pull&Bear Aspar Team", cls: "MotoGP", pos: "12th" },
      { year: 2016, team: "Aprilia Racing Team Gresini", cls: "MotoGP", pos: "12th" },
      { year: 2015, team: "Aprilia Racing Team Gresini", cls: "MotoGP", pos: "16th" },
      { year: 2014, team: "GO&FUN Honda Gresini", cls: "MotoGP", pos: "11th" },
      { year: 2013, team: "GO&FUN Honda Gresini", cls: "MotoGP", pos: "6th" },
      { year: 2012, team: "Rizla Suzuki", cls: "MotoGP", pos: "5th" },
      { year: 2011, team: "Rizla Suzuki", cls: "MotoGP", pos: "13th" },
      { year: 2010, team: "Rizla Suzuki", cls: "MotoGP", pos: "13th" },
      { year: 2007, team: "Mapfre Aspar", cls: "125cc", pos: "🥇 Champion" },
    ]
  },
  {
    num: 29, fn: "Andrea", ln: "Iannone", nat: "Italy", flag: "🇮🇹",
    team: "Aprilia Racing Team Gresini (suspended 2020)",
    career: [
      { year: 2019, team: "Aprilia Racing Team Gresini", cls: "MotoGP", pos: "16th" },
      { year: 2018, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "10th" },
      { year: 2017, team: "Team Suzuki ECSTAR", cls: "MotoGP", pos: "8th" },
      { year: 2016, team: "Ducati Team", cls: "MotoGP", pos: "5th" },
      { year: 2015, team: "Ducati Team", cls: "MotoGP", pos: "5th" },
      { year: 2014, team: "Pramac Racing", cls: "MotoGP", pos: "9th" },
      { year: 2013, team: "Pramac Racing", cls: "MotoGP", pos: "12th" },
      { year: 2012, team: "Speed Master", cls: "Moto2", pos: "3rd" },
      { year: 2011, team: "Speed Master", cls: "Moto2", pos: "3rd" },
    ]
  },
  {
    num: 6, fn: "Stefan", ln: "Bradl", nat: "Germany", flag: "🇩🇪",
    team: "HRC Test Rider",
    career: [
      { year: 2019, team: "Aprilia Racing Team Gresini", cls: "MotoGP", pos: "15th" },
      { year: 2018, team: "LCR Honda Castrol", cls: "MotoGP", pos: "15th" },
      { year: 2017, team: "EG 0,0 Marc VDS", cls: "MotoGP", pos: "18th" },
      { year: 2016, team: "Aprilia Racing Team Gresini", cls: "MotoGP", pos: "16th" },
      { year: 2015, team: "LCR Honda", cls: "MotoGP", pos: "13th" },
      { year: 2014, team: "LCR Honda", cls: "MotoGP", pos: "11th" },
      { year: 2013, team: "LCR Honda MotoGP", cls: "MotoGP", pos: "7th" },
      { year: 2012, team: "LCR Honda MotoGP", cls: "MotoGP", pos: "8th" },
      { year: 2011, team: "Viessmann Kiefer Racing", cls: "Moto2", pos: "🥇 Champion" },
      { year: 2010, team: "Viessmann Kiefer Racing", cls: "Moto2", pos: "9th" },
    ]
  },
  {
    num: 11, fn: "Ben", ln: "Spies", nat: "USA", flag: "🇺🇸",
    team: "Ignite Pramac Ducati (retired 2013)",
    career: [
      { year: 2013, team: "Ignite Pramac Racing", cls: "MotoGP", pos: "DNF (injury)" },
      { year: 2012, team: "Yamaha Factory Racing", cls: "MotoGP", pos: "10th" },
      { year: 2011, team: "Yamaha Factory Racing", cls: "MotoGP", pos: "5th" },
      { year: 2010, team: "Monster Yamaha Tech3", cls: "MotoGP", pos: "6th" },
    ]
  },

];

export default riders;
