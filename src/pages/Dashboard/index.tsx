import { useEffect, useState } from 'react';
import { DashboardBackground, BodyContainer, InlineContainer, InlineTitle } from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

import Statement from './Statement';

import useAuth from '../../hooks/useAuth';

import { pay, request } from '../../services/resources/pix'

const Dashboard = () => {

    const { user, getCurrentUser } = useAuth();

    const [key, setKey] = useState('');
    const [generatedKey, setGeneratedKey] = useState('');
    const [newValue, setNewValue] = useState('');

    const handleNewPayment = async () => {
        const { data } = await request(Number(newValue));

        if (data.copyPasteKey) {
            setGeneratedKey(data.copyPasteKey);
        }
    }

    const handlePayPix = async () => {
        try {
            const { data } = await pay(key);

            if (data.mag) {
                alert(data.mag);
                return
            }

            alert('Nao foi possivel efetuar o pagamento!');

        } catch (err) {
            alert("Não é possivel receber Pix do mesmo usuário!");
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    if (!user) {
        return null
    }



    return (
        <DashboardBackground>
            <Header />
            <BodyContainer>
                <div>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Saldo Atual</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <h3 className="wallet">
                                {user.wallet.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                            </h3>
                        </InlineContainer>
                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Receber PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <Input style={{ flex: 1 }} value={newValue} onChange={e => setNewValue(e.target.value)} />
                            <Button onClick={handleNewPayment}>Gerar código</Button>
                        </InlineContainer>

                        {generatedKey && (
                            <>
                                <p className="primary-color">Pix copia e cola:</p>
                                <p className="primary-color">{generatedKey}</p>
                            </>
                        )}

                    </Card>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Pagar PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                            <Input style={{ flex: 1 }} value={key} onChange={e => setKey(e.target.value)} placeholder="Insira a chave" />
                            <Button onClick={handlePayPix}>Pagar PIX</Button>
                        </InlineContainer>
                    </Card>
                </div>
                <div>
                    <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Extrato da conta</h2>
                        </InlineTitle>
                        <Statement />
                    </Card>
                </div>
            </BodyContainer>
        </DashboardBackground>
    )
}

export default Dashboard