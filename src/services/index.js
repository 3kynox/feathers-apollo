'use strict';
const graphql = require('./graphql/graphql.service.js');

module.exports = function() {
  const app = this;
 
  // Has to be last
  app.configure(graphql);  
};
