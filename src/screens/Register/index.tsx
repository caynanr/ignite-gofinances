import React, { useState } from "react";

import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypebutton } from "../../components/Forms/TransactionTypeButton";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles'

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    function handleTranscationTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input placeholder="Nome" />
                    <Input placeholder="Preço" />
                    <TransactionsTypes>
                        <TransactionTypebutton
                            type="up"
                            title="Income"
                            onPress={() => handleTranscationTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypebutton
                            type="down"
                            title="Outcome"
                            onPress={() => handleTranscationTypeSelect('down')}
                            isActive={transactionType === 'down'}

                        />
                    </TransactionsTypes>
                </Fields>
                <Button title="Enviar" />
            </Form>
        </Container>
    )
}