import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
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
    HighlightCards
} from "./styles";


export function Dashboard() {
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
                    <Icon name='power' />
                </Userwrapper>
            </Header>
            <HighlightCards>
                <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril" />
                <HighlightCard type="down" title="Saídas" amount="- R$ 5.400,00" lastTransaction="Última saída dia 3 de abril" />
                <HighlightCard type="total" title="Total" amount="R$ 5.400,00" lastTransaction="1 à 13 de abril" />
            </HighlightCards>
        </Container >
    )
}

