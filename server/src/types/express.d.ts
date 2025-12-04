import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export {};
declare global {
  namespace Express {
    interface Request {
      validated?: any;
    }
  }
}

export {};
