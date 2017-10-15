const graphql = require('graphql-server-express').graphqlExpress;
const graphiql = require('graphql-server-express').graphiqlExpress;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const Schema = require('./graphql.schema');
const Resolvers = require('./graphql.resolvers');

module.exports = function () {
  const app = this;

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  });

  app.use('/graphql', graphql((req) => {
    const {token, provider} = req.feathers;
    return {
      schema: executableSchema,
      context: {
        token,
        provider
      }
    };
  }));

  app.use('/graphiql', graphiql({
    endpointURL: '/graphql',
  }));
};
