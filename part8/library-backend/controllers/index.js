const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export default server