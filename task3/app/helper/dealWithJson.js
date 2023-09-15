const fs = require("fs");

class HandleProductsData {
  // read from json file
  static readFromJson(path = "model/products-data.json") {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path));
    } catch (err) {
      data = [];
    }
    return data;
  }

  // write to json file
  static writeToJson(data, path = "model/products-data.json") {
    if (!Array.isArray(data)) data = [];
    fs.writeFileSync(path, JSON.stringify(data));
  }
}

module.exports = HandleProductsData;
