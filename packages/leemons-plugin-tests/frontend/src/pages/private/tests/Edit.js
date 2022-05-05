import React from 'react';
import {
  ContextContainer,
  PageContainer,
  useDebouncedCallback,
  VerticalStepperContainer,
} from '@bubbles-ui/components';
import { AdminPageHeader } from '@bubbles-ui/leemons';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import prefixPN from '@tests/helpers/prefixPN';
import { useStore } from '@common';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addErrorAlert, addSuccessAlert } from '@layout/alert';
import { map } from 'lodash';
import { PluginTestIcon } from '@bubbles-ui/icons/outline';
import DetailConfig from './components/DetailConfig';
import { getTestRequest, saveTestRequest } from '../../../request';
import DetailBasic from '../questions-banks/components/DetailBasic';
import DetailQuestionsBanks from './components/DetailQuestionsBanks';
import DetailQuestions from './components/DetailQuestions';
import DetailContent from './components/DetailContent';
import DetailInstructions from './components/DetailInstructions';

export default function Edit() {
  const [t] = useTranslateLoader(prefixPN('testsEdit'));
  const debounce = useDebouncedCallback(1000);

  // ----------------------------------------------------------------------
  // SETTINGS
  const [store, render] = useStore({
    loading: true,
    isNew: false,
    currentStep: 0,
  });

  const history = useHistory();
  const params = useParams();

  const form = useForm();
  const formValues = form.watch();

  async function saveAsDraft() {
    try {
      store.saving = 'edit';
      render();
      await saveTestRequest({ ...formValues, published: false });
      addSuccessAlert(t('savedAsDraft'));
      history.push('/private/tests');
    } catch (error) {
      addErrorAlert(error);
    }
    store.saving = null;
    render();
  }

  async function saveAsPublish() {
    try {
      store.saving = 'duplicate';
      render();
      await saveTestRequest({ ...formValues, published: true });
      addSuccessAlert(t('published'));
      history.push('/private/tests');
    } catch (error) {
      addErrorAlert(error);
    }
    store.saving = null;
    render();
  }

  async function init() {
    try {
      store.isNew = params.id === 'new';
      render();
      if (!store.isNew) {
        const {
          // eslint-disable-next-line camelcase
          test: { deleted, deleted_at, created_at, updated_at, ...props },
        } = await getTestRequest(params.id);
        form.reset({ ...props, questions: map(props.questions, 'id') });
      }
    } catch (error) {
      addErrorAlert(error);
    }
  }

  function setStep(step) {
    store.currentStep = step;
    render();
  }

  React.useEffect(() => {
    if (params?.id) init();
  }, [params]);

  let component = null;
  const steps = [
    { label: t('basic'), status: 'OK' },
    { label: t('config'), status: 'OK' },
  ];

  form.register('name', { required: t('nameRequired') });
  form.register('type', { required: t('typeRequired') });

  if (formValues.type === 'learn') {
    form.register('questionBank', { required: t('questionBankRequired') });
    form.register('questions', {
      required: t('questionsRequired'),
      min: {
        value: 1,
        message: t('questionsRequired'),
      },
    });
    form.register('statement', { required: t('statementRequired') });
    steps.push({ label: t('questionsBank'), status: 'OK' });
    steps.push({ label: t('questions'), status: 'OK' });
    steps.push({ label: t('contentLabel'), status: 'OK' });
    steps.push({ label: t('instructions'), status: 'OK' });
    if (store.currentStep === 2)
      component = <DetailQuestionsBanks t={t} form={form} onNext={() => setStep(3)} />;
    if (store.currentStep === 3)
      component = <DetailQuestions t={t} form={form} onNext={() => setStep(4)} />;
    if (store.currentStep === 4)
      component = <DetailContent t={t} form={form} onNext={() => setStep(5)} />;
    if (store.currentStep === 5)
      component = <DetailInstructions t={t} form={form} onNext={() => setStep(6)} />;
  }

  React.useEffect(() => {
    const subscription = form.watch(() => {
      debounce(async () => {
        store.isValid = await form.trigger();
        render();
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ContextContainer fullHeight>
      <AdminPageHeader
        values={{
          // eslint-disable-next-line no-nested-ternary
          title: formValues.name
            ? formValues.name
            : store.isNew
            ? t('pageTitleNew')
            : t('pageTitle', { name: formValues.name }),
        }}
        buttons={{
          duplicate: formValues.name && !formValues.published ? t('saveDraft') : undefined,
          edit: store.isValid ? t('publish') : undefined,
        }}
        icon={<PluginTestIcon />}
        variant="teacher"
        onEdit={() => saveAsPublish()}
        onDuplicate={() => saveAsDraft()}
        loading={store.saving}
      />

      <PageContainer noFlex>
        <VerticalStepperContainer currentStep={store.currentStep} data={steps}>
          {store.currentStep === 0 && <DetailBasic t={t} form={form} onNext={() => setStep(1)} />}
          {store.currentStep === 1 && <DetailConfig t={t} form={form} onNext={() => setStep(2)} />}
          {component}
        </VerticalStepperContainer>
      </PageContainer>
    </ContextContainer>
  );
}
