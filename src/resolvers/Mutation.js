import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {

  // LOGIN USER
  async loginUser(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: data.email
      }
    })

    if (user === null) {
      throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(data.password, user.password)

    if (!isMatch) {
      throw new Error('Unable to login!')
    }

    return {
      user,
      token: generateToken(user.id)
    }

  },

  // CREATE USER
  async createUser(parent, { data }, { prisma }, info) {
    const password = await hashPassword(data.password)

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password // password: password
      }
    })

    return {
      user,
      token: generateToken(user.id)
    }
  },

  // DELETE USER
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.deleteUser({
      where: {
        id: userId
      }
    }, info)
  },

  // UPDATE USER
  async updateUser(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request)

    if (typeof data.password === 'string') {
      data.password = await hashPassword(data.password)
    }

    return prisma.mutation.updateUser({
      where: {
        id: userId
      },
      data: data
    }, info)
  },

  // CREATE POST
  async createPost(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request)
    
    return prisma.mutation.createPost({
      data: {
        title: data.title,
        body: data.body,
        published: data.published,
        author: {
          connect: {
            id: userId
          }
        }
      }
    }, info)
  },

  // DELETE POST
  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request)
    
    const postExists = await prisma.exists.Post({
      id: id,
      author: {
        id: userId
      }
    })

    if (!postExists) {
      throw new Error('Unable to delete post!')
    }

    return prisma.mutation.deletePost({
      where: {
        id: id
      }
    }, info)
  },

  // UPDATE POST
  async updatePost(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request)

    const postExists = await prisma.exists.Post({
      id: id,
      author: {
        id: userId
      }
    })
    
    const isPublished = await prisma.exists.Post({ id: id, published: true })

    if (!postExists) {
      throw new Error('Unable to update post!')
    }

    if (isPublished && data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: id
          }
        }
      })
    }

    return prisma.mutation.updatePost({
      where: {
        id: id
      },
      data: data
    }, info)
  },

  // CREATE COMMENT
  async createComment(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request)

    const postExists = await prisma.exists.Post({
      id: data.post,
      published: true
    })

    if (!postExists) {
      throw new Error('Unable to find post!')
    }

    return prisma.mutation.createComment({
      data: {
        text: data.text,
        author: {
          connect: {
            id: userId
          }
        },
        post: {
          connect: {
            id: data.post
          }
        }
      }
    }, info)
  },

  // DELETE COMMENT
  async deleteComment(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request)

    const commentExists = await prisma.exists.Comment({
      id: id,
      author: {
        id: userId
      }
    })

    if (!commentExists) {
      throw new Error('Unable to delete comment!')
    }

    return prisma.mutation.deleteComment({
      where: {
        id: id
      }
    }, info)
  },

  // UPDATE COMMENT
  async updateComment(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request)

    const commentExists = await prisma.exists.Comment({
      id: id,
      author: {
        id: userId
      }
    })

    if (!commentExists) {
      throw new Error('Unable to update comment!')
    }

    return prisma.mutation.updateComment({
      where: {
        id: id
      },
      data: data
    }, info)
  }
}

export { Mutation as default }