import { prisma } from "../../lib/prisma"

const createComment = async (paylode: {
    content: string,
    authorId: string,
    postId: string,
    parentId?: string
}) => {

    await prisma.post.findUnique({
        where: {
            id: paylode.postId
        }
    })
    if (paylode.parentId) {
        await prisma.comment.findUniqueOrThrow({
            where: {
                id: paylode.parentId
            }
        })
    }
    return await prisma.comment.create({
        data: paylode
    })
}

export const CommentServices = {
    createComment
}