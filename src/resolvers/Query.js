const Query = {
    me: () => ({
        name: 'jack bridger',
        id: 'abc2',
        email: "jack@g.com"
    }),
    users: (parent, args, { db, prisma }, info) => {
        // if (args.query) {
        //     return db.userData.filter(x => x.name.includes(args.query))
        // }
        // else return db.userData

        if (args.query) {

            return prisma.query.users({
                where: {
                    email: args.query
                }
            }
                , info)
        }
        else return prisma.query.users(null
            , info)

    },
    post: () => ({
        id: "abc3",
        title: "hello world",
        body: "my body",
        published: true
    }),
    posts: (parent, args, { db }, info) => {
        if (args.query) {
            return db.postsData.filter(post => post.title.includes(args.query))
        }
        else return db.postsData
    },
    comments: (parent, args, { db }, info) => {
        return db.commentsData
    }
}

export { Query as default }