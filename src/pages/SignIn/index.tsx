import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wrapper, Background, InputContainer, ButtonContainer } from './styles';

import background from '../../assets/images/background-login.jpg';
import logoInter from '../../assets/images/Inter-orange.png';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

import useAuth from '../../hooks/useAuth';

const SignIn = () => {
    const navigate = useNavigate();
    const { userSignIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleToSingIn = async () => {
        const data = {
            email,
            password
        }

        const response = await userSignIn(data)

        if (response.id) {
            navigate('/dashboard');
            return;
        } else {
            alert('Usuário ou senha incorretos!');
        }

    }

    return (
        <Wrapper>
            <Background image={background} />
            <Card width="403px" height="auto">
                <img src={logoInter} width={172} height={61} alt="logo inter" />

                <InputContainer>
                    <Input
                        placeholder="EMAIL"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder="SENHA"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </InputContainer>

                <ButtonContainer>
                    <Button type="button" onClick={handleToSingIn}>ENTRAR</Button>
                    <p>Ainda não tem cadastro? <Link to="/signup">Cadastre-se Já</Link></p>
                </ButtonContainer>
            </Card>
        </Wrapper>
    )
}

export default SignIn;
