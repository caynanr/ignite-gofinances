import React, { useState } from "react";
import { Modal } from 'react-native'

import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypebutton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

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
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })

    function handleTranscationTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
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
                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>
                <Button title="Enviar" />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    )
}