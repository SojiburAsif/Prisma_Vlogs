import { Request, Response } from "express";
import { postService } from "./post.service";


const createPost = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "unauthorization",
            })
        }
        const result = await postService.createPost(req.body, user.id as string)
        res.status(201).json(result)

    } catch (e) {
        res.status(400).json({
            error: "Post creation failed",
            details: e
        })
    }
}
const getAllpost = async (req: Request, res: Response) => {
    try {
        const { search } = req.query
        const searchString = typeof search === 'string' ? search : undefined
        const tags = req.query.tags ? (req.query.tags as string).split(",") : []

        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
        const result = await postService.getAllPost({ search: searchString, tags, isFeatured })
        res.status(200).json(result)
    } catch (err: any) {
        console.log(err);
    }
}

const getPostById = async (req: Request, res: Response) => {
    try {
        const{ PostId } = req.params
        if(!PostId){
            throw new Error("post Id reqirde")
        }
        console.log(PostId);
        const result = await postService.getPostById(PostId)
        res.status(201).json(result)

    }
    catch (err) {

    }
}
export const PostController = {
    createPost,
    getAllpost,
    getPostById
}