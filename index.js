const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewURLParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server is running on port ${res.url}`);
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
