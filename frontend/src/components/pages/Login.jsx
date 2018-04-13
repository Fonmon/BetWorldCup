import React, {Component} from 'react';
import { Form, Grid, Message, Segment } from 'semantic-ui-react';

import Utils, {TOKEN_KEY} from '../../utils/Utils';

class Login extends Component{
    
    constructor(){
        super();
        this.state = {
            formError: false,
            username:'',
            password:''
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        let scope = this;
        let username = this.state.username.toLowerCase();
        this.setState({formError:false});
        Utils.authenticate(username,this.state.password)
            .then(function(response){
                localStorage.setItem(TOKEN_KEY,response.data.token);
                Utils.redirectTo('/home');
            }).catch(function(error){
                if(!error.response)
                    console.log('error de conexión');
                else if(error.response.status === 400){
                    scope.setState({formError:true});
                }
            });
    }

    render(){
        return (
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
                        <Form size='large' onSubmit={this.handleSubmit} error={this.state.formError}>
                            <Segment stacked>
                                <Message error
                                    header='Error'
                                    content='Usuario o contraseña inválidos'
                                />
                                <Form.Input onChange={this.handleChange}
                                    fluid name="username"
                                    value={this.state.username}
                                    required
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Nombre de usuario'
                                />
                                <Form.Input onChange={this.handleChange}
                                    fluid name="password"
                                    value={this.state.password}
                                    required
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Contraseña'
                                    type='password'
                                />
                                <Form.Button color='red' fluid size='large'>Ingresar</Form.Button>
                            </Segment>
                        </Form>
                        <Message>
                            ¿No tienes cuenta aún? <a href='/signup'>Regístrate</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;
