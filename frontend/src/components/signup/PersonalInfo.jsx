import React, {Component} from 'react';
import { Form, Grid, Message, Segment } from 'semantic-ui-react';

class PersonalInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            names: '',
            lastNames: '',
            username: '',
            password: '',
            authCode: ''
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        // TODO: here some validations
        this.props.onNext(this.state);
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
                            <Form size='large' onSubmit={this.handleSubmit}>
                                <Form.Input fluid name="names"
                                    value={names}
                                    placeholder='Nombres'
                                    onChange={this.handleChange}
                                />
                                <Form.Input value={lastNames}
                                    fluid name="lastNames"
                                    placeholder='Apellidos'
                                    onChange={this.handleChange}
                                />
                                <Form.Input value={username}
                                    fluid name="username"
                                    placeholder='Nombre de usuario'
                                    onChange={this.handleChange}
                                />
                                <Message
                                    error
                                    header='Action Forbidden'
                                    content='You can only sign up for an account once with a given e-mail address.'
                                />
                                <Form.Input value={password}
                                    fluid name="password"
                                    placeholder='Contraseña'
                                    type='password'
                                    onChange={this.handleChange}
                                />
                                <Form.Input value={authCode}
                                    fluid name="authCode"
                                    placeholder='Código de autorización'
                                    onChange={this.handleChange}
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
