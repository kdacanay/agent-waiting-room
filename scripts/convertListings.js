// scripts/convertListings.js
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, '../new_listings.csv');

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync(path.join(__dirname, '../new_listings.json'), JSON.stringify(jsonObj, null, 2));
    console.log('✅ Converted to new_listings.json!');
  })
  .catch((err) => console.error(err));
