import React from 'react'
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'

const SignUp = () => (
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
                            placeholder='Nombres'
                        />
                        <Form.Input
                            fluid
                            placeholder='Apellidos'
                        />
                        <Form.Input
                            fluid
                            placeholder='Nombre de usuario'
                        />
                        <Message
                            error
                            header='Action Forbidden'
                            content='You can only sign up for an account once with a given e-mail address.'
                        />
                        <Form.Input
                            fluid
                            placeholder='Contraseña'
                            type='password'
                        />
                        <Form.Input
                            fluid
                            placeholder='Código de autorización'
                        />
                        <Button href="/signup/2" color='red' fluid size='large'>Siguiente</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    </div>
);

export default SignUp;
