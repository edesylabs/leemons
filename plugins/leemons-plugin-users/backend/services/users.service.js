/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

const _ = require('lodash');
const { LeemonsCacheMixin } = require('leemons-cache');
const { LeemonsMongoDBMixin, mongoose } = require('leemons-mongodb');
const { LeemonsDeploymentManagerMixin } = require('leemons-deployment-manager');
const { LeemonsMiddlewaresMixin } = require('leemons-middlewares');
const { getServiceModels } = require('../models');
const { getUserAgentCenter } = require('../core/user-agents/getUserAgentCenter');
const restActions = require('./rest/users.rest');
const { updateEmail } = require('../core/users/updateEmail');
const { updatePassword } = require('../core/users/updatePassword');
const { getUserAgentsInfo } = require('../core/user-agents');
const {
  add,
  addBulk,
  detail,
  isSuperAdmin,
  userSessionCheckUserAgentDatasets,
  centers,
} = require('../core/users');

/*
const {
  detail,
  isSuperAdmin,
  userSessionCheckUserAgentDatasets,
  centers,
} = require('../core/users');
*/

/** @type {ServiceSchema} */
module.exports = {
  name: 'users.users',
  version: 1,
  mixins: [
    LeemonsMiddlewaresMixin(),
    LeemonsCacheMixin(),
    LeemonsMongoDBMixin({
      models: getServiceModels(),
    }),
    LeemonsDeploymentManagerMixin(),
  ],
  actions: {
    ...restActions,

    detail: {
      async handler(ctx) {
        const users = await detail({ ...ctx.params, ctx });
        const response = [];
        _.forEach(
          _.isArray(users) ? users : [users],
          ({ id, email, name, surnames, secondSurname, avatar, locale, createdAt }) => {
            response.push({ id, email, name, surnames, secondSurname, avatar, locale, createdAt });
          }
        );
        return _.isArray(users) ? response : response[0];
      },
    },
    isSuperAdmin: {
      async handler(ctx) {
        return isSuperAdmin({ ...ctx.params, ctx });
      },
    },
    userSessionCheckUserAgentDatasets: {
      async handler(ctx) {
        return userSessionCheckUserAgentDatasets({ ctx });
      },
    },
    getUserCenters: {
      async handler(ctx) {
        return centers({ ...ctx.params, ctx });
      },
    },

    add: {
      async handler(ctx) {
        return add({ ...ctx.params, ctx });
      },
    },
    addBulk: {
      async handler(ctx) {
        return addBulk({ ...ctx.params, ctx });
      },
    },
    updateEmail: {
      async handler(ctx) {
        return updateEmail({ ...ctx.params, ctx });
      },
    },
    updatePassword: {
      async handler(ctx) {
        return updatePassword({ ...ctx.params, ctx });
      },
    },
    getUserAgentCenter: {
      async handler(ctx) {
        return getUserAgentCenter({ ...ctx.params, ctx });
      },
    },
    getUserAgentsInfo: {
      async handler(ctx) {
        return getUserAgentsInfo({ ...ctx.params, ctx });
      },
    },
  },

  created() {
    mongoose.connect(process.env.MONGO_URI);
  },
};
