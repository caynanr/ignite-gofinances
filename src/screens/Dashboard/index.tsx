import React, { useEffect, useState } from "react";
import { HighlightCard } from "../../components/HighlightCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Userwrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from "./styles";

export interface DatalistProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const [data, setData] = useState<DatalistProps[]>([])

    async function loadTransactions() {
        const datakey = '@gofinances:trasactions';
        const response = await AsyncStorage.getItem(datakey);
        const transactions = response ? JSON.parse(response) : []

        console.log(transactions)

        const transactionsFormatted: DatalistProps[] = transactions.map((item: DatalistProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date: item.date
            }
        });

        setData(transactionsFormatted)
    }

    useEffect(() => {
        loadTransactions()
    }, [])

    return (
        <Container>
            <Header>
                <Userwrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/7688797?v=4' }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Caynan</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => { }}>
                        <Icon name='power' />
                    </LogoutButton>
                </Userwrapper>
            </Header>
            <HighlightCards>
                <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril" />
                <HighlightCard type="down" title="Saídas" amount="- R$ 5.400,00" lastTransaction="Última saída dia 3 de abril" />
                <HighlightCard type="total" title="Total" amount="R$ 5.400,00" lastTransaction="1 à 13 de abril" />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>

        </Container >
    )
}

