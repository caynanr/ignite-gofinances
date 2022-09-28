import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
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
    const data: DatalistProps[] = [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento de site",
            amount: "R$ 12.0000,00",
            category: { name: 'Vendas', icon: 'dollar-sign' },
            date: "12/04/2022"
        },
        {
            id: '2',
            type: 'negative',
            title: "Pizza",
            amount: "R$ 12.0000,00",
            category: { name: 'Alimentação', icon: 'coffee' },
            date: "12/04/2022"
        },
        {
            id: '3',
            type: 'positive',
            title: "Trabalho",
            amount: "R$ 12.0000,00",
            category: { name: 'Vendas', icon: 'shopping-bag' },
            date: "12/04/2022"
        }
    ]
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

