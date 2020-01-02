import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db';
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Subscription from './resolvers/Subscription';
// import './prisma'
import { Prisma } from 'prisma-binding'
const prisma = new Prisma({
    typeDefs: "./src/generated/prisma.graphql",
    endpoint: "http://localhost:4466/"
})
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
        pubsub,
        prisma
    }
})
server.start({ port: 4000 }, () => {
    console.log('server is up')
})


