import { Request, Response } from "express";

export function isAuthorized(opts: { hasRole: Array<'admin' | 'manager' | 'user'>, allowSameUser?: boolean }) {
   return (req: Request, res: Response, next: Function) => {
        const { role, uid } = res.locals
        const { id } = req.query

        console.log(role)
        console.log(uid)
        console.log(id)
        console.log('res.locals: '+ JSON.stringify(res.locals))
        console.log('req.params: '+ JSON.stringify(req.params))

        return next();          //TODO remove once logic is built

        if (opts.allowSameUser && id && uid === id)
           return next();

        // if (!role)
           // return res.status(403).send("Empty Role; Unauthorized to perform this action");

        if (opts.hasRole.includes(role))
            return next();

        return res.status(403).send("Unauthorized to perform this action");
   }
}