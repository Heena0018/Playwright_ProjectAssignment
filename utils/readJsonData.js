const fs = require('fs');
const path = require('path');

function readJsonData(filePath) {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON data:', error);
    return null;
  }
}

module.exports = readJsonData;
