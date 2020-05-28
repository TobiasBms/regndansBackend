const BaseModel = require("./BaseModel");

class Draw extends BaseModel{
  static get tableName(){
    return 'draw';
  }

  static get idColumn(){
    return 'drawId';
  }


  
};

module.exports = Draw;