const { ApolloServer } = require('@apollo/server')
const typeDefs = require('./schema')
const mutations = require('./mutations')
const queries = require('./queries')

const resolvers = {
  Query: queries,
  Mutation: mutations
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

module.exports = server