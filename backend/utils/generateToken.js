import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE !== "development",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, //30 days
  });
};

export default generateToken;
