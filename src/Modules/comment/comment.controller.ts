import { Request, Response } from "express";
import { CommentServices } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        req.body.authorId = user?.id;
        const result = await CommentServices.createComment(req.body)
        res.status(200).json(result)
    } catch (err) {

    }
}

export const commentController = {
    createComment
}