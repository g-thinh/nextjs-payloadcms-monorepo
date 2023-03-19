import { useAuth } from '@/contexts/AuthContext';
import { styled } from '@/styles/stitches.config';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { LoadingDots } from './LoadingDots';

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  border: '1px solid black',
  borderRadius: '$md',
  width: 'fit-content',
  maxWidth: 'min($md, 100%)',
  mx: 'auto',
  my: '$10',
  px: '$4',
  py: '$6',

  '> h2': {
    fontSize: '$lg',
    fontWeight: 'bold',
  },
  '> p': {
    fontSize: '$sm',
  },
});

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

const Label = styled('label', {
  fontSize: '$xs',
  fontWeight: '$semibold',
  textTransform: 'uppercase',
});
const Input = styled('input', {
  padding: '$2',
  width: 'min($sm, 100%)',
});

const TextError = styled('p', {
  fontSize: '$sm',
  color: 'red',
});

const ButtonSubmit = styled('button', {
  px: '$4',
  height: '2.5em',
  backgroundColor: 'hsl(0,0%, 0%)',
  color: 'white',
  border: '1px solid black',
  borderRadius: '$md',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'hsl(0,0%,20%)',
  },

  '&:active': {
    backgroundColor: 'hsl(0,0%,10%)',
  },
});

type FormData = {
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
  } = useForm<FormData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
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
        {errors.email?.type === 'required' && <TextError>Please enter your email.</TextError>}
      </Row>
      <Row>
        <Label>{t('common:form-login.password')}</Label>
        <Input type="password" placeholder="secr3t_passw0rd" {...register('password', { required: true })} />
        {errors.password?.type === 'required' && <TextError>Please enter your password.</TextError>}
      </Row>
      <Row>{errors.root && <TextError>{errors.root.message}</TextError>}</Row>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ButtonSubmit type="submit">{isSubmitting ? <LoadingDots /> : t('common:form-login.submit')}</ButtonSubmit>
      </div>
    </Form>
  );
}
