import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native'

import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/InputForm";
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
import moment from "moment";

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor númerico').positive('O Valor não pode ser negativo').required('Informe um valor')
})

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm(
        { resolver: yupResolver(schema) }
    )

    function handleTranscationTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    async function handleRegister(form: FormData) {
        if (!transactionType)
            return Alert.alert('Selecione o tipo de transação')

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria')

        const newTrasaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: moment().format("DD/MM/YYYY")
        }

        try {
            const datakey = '@gofinances:trasactions';
            const data = await AsyncStorage.getItem(datakey)
            const currentData = data ? JSON.parse(data) : []
            const dataFormatted = [...currentData, newTrasaction]

            await AsyncStorage.setItem(datakey, JSON.stringify(dataFormatted));

            reset()
            setTransactionType('')
            setCategory({
                key: 'category',
                name: 'Categoria'
            })


            navigation.navigate("Listagem")

        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível salvar')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="words"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
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
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)} />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}