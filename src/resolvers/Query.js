const Query = {
    me: () => ({
        name: 'jack bridger',
        id: 'abc2',
        email: "jack@g.com"
    }),
    users: (parent, args, { prisma }, info) => {
        const opArgs = {}
        if (args.query) {
            opArgs.where = {
                email_contains: args.query
            }
        }
        return prisma.query.users(opArgs, info)

    },
    post: () => ({
        id: "abc3",
        title: "hello world",
        body: "my body",
        published: true
    }),
    posts: (parent, args, { prisma }, info) => {
        const opArgs = {};
        if (args.query) {
            opArgs.where = {
                OR: [{ title_contains: args.query },
                { body_contains: args.query }]
            }
        }
        return prisma.query.posts(opArgs, info)
    },
    comments: (parent, args, { prisma }, info) => {
        console.log('came into comments resolver')
        console.log(args)
        const opArgs = {}
        if (args.query) {
            opArgs.where = {
                text_contains: args.query
            }
        }

        return prisma.query.comments(opArgs, info)
    }
}

export { Query as default }