import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'Copper04!'
})

export { prisma as default }

/////////////////////////////////////////////////////////

// const createComment = async (authorId, postId, data) => {
//   const comment = await prisma.mutation.createComment({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       },
//       post: {
//         connect: {
//           id: postId
//         }
//       }
//     }
//   }, '{ id }')

//   return comment
// }

// createComment('ckjvn92mv01at0850s8br6uje', 'ckjui7eg000th09501gkuadot', {
//   text: "Prisma is very convienient. You will like it with practice!"
// }).then((comment) => {
//   console.log(JSON.stringify(comment, undefined, 2))
// })

// // Create Post
// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId })

//   if (!userExists) {
//     throw new Error('User not found!')
//   }

//   const post = await prisma.mutation.createPost({
//     data: {
//       ...data,
//       author: {
//         connect: {
//           id: authorId
//         }
//       }
//     }
//   }, '{ author { id name email posts { id title published } } }')

//   return post.author
// }

// // Update Post
// const updatePostForUser = async (postId, data) => {
//   const postExists = prisma.exists.Post({ id: postId })

//   if (!postExists) {
//     throw new Error('Post not found!')
//   }

//   const post = await prisma.mutation.updatePost({
//     data: {
//       ...data
//     },
//     where: {
//       id: postId
//     }
//   }, '{ author { id name email posts { id title published }} }')

//   return post.author
// }

// // Delete Post
// const deletePostForUser = async (postId) => {
//   const postExists = prisma.exists.Post({ id: postId })

//   if (!postExists) {
//     throw new Error('Post not found!')
//   }

//   const post = await prisma.mutation.deletePost({
//     where: {
//       id: postId
//     }
//   }, '{ id title body }')

//   return post
// }

// // Query User Posts
// const queryPostsForUser = async (authorId) => {
//   const userExists = await prisma.exists.User({ id: authorId })

//   if (!userExists) {
//     throw new Error('User not found!')
//   }

//   const posts = await prisma.query.posts({
//     where: {
//       author: {
//         id: authorId
//       }
//     }
//   }, '{ id title body published }')

//   return posts
// }

// /////////////////////////////////////////////////////////

// // Create User
// const createNewUser = async (data) => {
//   const emailTaken = await prisma.exists.User({ email: data.email })

//   if (emailTaken) {
//     throw new Error('Email already in use!')
//   }

//   const user = await prisma.mutation.createUser({
//     data: {
//       ...data
//     }
//   }, '{ id name email }')

//   return user
// }

// // Delete User
// const deleteUser = async (userId) => {
//   const userExists = await prisma.exists.User({ id: userId })

//   if (!userExists) {
//     throw new Error('User not found!')
//   }

//   const user = await prisma.mutation.deleteUser({
//     where: {
//       id: userId
//     }
//   }, '{ id name email }')

//   return user
// }

// // Query Users
// const queryUsers = async () => {
//   const users = await prisma.query.users(null, '{ id name email }')

//   return users
// }

// // CALL CREATE NEW USER
// // createNewUser({
// //   name: "Copper Jacob",
// //   email: "copper@example.com"
// // }).then((data) => {
// //   console.log(JSON.stringify(data, undefined, 2))
// // }).catch((error) => {
// //   console.log(error.message)
// // })

// // CALL QUERY USER POSTS
// // queryPostsForUser('ckjuhqgg700kw09500285w5zw')
// //   .then((data) => [
// //     console.log(JSON.stringify(data, undefined, 2))
// //   ])
// //   .catch((error) => {
// //     console.log(error.message)
// //   })

// // deleteUser('ckjvmussz017i0850dh3aszf5')
// //   .then((user) => {
// //     console.log(JSON.stringify(user, undefined, 2))
// //   })
// //   .catch((error) => {
// //     console.log(error.message)
// //   })

// // QUERY ALL USERS
// // queryUsers().then((user) => {
// //   console.log(JSON.stringify(user, undefined, 2))
// // })

// // CALL DELETE POST
// // deletePostForUser('ckjvkyhds00kn0850fa6f1aew')
// //   .then((post) => {
// //     console.log(JSON.stringify(post, undefined, 2))
// //   })
// //   .catch((error) => {
// //     console.log(error.message)
// //   })

// // CALL UPDATE POST
// // updatePostForUser('ckjvjoagm0044085084cro8y8', {
// //   body: 'Mockingjay'
// // }).then((user) => {
// //   console.log(JSON.stringify(user, undefined, 2))
// // }).catch((error) => {
// //   console.log(error.message)
// // })

// // CALL CREATE POST
// // createPostForUser('ckjuhqgg700kw09500285w5zw', {
// //   title: 'Great Books to Read',
// //   body: 'The War of Art',
// //   published: true
// // }).then((user) => {
// //   console.log(JSON.stringify(user, undefined, 2))
// // }).catch((error) => {
// //   console.log(error.message)
// // })

// // Users Query
// // prisma.query.users(null, '{ id name posts { id title } }')
// //   .then((data) => {
// //     console.log(JSON.stringify(data, undefined, 2))
// //   })

// // Comments Query
// // prisma.query.comments(null, '{ id text author { id name }}')
// //   .then((data) => {
// //     console.log(JSON.stringify(data, undefined, 2))
// //   })
  