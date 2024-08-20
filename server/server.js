const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./schemas/typeDefs");
const { resolvers } = require("./schemas/resolvers");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

// Apply middleware before Apollo Server middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});

async function startServer() {
  try {
    await server.start();
    server.applyMiddleware({ app });

    // db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(
          `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    // });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();