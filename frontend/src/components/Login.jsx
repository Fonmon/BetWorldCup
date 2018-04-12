import React from 'react'
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'

const Login = () => (
    <div className='login-form'>
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
                height: 100%;
            }
        `}</style>
        <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Nombre de usuario'
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Contraseña'
                            type='password'
                        />
                        <Button color='red' fluid size='large'>Ingresar</Button>
                    </Segment>
                </Form>
                <Message>
                    ¿No tienes cuenta aún? <a href='/signup'>Regístrate</a>
                </Message>
            </Grid.Column>
        </Grid>
    </div>
)

export default Login;
