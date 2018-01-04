const { encodePassword, comparePassword } = require("./");

encodePassword("bacon")
  .then(hash => {
    console.log("hash : ", hash);
    return hash;
  })
  .then(hash => comparePassword("bacon", hash))
  .then(isMatch => console.log(`isMatch : ${isMatch}`))
  .catch(err => console.log("err : ", err));

exports.createGenericPassoword = () => encodePassword("bacon")