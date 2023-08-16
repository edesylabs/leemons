const randomColor = require('randomcolor');

const { update } = require('../../calendar/update');

function onAcademicPortfolioUpdateClass({
  // data, // old unused param
  class: {
    id,
    color,
    groups,
    subject: { name, icon, internalId },
  },
  ctx,
}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        name: `${name}${
          groups?.abbreviation && groups.abbreviation !== '-auto-'
            ? ` (${groups.abbreviation})`
            : ''
        }`,
        section: ctx.prefixPN('classes'),
        bgColor: color || randomColor({ luminosity: 'light' }),
        metadata: { internalId },
      };

      if (icon) {
        config.icon = await ctx.tx.call('leebrary.assets.getCoverUrl', icon.id);
      }

      await update({ key: ctx.prefixPN(`class.${id}`), config, ctx });

      resolve();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      reject(e);
    }
  });
}

module.exports = { onAcademicPortfolioUpdateClass };
