const BaseModel = require("./BaseModel.js");

class Boardrole extends BaseModel{

  static get tableName(){
    return "boardrole"
  }

  static get idColumn(){
    return "roleId"
  }

}
module.exports = Boardrole;