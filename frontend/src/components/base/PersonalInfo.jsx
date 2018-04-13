import React, {Component} from 'react';
import { Form, Grid, Message, Segment } from 'semantic-ui-react';

import Utils from '../../utils/Utils';

class PersonalInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            names: '',
            lastNames: '',
            username: '',
            password: '',
            authCode: '',
            formError:false,
            errorMessage:'',
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        this.setState({formError:false});
        let personalInfo = {
            username: this.state.username,
            authCode: this.state.authCode
        };
        let scope = this;
        Utils.validateSignup(personalInfo)
            .then(function(response){
                personalInfo.names = scope.state.names;
                personalInfo.lastNames = scope.state.lastNames;
                personalInfo.password = scope.state.password;
                scope.props.onNext(personalInfo);
            }).catch(function(error){
                if(!error.response)
                    console.log('Error de conexión');
                else{
                    scope.setState({errorMessage:error.response.data,formError:true});
                }
            });
    }
    
    render(){
        const {names, lastNames, username, password, authCode} = this.state;
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
                        <Segment stacked>
                            <h2>Información personal</h2>
                            <Form size='large' onSubmit={this.handleSubmit} error={this.state.formError}>
                                <Form.Input fluid name="names"
                                    value={names}
                                    required
                                    placeholder='Nombres'
                                    onChange={this.handleChange}
                                />
                                <Form.Input value={lastNames}
                                    fluid name="lastNames"
                                    required
                                    placeholder='Apellidos'
                                    onChange={this.handleChange}
                                />
                                <Form.Input value={username}
                                    fluid name="username"
                                    required
                                    placeholder='Nombre de usuario'
                                    onChange={this.handleChange}
                                />
                                <Form.Input value={password}
                                    fluid name="password"
                                    placeholder='Contraseña'
                                    required
                                    type='password'
                                    onChange={this.handleChange}
                                />
                                <Form.Input value={authCode}
                                    fluid name="authCode"
                                    required
                                    placeholder='Código de autorización'
                                    onChange={this.handleChange}
                                />
                                <Message error
                                    header='Error'
                                    content={this.state.errorMessage}
                                />
                                <Form.Button color='red' fluid size='large'>Siguiente</Form.Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default PersonalInfo;
