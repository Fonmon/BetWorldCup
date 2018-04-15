import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

import Utils from '../../utils/Utils';

const FixedMenu = () => (
    <div>
        <Menu fixed='top' inverted color="blue">
            <Container>
                <Menu.Item active={window.location.pathname === '/home'} as='a' href='/home'>Inicio</Menu.Item>
                <Menu.Item active={window.location.pathname === '/points'} as='a' href='/points'>Mis puntos</Menu.Item>
                <Menu.Item active={window.location.pathname === '/ranking'} as='a' href='/ranking'>Ranking</Menu.Item>
                {Utils.isAuthorized() &&
                    <Menu.Item active={window.location.pathname === '/results'} as='a' href='/results'>Reales</Menu.Item>
                }
                <Menu.Item position='right' onClick={() => Utils.signOut()}
                    as='a'>Cerrar sesión</Menu.Item>
            </Container>
        </Menu>
    </div>
)

export default FixedMenu;