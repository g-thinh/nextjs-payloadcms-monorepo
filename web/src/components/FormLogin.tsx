import { useAuth } from '@/contexts/AuthContext';
import { styled } from '@/styles/stitches.config';
import React, { useRef, useState } from 'react';

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  border: '1px solid black',
  borderRadius: '$md',
  width: 'fit-content',
  maxWidth: '$md',
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
  width: '$sm',
});

const TextError = styled('p', {
  fontSize: '$sm',
  color: 'red',
});

const ButtonSubmit = styled('button', {
  px: '$4',
  py: '$2',
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

export function FormLogin() {
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (emailRef.current && passwordRef.current) {
        await login(emailRef.current.value, passwordRef.current.value);
        setError('');
      }
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p>Enter your email and password to login to PayloadCMS</p>
      <Row>
        <Label>Email</Label>
        <Input type="email" placeholder="thinh@example.com" required ref={emailRef} />
      </Row>
      <Row>
        <Label>Password</Label>
        <Input type="password" placeholder="secr3t_passw0rd" required ref={passwordRef} />
      </Row>
      <Row>{error && <TextError>{error}</TextError>}</Row>
      <div>
        <ButtonSubmit type="submit">Login</ButtonSubmit>
      </div>
    </Form>
  );
}
