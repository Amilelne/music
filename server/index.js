const app = require('./app');
const { ApolloServer } = require('apollo-server-express');
const { readFileSync } = require('fs');
const { join } = require('path');
const { resolvers } = require('./resolvers');
const extractors = require('./utils/extractors.service');
const JWT = require('./utils/jwt.service');

const schemaDir = join(process.cwd(), 'schemas');
const typeDefs = readFileSync(join(schemaDir, 'user.graphql'), 'utf-8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // header_name --> defined in graphql.module.ts
    const header_name = 'authorization';
    // try to retrieve a user with the token
    let token = extractors.fromHeaderAsBearerToken(header_name)(req);
    let user = null;
    if (token) {
      user = JWT.getUser(token);
    }
    // add the user to the context
    return { user };
  }
});

server.applyMiddleware({ app });

const port = app.get('port');

app.listen({ port }, () => {
  console.log(`Server ready at ${port}`);
});
