import React, {useCallback, useRef} from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock} from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup'
import getValidationErrors from '../../utlis/getValidationErros';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import { useToast } from '../../hooks/toast';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  console.log(formRef);
  const {addToast} = useToast();

 const handleSubmit = useCallback(async(data: object) => {
  formRef.current?.setErrors({});
    try{
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minimo 6 dígitos'), 
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    }catch(err){
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
    }
    addToast({
      type: 'error',
      title: 'Erro no cadastro',
      description: 'Ocorreu um erro ao fazer cadastro, cheque as credenciais.',
    });
  }, []);

  return (
    <Container>
    <Background />
   <Content>
     <img src={logoImg} alt="GoBarber"/>

     <Form ref={formRef} onSubmit={handleSubmit}>
       <h1>Faça seu Cadastro</h1>

       <Input name="name" icon={FiUser} placeholder="Nome"/>
       <Input name="email" icon={FiMail} placeholder="E-mail"/>
       <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

       <Button type="submit">Cadastrar</Button>
     </Form>

     <a href="login">
       <FiArrowLeft />
       Voltar para logon
       </a>
       </Content>

 </Container>
  );
};
export default SignUp;
