const path = require('path');
const fs = require('fs');
const _filePath = path.join(__dirname, 'url.store.json');
const model = { fetch: '', default: '', root: '' };

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

module.exports.init = () => {
  if (!fs.existsSync(_filePath)) fs.writeFileSync(_filePath, JSON.stringify(model));
};

module.exports.store = url => {
  let fileData = getData();
  let key = Object.keys(url);
  fileData[key] = url[key];
  return appendData(fileData);
};

module.exports.entries = () => {
  return getData();
};
