const fs = require('fs');

// Función para guardar datos en un archivo (ejemplo)
const saveDataToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Función para leer datos desde un archivo (ejemplo)
const readDataFromFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return [];
};

module.exports = { saveDataToFile, readDataFromFile };
