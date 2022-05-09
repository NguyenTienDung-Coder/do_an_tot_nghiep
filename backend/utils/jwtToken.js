// Create Token and saving in cookie
const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  const accesstoken = jwt.sign(
    { id: data._id, admin: data.admin },
    process.env.ACCESSTOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );
  return accesstoken;
};
const generateRefreshToken = (data) => {
  const accesstoken = jwt.sign(
    { id: data._id, admin: data.admin },
    process.env.REFRESHTOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );
  return accesstoken;
};
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  console.log(token);

  // options for cookie
  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: false,
  // };
  const accesstoken = generateAccessToken(user);
  console.log("ACESS TOKEN: ", accesstoken);
  const refreshtoken = generateRefreshToken(user);
  res.cookie("refreshtoken", refreshtoken, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
  });

  res.status(statusCode).json({
    success: true,
    user,
    token: accesstoken,
  });
};

module.exports = sendToken;
