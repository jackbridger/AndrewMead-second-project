import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserID from '../utils/getUserID'

const Mutation = {
    createUser: async (parent, args, { prisma }, info) => {
        const userExists = await prisma.exists.User({ email: args.data.email })
        if (userExists) throw new Error("user exists")
        if (args.data.password.length < 8) throw new Error('pw not long')

        const hashedPassword = await bcrypt.hash(args.data.password, 10);
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password: hashedPassword
            }
        });
        const token = await jwt.sign({ id: user.id }, 'supersecret');
        return { user, token }
    },
    deleteUser: async (parent, args, { prisma }, info) => {

        const userExists = await (prisma.exists.User({ id: args.data.id, email: args.data.email }))
        if (!userExists) throw new Error("user doesnt exist");

        return prisma.mutation.deleteUser({ where: args.data }, info)


    },
    updateUser: async (parent, { data, id }, { prisma }, info) => {
        if (data.password) {
            if (data.password.length < 8) throw new Error('pw not long')
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }

        return prisma.mutation.updateUser({
            where: {
                id
            },
            data
        },
            info)
    }
    ,
    createPost: async (parent, args, { prisma, request }, info) => {
        const userID = getUserID(request)
        return prisma.mutation.createPost({
            data: {
                ...args.data,
                author: {
                    connect: {
                        id: userID
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
    },
    loginUser: async (parent, { data }, { prisma }, info) => {
        const { password, email } = data;

        const userExists = await prisma.exists.User({ email });
        if (!userExists) throw new Error("no user")

        const user = await prisma.query.user({ where: { email } });

        const userVerfied = await bcrypt.compare(password, user.password);
        if (!userVerfied) throw new Error("password incorrect");

        const token = jwt.sign({ id: user.id }, "supersecret");

        return { user, token };
    }
}
export { Mutation as default }