import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from '../lib/auth'


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string,
                name: string,
                role: string,
                emailVerified: boolean;
            }
        }
    }
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

const auth = (...role: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            })

            if (!session) {
                return res.status(401).json({
                    sucess: false,
                    message: "You are not authorized"
                })
            }

            if (!session.user.emailVerified) {
                return res.status(403).json({
                    sucess: false,
                    message: "email verificaion  requerd"
                })
            }


            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role as string,
                emailVerified: session.user.emailVerified
            }


            if (role.length && !role.includes(req.user?.role as UserRole)) {
                return res.status(403).json({
                    success: false,
                    error: "FORBIDDEN",
                    message: "You do not have permission to access this resource"
                });
            }
            next()
        }
        catch (err: any) {
            console.log(err);
        }
    }

}

export default auth;