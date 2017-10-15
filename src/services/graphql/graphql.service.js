// Initializes the `graphql` service on path `/graphql`
// const createService = require('./graphql.class.js');
// const hooks = require('./graphql.hooks');
// const filters = require('./graphql.filters');

// module.exports = function () {
//   const app = this;
//   const paginate = app.get('paginate');

//  const options = {
//     name: 'graphql',
//     paginate
//   };

  // Initialize our service with any options it requires
//   app.use('/graphql', createService(options));

  // Get our initialized service so that we can register hooks and filters
//   const service = app.service('graphql');

//   service.hooks(hooks);

//   if (service.filter) {
//     service.filter(filters);
//   }
// };

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
