const app = require('./app');
const { ApolloServer } = require('apollo-server-express');
const { readFileSync } = require('fs');
const { join } = require('path');
const { resolvers } = require('./resolvers');

const schemaDir = join(process.cwd(), 'schemas');
const typeDefs = readFileSync(join(schemaDir, 'schema.graphqls'), 'utf-8');

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const port = app.get('port');

app.listen({ port }, () => {
  console.log(`Server ready at ${port}`);
});
