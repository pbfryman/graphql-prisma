import { prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma-review-website.graphql',
  endpoint: 'http://localhost:4466/reviews/default'
})