/* eslint-disable no-console */
/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

const {
  LeemonsMiddlewareAuthenticated,
  LeemonsMiddlewareNecessaryPermits,
} = require('leemons-middlewares');

const { updateCycle } = require('../../core/cycle');

/** @type {ServiceSchema} */
module.exports = {
  putCycleRest: {
    rest: {
      path: '/cycle',
      method: 'PUT',
    },
    middlewares: [
      LeemonsMiddlewareAuthenticated(),
      LeemonsMiddlewareNecessaryPermits({
        'permissions.programs': {
          actions: ['create', 'update'],
        },
      }),
    ],
    async handler(ctx) {
      const cycle = await updateCycle({ data: ctx.params, ctx });
      return { status: 200, cycle };
    },
  },
};
