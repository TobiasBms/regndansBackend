const { Model } = require('objection');
const {format} = require("date-fns");

class BaseModel extends Model{

  constructor(){
    super();
  }

  $beforeInsert(){
    let now = new Date();
    now = format(now, "yyyy-MM-dd");

    this.createdAt = now;
    this.updatedAt = now;
  }

  $afterUpdate(){
    let now = new Date();
    now = format(now,"yyyy-MM-dd");
    this.updatedAt = now;
  }
}

module.exports = BaseModel;