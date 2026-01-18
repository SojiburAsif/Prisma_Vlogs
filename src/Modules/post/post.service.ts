import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";


const createPost = async (data: Omit<Post, "id" | "createAt" | "updateAt" | "authorId">, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...data,
            authorId: userId
        }
    })
    return result
}

const getAllPost = async ({
    search, tags, isFeatured
}: { search?: string | undefined, tags: string[], isFeatured: boolean | undefined }) => {

    const andCondition: PostWhereInput[] = []

    if (search) {
        andCondition.push({
            OR: [
                {
                    title: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
                {
                    content: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
                {
                    tags: {
                        has: search as string
                    }
                }

            ]
        })
    }
    if (tags.length > 0) {
        andCondition.push({
            tags: {
                hasEvery: tags as string[]
            }
        })
    }
    if (typeof isFeatured === 'boolean') {
        andCondition.push({
            isFeatured
        })
    }

    const allPost = await prisma.post.findMany({
        where: {
            AND: andCondition
        },
        include: {
            _count: {
                select: { comments: true }
            }
        }
    });
    return allPost
}

const getPostById = async (postId: string) => {
    const result = await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: {
                id: postId
            },
            data: {
                views: {
                    increment: 1
                }
            }
        })

        const PostData = await tx.post.findUnique({
            where: {
                id: postId
            },
            include: {
                comments: {
                    where: {
                        parentId: null
                    },
                    orderBy: { createdAt: "desc" },
                    include: {
                        replies: {
                            include: {
                                replies: true
                            }
                        }
                    }
                },
                _count: {
                    select: { comments: true }
                }
            }

        })
        return PostData
    })
    return result
}
export const postService = {
    createPost, getAllPost, getPostById

}