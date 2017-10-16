// Initializes the `comment` service on path `/comment`
const createService = require('./comment.class.js');
const hooks = require('./comment.hooks');
const filters = require('./comment.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'comment',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/comment', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('comment');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
