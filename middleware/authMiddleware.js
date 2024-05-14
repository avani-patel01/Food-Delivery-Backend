import { JWT_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";

export const AuthVandorMiddleware = async (req, res, next) => {
  const headers = req.headers["authorization"];
  if (!headers) {
    return res.status(403).json({ msg: "No authorization header provided" });
  }

  try {
    const token = headers.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken) {
      req.Vandor = decodedToken;
      next();
    }
  } catch (error) {
    return res.status(401).json({ msg: "Invalid Token!" });
  }
};
