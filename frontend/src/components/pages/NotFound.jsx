import React from 'react';
import {Container, Message} from 'semantic-ui-react';

import FixedMenu from '../base/FixedMenu';
import Utils from '../../utils/Utils';

const NotFound = () => {
    return (
        <div>
            {Utils.isAuthenticated() &&
                <FixedMenu />
            }
            <Container style={{marginTop:'7em'}}>
                <Message icon='announcement'
                    header='Página no encontrada'
                    content='Hola, la página a la que intentas acceder no existe actualmente.' />
            </Container>
        </div>
    )
}

export default NotFound
