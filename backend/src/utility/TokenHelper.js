const jwt = require("jsonwebtoken");

exports.encodedToken = (email, user_id) => {
  let KEY = "123-ABC-XYZ";
  let EXPIRE = {
    expiresIn: "24H",
  };
  let payload = {
    email: email,
    user_id: user_id,
  };
  return jwt.sign(payload, KEY, EXPIRE);
};

exports.decodedToken = (token) => {
  try {
    let KEY = "123-ABC-XYZ";
    return jwt.verify(token, KEY);
  } catch (error) {
    return null;
  }
};
