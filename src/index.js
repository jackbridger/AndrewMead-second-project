import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db';
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Subscription from './resolvers/Subscription';
import prisma from './prisma'
const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment,
        Subscription
    },
    context: {
        db,
        pubsub
    }
})
server.start({ port: 4000 }, () => {
    console.log('server is up')
})
// prisma.query.users(null, "{id name email }").then(data => {
//     console.log(data)
// })

async function getUsers() {
    const data = await prisma.query.users(null, "{id name email }")
    console.log(data)
}
async function getComments() {
    const data = await prisma.query.comments(null, "{id text author {name}}")
    console.log(JSON.stringify(data, undefined, 2))
}

async function addComment() {
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
    console.log(JSON.stringify(data, undefined, 2))

}

// addComment()
getComments();
