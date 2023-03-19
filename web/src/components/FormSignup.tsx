import { useAuth, CreateUserDto } from '@/contexts/AuthContext';
import { Trans, useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { ButtonSubmit, Form, Input, Label, Row, TextError } from './Form';
import { LoadingDots } from './LoadingDots';

type FormSignupData = CreateUserDto & {
  confirmPassword: string;
};

export function FormSignup() {
  const { create } = useAuth();
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormSignupData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const { t } = useTranslation(['common']);

  const handleOnSubmit = handleSubmit(async (form) => {
    try {
      await create(form);
      clearErrors();
    } catch (e) {
      const error = e as Error;
      setError('root', { message: error.message });
    }
  });

  const validatePassword = (value: string) => {
    if (watch('password') !== value) {
      return t('common:form-signup.errors.validate-password');
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <h2>{t('form-signup.title')}</h2>
      <p>{t('common:form-signup.text')}</p>
      <Row>
        <Label>{t('common:form-signup.name')}</Label>
        <Input type="text" placeholder="e.g. John Doe" {...register('name', { required: true })} />
        {errors.name?.type === 'required' && <TextError>{t('common:form-signup.errors.required-name')}</TextError>}
      </Row>
      <Row>
        <Label>{t('common:form-signup.email')}</Label>
        <Input type="email" placeholder="name@example.com" {...register('email', { required: true })} />
        {errors.email?.type === 'required' && <TextError>{t('common:form-signup.errors.required-email')}</TextError>}
      </Row>
      <Row>
        <Label>{t('common:form-signup.password')}</Label>
        <Input type="password" placeholder="secr3t_passw0rd" {...register('password', { required: true })} />
        {errors.password?.type === 'required' && (
          <TextError>{t('common:form-signup.errors.required-password')}</TextError>
        )}
      </Row>
      <Row>
        <Label>{t('common:form-signup.confirm-password')}</Label>
        <Input
          type="password"
          placeholder="secr3t_passw0rd"
          {...register('confirmPassword', { required: true, validate: validatePassword })}
        />
        {errors.password?.type === 'required' && (
          <TextError>{t('common:form-signup.errors.required-confirm-password')}</TextError>
        )}
        {errors.confirmPassword?.type === 'validate' && <TextError>{errors.confirmPassword.message}</TextError>}
      </Row>
      <Row>{errors.root && <TextError>{errors.root.message}</TextError>}</Row>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ButtonSubmit type="submit">{isSubmitting ? <LoadingDots /> : t('common:form-signup.submit')}</ButtonSubmit>
      </div>
      <p>
        <Trans i18nKey={'common:form-signup.login-cta'} t={t} components={[<NextLink href="/login" />]}></Trans>
      </p>
    </Form>
  );
}
