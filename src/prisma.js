import { Prisma } from 'prisma-binding'
const prisma = new Prisma({
    typeDefs: "./src/generated/prisma.graphql",
    endpoint: "http://localhost:4466/"
})

const getUsers = async () => {
    const data = await prisma.query.users(null, "{id name email posts {id title} }")
    return data;
}
const getComments = async () => {
    const data = await prisma.query.comments(null, "{id text author {name}}")
    return data
}

const addComment = async () => {
    const data = await prisma.mutation.createComment({
        data: {
            text: 'double yo',
            author: {
                connect: {
                    id: 'ck4ubjbvv00hm0716mw5lu001'
                }
            },
            post: {
                connect: {
                    id: 'ck4ubjkli00hy0716zunxutaa'
                }
            }
        }
    },
        "{id text author {name} }")
    return data;

}

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    },
        "{ id title body author { name }}")
    return post;
}

// addComment()
// getComments();

const updatePostForUser = async (id, data) => {
    const postExists = await prisma.exists.Post({ id });
    if (!postExists) { throw new Error("post does not exist"); }
    else {
        const post = await prisma.mutation.updatePost({
            data,
            where: {
                id
            }
        },
            "{id title author {id}}")
        const user = await prisma.query.user({
            where: {
                id: post.author.id
            }

        }, "{id posts {id title body published}}")
        return user
    }
}
// createPostForUser("ck4ubjbvv00hm0716mw5lu001", { title: "heya", body: "badum", published: true })
//     .then(getUsers)
//     .then(console.log)
//     .catch(console.log)
// .then(data => console.log(data))

// updatePostForUser("ck4ubjkli00hy0716zunxutaa1", {
//     title: "its daddy badoing"
// }
// ).then(console.log)
//     .catch(console.err)