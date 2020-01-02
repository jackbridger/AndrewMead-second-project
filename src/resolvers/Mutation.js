import uuid from 'uuid/v4'

const Mutation = {
    createUser: async (parent, args, { prisma }, info) => {
        const userExists = await prisma.exists.User({ email: args.data.email })
        if (userExists) { throw new Error("user exists m8"); }
        return prisma.mutation.createUser({ data: args.data }, info);
    },
    deleteUser: async (parent, args, { prisma }, info) => {
        // Check user exists 

        const userExists = await (prisma.exists.User({ id: args.data.id, email: args.data.email }))
        if (!userExists) throw new Error("user doesnt exist");

        return prisma.mutation.deleteUser({ where: args.data }, info)


    },
    updateUser: async (parent, { data, id }, { prisma }, info) => {
        return prisma.mutation.updateUser({
            where: {
                id
            },
            data
        },
            info)
    }
    ,
    createPost: async (parent, args, { prisma }, info) => {
        return prisma.mutation.createPost({
            data: {
                ...args.data,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        },
            info);
    },
    deletePost: async (parent, { id }, { prisma }, info) => {
        return prisma.mutation.deletePost({
            where: {
                id
            }
        },
            info);
    },
    updatePost: async (parent, { id, data }, { prisma }, info) => {
        return prisma.mutation.updatePost({
            where: { id },
            data
        },
            info)

    }
    ,
    createComment: async (parent, { data }, { prisma }, info) => {
        return prisma.mutation.createComment({
            data: {
                ...data,
                author: {
                    connect: {
                        id: data.author
                    }
                },
                post: {
                    connect: {
                        id: data.post
                    }
                }
            }
        }, info);

    },
    deleteComment: async (parent, { id }, { prisma }, info) => {
        return prisma.mutation.deleteComment({
            where: {
                id
            }
        },
            info)
    },
    updateComment: async (parent, { id, data }, { prisma }, info) => {
        return prisma.mutation.updateComment({
            where: {
                id
            },
            data
        },
            info)
    }
}
export { Mutation as default }