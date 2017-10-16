'use strict';
const users = require('./users/users.service.js');
const graphql = require('./graphql/graphql.service.js');

const post = require('./post/post.service.js');

const comment = require('./comment/comment.service.js');

module.exports = function() {
  const app = this;

  // Has to be last
  app.configure(graphql);
  app.configure(users);
  app.configure(post);
  app.configure(comment);
};
