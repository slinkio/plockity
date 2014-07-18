var authorizeHandler = require('../handlers/authorize');

module.exports = function(app) {
  var authorizeRouter = express.Router();

  authorizeRouter.get('/', checkAuthorization, sendGenerateToken);
  
  app.use('/api/authorize', authorizeRouter);
};