const BaseModel = require("./BaseModel");

class Section extends BaseModel {
  static get tableName() {
    return "phase"
  }
  static get idColumn(){
    return "phaseId"
  }

  static relationMappings = {

  }
}