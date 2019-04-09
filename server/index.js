const app = require("./app");
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const extractors = require("./utils/extractors.service");
const JWT = require("./utils/jwt.service");
const readGqlFiles = require("./utils/readGqlFiles");

(async () => {
  const typeDefs = await readGqlFiles();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // header_name is defined in graphql.module.ts
      const header_name = "authorization";
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

  const host = app.get("host");
  const port = app.get("port");

  app.listen({ port }, () => {
    console.log(`Server ready at ${host}:${port}`);
  });
})();
