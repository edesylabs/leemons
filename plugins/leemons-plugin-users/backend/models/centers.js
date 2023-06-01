const { mongoose, newModel } = require('leemons-mongodb');

const schema = new mongoose.Schema({
  deploymentID: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  locale: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  uri: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
  },
  firstDayOfWeek: {
    type: Number,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  street: {
    type: String,
  },
  phone: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
});

schema.index({ deploymentID: 1, name: 1 }, { unique: true });
schema.index({ deploymentID: 1, uri: 1 }, { unique: true });

const centersModel = newModel(mongoose.connection, 'users_Centers', schema);

module.exports = { centersModel };
