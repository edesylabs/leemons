/* eslint-disable no-param-reassign */
import { useMemo, useState } from 'react';

import { ContextContainer, InputWrapper } from '@bubbles-ui/components';
import { TagsAutocomplete, unflatten, useRequestErrorMessage } from '@common';
import { addErrorAlert, addSuccessAlert } from '@layout/alert';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import prefixPN from '../../helpers/prefixPN';
import { prepareAsset } from '../../helpers/prepareAsset';

// eslint-disable-next-line import/no-cycle
import { LibraryDrawerForm } from '../LibraryForm/LibraryDrawerForm';
import { UploadingFileModal } from '../UploadingFileModal';

import uploadFileAsMultipart from '@leebrary/helpers/uploadFileAsMultipart';
import { getAssetRequest, newAssetRequest, updateAssetRequest } from '@leebrary/request';

const DrawerBasicData = ({
  file,
  advancedConfig,
  asset: assetProp,
  categoryId,
  editing,
  onSave = () => {},
  onNext = () => {},
  ...props
}) => {
  const [t, translations] = useTranslateLoader(prefixPN('assetSetup'));
  const [loading, setLoading] = useState(false);
  const [uploadingFileInfo, setUploadingFileInfo] = useState(null);
  const [tags, setTags] = useState(assetProp?.tags || []);
  const [, , , getErrorMessage] = useRequestErrorMessage();

  // ··············································································
  // LABELS & STATICS

  const formLabels = useMemo(() => {
    if (!isEmpty(translations)) {
      const items = unflatten(translations.items);
      const data = items.leebrary.assetSetup.basicData;
      data.labels.title = editing ? data.header.titleEdit : data.header.titleNew;
      data.labels.submitForm = editing ? data.labels.submitChanges : data.labels.submitForm;
      return data;
    }
    return {};
  }, [translations]);

  const preparedAsset = useMemo(() => {
    if (assetProp) {
      return prepareAsset(assetProp);
    }
    return {};
  }, [assetProp]);

  // ··············································································
  // HANDLERS

  const handleOnTagsChange = (val) => {
    setTags(val);
  };

  const handleOnSubmit = async (data) => {
    try {
      data.file = await uploadFileAsMultipart(data.file, {
        onProgress: (info) => {
          setUploadingFileInfo(info);
        },
      });
      setUploadingFileInfo(null);

      let { cover } = data;
      if (cover === preparedAsset.cover) {
        cover = assetProp.cover;
      }

      const requestMethod = editing ? updateAssetRequest : newAssetRequest;

      setLoading(true);

      try {
        const { asset } = await requestMethod({ ...data, cover, tags }, categoryId, 'media-files');
        const response = await getAssetRequest(asset.id);
        onSave(prepareAsset(response.asset));
        setLoading(false);
        addSuccessAlert(
          editing ? t('basicData.labels.updatedSuccess') : t('basicData.labels.createdSuccess')
        );
        onNext();
      } catch (err) {
        setLoading(false);
        addErrorAlert(getErrorMessage(err));
      }
    } catch (e) {
      setUploadingFileInfo(null);
    }
  };

  // ··············································································
  // RENDER

  return (
    <>
      <LibraryDrawerForm
        {...props}
        {...formLabels}
        advancedConfig={advancedConfig}
        loading={loading}
        asset={{ ...assetProp, file, cover: preparedAsset.cover }}
        onSubmit={handleOnSubmit}
      >
        <ContextContainer spacing={2}>
          <InputWrapper label={t('basicData.labels.tags')}>
            <TagsAutocomplete
              pluginName="leebrary"
              type={prefixPN('')}
              labels={{ addButton: formLabels?.labels?.addTag }}
              placeholder={formLabels?.placeholders?.tagsInput}
              value={tags}
              onChange={handleOnTagsChange}
            />
          </InputWrapper>
        </ContextContainer>
      </LibraryDrawerForm>
      <UploadingFileModal opened={uploadingFileInfo !== null} info={uploadingFileInfo} />
    </>
  );
};

DrawerBasicData.propTypes = {
  categoryId: PropTypes.string.isRequired,
  file: PropTypes.instanceOf(Object),
  editing: PropTypes.bool,
  asset: PropTypes.instanceOf(Object),
  onSave: PropTypes.func,
  onNext: PropTypes.func,
  advancedConfig: PropTypes.instanceOf(Object),
};

export { DrawerBasicData };
export default DrawerBasicData;
