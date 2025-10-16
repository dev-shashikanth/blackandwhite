// middlewares/authMiddleware.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    try {
      const secret = process.env.JWT_SECRET || "default_secret";
      const decoded = jwt.verify(token, secret) as JwtPayload;

      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization denied" });
    }
  };
};

export default authMiddleware;
