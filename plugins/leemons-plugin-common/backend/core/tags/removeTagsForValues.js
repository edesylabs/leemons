const _ = require('lodash');
const { LeemonsError } = require('leemons-error');
const { validateTypePrefix } = require('../../validation/validate');

async function removeTagsForValues({ type, tags, values, ctx }) {
  validateTypePrefix(type, this.calledFrom);
  const _tags = _.isArray(tags) ? tags : [tags];
  let _values = _.isArray(values) ? values : [values];
  _values = _.map(_values, (value) => JSON.stringify(value));
  // Check if tag not empty
  if (_tags.length === 0) {
    throw new LeemonsError(ctx, { message: `Tags cannot be empty.` });
  }
  // Check if value not empty
  if (_values.length === 0) {
    throw new LeemonsError(ctx, { message: `Values cannot be empty.` });
  }

  return ctx.tx.db.Tags.deleteMany({ type, tag: _tags, value: _values });
}

module.exports = { removeTagsForValues };
