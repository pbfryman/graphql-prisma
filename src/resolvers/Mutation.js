import { v4 as uuidv4, v4 } from 'uuid'

const Mutation = {

  // CREATE USER
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email })

    if (emailTaken) {
      throw new Error('Email taken.')
    }

    return prisma.mutation.createUser({ data: args.data }, info)
  },

  // DELETE USER
  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id })

    if (!userExists) {
      throw new Error('User not found.')
    }

    return prisma.mutation.deleteUser({
      where: {
        id: args.id
      }
    }, info)
  },

  // UPDATE USER
  async updateUser(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updateUser({
      where: {
        id: id
      },
      data: data
    }, info)
  },

  // CREATE POST
  async createPost(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)
  },

  // DELETE POST
  async deletePost(parent, args, { prisma, pubsub }, info) {
    const postExists = await prisma.exists.Post({ id: args.id })

    if (!postExists) {
      throw new Error('Post not found.')
    }

    return prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)
  },

  // UPDATE POST
  async updatePost(parent, { id, data }, { prisma, pubsub }, info) {
    return prisma.mutation.updatePost({
      where: {
        id: id
      },
      data: data
    }, info)
  },

  // CREATE COMMENT
  async createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment({
      data: {
        text: args.data.text,
        author: {
          connect: {
            id: args.data.author
          }
        },
        post: {
          connect: {
            id: args.data.post
          }
        }
      }
    }, info)
  },

  // DELETE COMMENT
  async deleteComment(parent, args, { prisma, pubsub }, info) {
    const commentExists = await prisma.exists.Comment({ id: args.id })

    if (!commentExists) {
      throw new Error('Comment not found.')
    }

    return prisma.mutation.deleteComment({
      where: {
        id: args.id
      }
    }, info)
  },

  // UPDATE COMMENT
  async updateComment(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updateComment({
      where: {
        id: id
      },
      data: data
    }, info)
  }
}

export { Mutation as default }