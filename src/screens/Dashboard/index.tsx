import React from "react";
import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Userwrapper,
    Icon
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
        </Container>
    )
}

