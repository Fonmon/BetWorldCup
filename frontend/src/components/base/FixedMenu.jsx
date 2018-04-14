import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

import Utils from '../../utils/Utils';

const FixedMenu = () => (
    <div>
        <Menu fixed='top' inverted color="blue">
            <Container>
                <Menu.Item as='a' href='/home'>Inicio</Menu.Item>
                <Menu.Item as='a' href='/points'>Mis puntos</Menu.Item>
                <Menu.Item as='a'>Ranking</Menu.Item>
                <Menu.Item position='right' onClick={() => Utils.signOut()}
                    as='a'>Cerrar sesión</Menu.Item>
            </Container>
        </Menu>
    </div>
)

export default FixedMenu;