import React, {Component} from 'react';
import {Grid, Segment, Message} from 'semantic-ui-react';

import Utils from '../../utils/Utils';
import PersonalInfo from '../base/PersonalInfo';
import PickGroupTeams from '../base/PickGroupTeams';
import PickListTeams from '../base/PickListTeams';
import PodiumTeams from '../base/PodiumTeams';

class SignUp extends Component{

    constructor(){
        super();
        this.state = {
            step: 1,
            round: 32,
            dataSource:[],
            error: false,
            success: false,
            message:'',
            header:''
        }
    }

    onNext(data){
        let step = this.state.step;
        let key = `step_${step}`;
        if(step+1 !== 6){
            if(step >= 2 && step <=3)
                this.cleanData(data);
            this.setState({[key]:data});
            this.setState({step:step+1});

            if(step+1 >= 3){
                this.setState({dataSource:data,round:this.state.round/2});
            }
        }else{
            this.setState({[key]:data},this.onSubmit);
        }
    }

    onSubmit(){
        let finalData = {
            step_1:this.state.step_1,
            step_2:this.state.step_2,
            step_3:this.state.step_3,
            step_4:this.state.step_4,
            step_5:this.state.step_5
        };
        let scope = this;
        Utils.signUp(finalData)
            .then(function(response){
                scope.setState({step:scope.state.step+1},function(){
                    scope.setState({
                        success:true,
                        error: false,
                        header:'Éxito',
                        message:'Registro realizado exitosamente. Será redirigido a la pantalla de inicio para que pueda iniciar sesión.'
                    });
                    setTimeout(()=>Utils.redirectTo('/login'),6000);
                });
            }).catch(function(error){
                if(!error.response)
                    console.log('error de conexión');
                else if(error.response.status === 409){
                    scope.setState({step:scope.state.step+1},function(){
                        scope.setState({
                            success:false,
                            error: true,
                            header:'Error',
                            message: error.response.data
                        });
                    });
                }
            });
    }

    cleanData(listTeams){
        listTeams.forEach(function(team){
            team.active = false;
        })
    }

    render(){
        return (
            <div>
                {this.state.step === 1 &&
                    <PersonalInfo onNext={this.onNext.bind(this)} />}
                {this.state.step === 2 &&
                    <PickGroupTeams onNext={this.onNext.bind(this)} />}
                {this.state.step >= 3 && this.state.step <= 4 &&
                    <PickListTeams onNext={this.onNext.bind(this)}
                        dataSource={this.state.dataSource}
                        round={this.state.round} />}
                {this.state.step === 5 &&
                    <PodiumTeams onNext={this.onNext.bind(this)}
                        dataSource={this.state.dataSource} />}
                {this.state.step === 6 &&
                    <div className='login-form'>
                        <style>{`
                            body > div,
                            body > div > div,
                            body > div > div > div.login-form {
                                height: 100%;
                            }
                        `}</style>
                        <Grid textAlign='center'
                            style={{ height: '100%' }}
                            verticalAlign='middle'
                        >
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Segment>
                                    {this.state.error &&
                                        <Message error
                                            header={this.state.header}
                                            content={this.state.message}
                                        />
                                    }
                                    {this.state.success &&
                                        <Message success
                                            header={this.state.header}
                                            content={this.state.message}
                                        />
                                    }
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </div>
                }
            </div>
        );
    }
}

export default SignUp;