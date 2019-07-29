const path = require('path');
const fs = require('fs');

const _filePath = path.join(__dirname, 'url.store.json');

const getData = () => {
  try {
    let fileData = JSON.parse(fs.readFileSync(_filePath, 'utf8'));
    return fileData;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const appendData = fileData => {
  try {
    fs.writeFileSync(_filePath, JSON.stringify(fileData));
    return true;
  } catch (err) {
    console.error(err);
    return true;
  }
};

module.exports.store = url => {
  let fileData = getData();
  if (url.includes('https://')) fileData.fetch = url;
  else fileData.local = url;
  return appendData(fileData);
};

module.exports.storeDefault = url => {
  let fileData = getData();
  fileData.default = url;
  return appendData(fileData);
};

module.exports.entries = () => {
  return getData();
};
