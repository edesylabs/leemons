const { mongoose, newModel } = require('leemons-mongodb');

const schema = new mongoose.Schema({
  deploymentID: {
    type: String,
    required: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users_Users',
    required: true,
  },
});

const superAdminUserModel = newModel(mongoose.connection, 'users_SuperAdminUser', schema);

module.exports = { superAdminUserModel };
