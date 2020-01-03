const Subscription = {
    newComment: {
        subscribe: async (parent, { postID }, { prisma }, info) => {
            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: postID
                        }
                    }
                }
            }, info)
        },
    },
    newPost: {
        subscribe: async (parent, args, { prisma }, info) => {
            return prisma.subscription.post({
                where: {
                    node: {
                        published: true
                    }
                }
            }, info)
        }
    }

}
export { Subscription as default }