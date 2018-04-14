import React, {Component} from 'react';
import {Segment, Grid, Image, Header, Input, Button, Icon} from 'semantic-ui-react';

import Utils from '../../utils/Utils';

// match_result:{
//     result_id: null,
//     match_id:null,
//     team_A_id: 1,
//     team_A_name: 'República de corea',
//     team_A_shortcut: 'COL',
//     team_B_id: 2,
//     team_B_name: 'Argentina',
//     team_B_shortcut: 'ARG',
//     team_A_score:'',
//     team_B_score:'',
//     real: false,
//     date: '18 mar 20:23',
//     disabled: false,
//     points: 0
// }

class MatchComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            match_result:props.match,
            real:props.real
        }
    }

    onSave(){
        let scope = this;
        Utils.saveMatchResults(this.state.match_result,this.state.real)
            .then(function(response){
                if(response.status === 200){
                    let result_id = response.data.id,
                        score_A = response.data.score_A,
                        score_B = response.data.score_B;
                    scope.setState({
                        match_result:{
                            ...scope.state.match_result,
                            result_id: result_id,
                            team_A_score : score_A,
                            team_B_score : score_B
                        }
                    });
                }
            }).catch(function(error){
                if(!error.response)
                    console.log('Error de conexión');
            })
    }

    onChange(score,value){
        if(value >= 0)
            this.setState({match_result:{...this.state.match_result,[score]:value}});
    }

    render(){
        const match_result = this.state.match_result;
        return (
            <div>
                <Segment style={{padding:0,width:270}} 
                    color={match_result.disabled ? 'grey':null} 
                    inverted={match_result.disabled}
                >
                    <h5 style={{textAlign:'center',paddingTop:5,marginBottom:5}}>{match_result.date}</h5>
                    {!match_result.disabled &&
                        <Button icon fluid
                            onClick={()=>this.onSave()}
                            color='green' style={{height:'100%'}}
                        >
                            <Icon name='save' /> Guardar
                        </Button>
                    }
                    <Grid celled='internally' style={{marginBottom:0,marginTop:0}}>
                        <Grid.Row>
                            <Grid.Column style={{width:'80%'}}>
                                <Header as='h5' image>
                                    <Image src={require(`../../resources/images/team_icons/${match_result.team_A_shortcut}.png`)}
                                        size='mini' />
                                    <Header.Content>
                                        {match_result.team_A_name}
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column style={{width:'20%',padding:0}}>
                                <Input fluid size='big' transparent type='number'
                                    style={{width:'100%',height:'100%',paddingLeft:5}}
                                    disabled={match_result.disabled}
                                    onChange={(evt,data) => this.onChange('team_A_score',data.value)}
                                    value={match_result.team_A_score}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column style={{width:'80%'}}>
                                <Header as='h5' image>
                                    <Image src={require(`../../resources/images/team_icons/${match_result.team_B_shortcut}.png`)}
                                        size='mini' />
                                    <Header.Content>
                                        {match_result.team_B_name}
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column style={{width:'20%',padding:0}}>
                                <Input fluid size='big' transparent type='number'
                                    style={{width:'100%',height:'100%',paddingLeft:5}}
                                    disabled={match_result.disabled}
                                    onChange={(evt,data) => this.onChange('team_B_score',data.value)}
                                    value={match_result.team_B_score}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default MatchComponent;