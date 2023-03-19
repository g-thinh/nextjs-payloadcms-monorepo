import { useAuth } from '@/contexts/AuthContext';
import { Trans, useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { ButtonSubmit, Form, Input, Label, Row, TextError } from './Form';
import { LoadingDots } from './LoadingDots';

type FormLoginData = {
  email: string;
  password: string;
};

export function FormLogin() {
  const { login } = useAuth();
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormLoginData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const { t } = useTranslation(['common']);

  const handleOnSubmit = handleSubmit(async (form) => {
    try {
      await login(form.email, form.password);
      clearErrors();
    } catch (e) {
      const error = e as Error;
      setError('root', { message: error.message });
    }
  });

  return (
    <Form onSubmit={handleOnSubmit}>
      <h2>{t('common:form-login.title')}</h2>
      <p>{t('common:form-login.text')}</p>
      <Row>
        <Label>{t('common:form-login.email')}</Label>
        <Input type="email" placeholder="thinh@example.com" {...register('email', { required: true })} />
        {errors.email?.type === 'required' && <TextError>{t('common:form-login.errors.required-email')}</TextError>}
      </Row>
      <Row>
        <Label>{t('common:form-login.password')}</Label>
        <Input type="password" placeholder="secr3t_passw0rd" {...register('password', { required: true })} />
        {errors.password?.type === 'required' && (
          <TextError>{t('common:form-login.errors.required-password')}</TextError>
        )}
      </Row>
      <Row>{errors.root && <TextError>{errors.root.message}</TextError>}</Row>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ButtonSubmit type="submit">{isSubmitting ? <LoadingDots /> : t('common:form-login.submit')}</ButtonSubmit>
      </div>
      <p>
        <Trans i18nKey={'common:form-login.signup-cta'} t={t} components={[<NextLink href="/signup" />]}></Trans>
      </p>
    </Form>
  );
}
