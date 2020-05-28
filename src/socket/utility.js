module.exports = {
  // Compares existing user id with new user id.
  checkUser: function (obj) {
    console.log(obj.name);
    return obj.name === "anz";
  },
};
