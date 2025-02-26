const { groupBy } = require('lodash');
/**
 * Fetches assets with their associated subjects
 * @async
 * @param {Object} params - The params object
 * @param {Array} params.assets - The assets to fetch subjects for
 * @param {Array} params.assetsIds - The IDs of the assets
 * @param {MoleculerContext} params.ctx - The moleculer context
 * @returns {Promise<Array>} - Returns an array of assets with their associated subjects
 */

// TODO: It would be more useful to return the subject, not the relation subject-asset.
// TODO: This will affect every part of the code that uses the return value of 'leebrary.assets.getByIds'
async function getAssetsWithSubjects({ assets, assetsIds, ctx }) {
  const assetsSubjects = await ctx.tx.db.AssetsSubjects.find({ asset: assetsIds }).lean();

  const subjectsByAsset = groupBy(assetsSubjects, 'asset');

  return assets.map((asset) => {
    // eslint-disable-next-line no-param-reassign
    asset.subjects = subjectsByAsset[asset.id];
    return asset;
  });
}
module.exports = { getAssetsWithSubjects };
