import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { configs } from "../config/auth.config";
import { CustomRequest } from "../interfaces/customRequest.interface";

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token: string = <string>req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, configs.secret, (err, decoded) => {
        if (err) {
            res.status(401).json({
                error: "Unauthorized",
                message: "failed to authenticate token",
            });
            return;
        } else {
            (req as CustomRequest).userInfo = <JwtPayload>decoded;

            next();
        }
    });
};

export const hasAccess = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token: string = <string>req.headers["x-access-token"];

    if (!token) {
        return res.status(401).send({ message: "No project selected" });
    }

    const verified = jwt.verify(token, configs.secret, (err, decoded) => {
        if (err) {
            res.status(401).json({
                error: "Unauthorized",
                message: "failed to authenticate token",
            });
            return;
        } else { 
            let jwtPayload = <JwtPayload>decoded;
            let isProf: boolean = jwtPayload["isProf"];
            console.log(isProf);
            if (isProf) {
                const headers = req.headers;
                headers['profId']=jwtPayload["id"]
                headers['isAdmin']=jwtPayload["isAdmin"]
                next();
            } else {
                res.status(403).json({
                    error: "Forbidden",
                    message: "You don`t have access to this project",
                });
                return;
            }
        }
    });
};

export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token: string = <string>req.headers["x-access-token"];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    const verified = jwt.verify(token, configs.secret, (err, decoded) => {
        if (err) {
            res.status(401).json({
                error: "Unauthorized",
                message: "failed to authenticate token",
            });
            return;
        } else {
            let jwtPayload = <JwtPayload>decoded;
            let isAdmin: boolean = jwtPayload["isAdmin"];
            console.log(isAdmin);
            if (isAdmin) {
                next();
            } else {
                res.status(403).json({
                    error: "Forbidden",
                    message: "You don`t have access to this project",
                });
                return;
            }
        }
    });
};
