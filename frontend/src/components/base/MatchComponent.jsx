import React, {Component} from 'react';
import {Segment, Grid, Image, Header, Input, Button, Icon} from 'semantic-ui-react';

// match_result:{
//     id: null,
//     match_id:null,
//     team_A: {
//         id: 1,
//         name: 'República de corea',
//         shortcut: 'COL',
//     },
//     team_B: {
//         id: 2,
//         name: 'Argentina',
//         shortcut: 'ARG'
//     },
//     score_A:'',
//     score_B:'',
//     real: false,
//     date: '18 mar 20:23',
//     disabled: false,
//     points: 0
// }

class MatchComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            match_result:props.match
        }
    }

    onSave(){
        console.log(this.state);
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
                            <Icon name='save' />
                        </Button>
                    }
                    <Grid celled='internally' style={{marginBottom:0,marginTop:0}}>
                        <Grid.Row>
                            <Grid.Column style={{width:'80%'}}>
                                <Header as='h5' image>
                                    <Image src={require(`../../resources/images/team_icons/${match_result.team_A.shortcut}.png`)}
                                        size='mini' />
                                    <Header.Content>
                                        {match_result.team_A.name}
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column style={{width:'20%',padding:0}}>
                                <Input fluid size='big' transparent type='number'
                                    style={{width:'100%',height:'100%',paddingLeft:5}}
                                    disabled={match_result.disabled}
                                    onChange={(evt,data) => this.onChange('score_A',data.value)}
                                    value={match_result.score_A}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column style={{width:'80%'}}>
                                <Header as='h5' image>
                                    <Image src={require(`../../resources/images/team_icons/${match_result.team_B.shortcut}.png`)}
                                        size='mini' />
                                    <Header.Content>
                                        {match_result.team_B.name}
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column style={{width:'20%',padding:0}}>
                                <Input fluid size='big' transparent type='number'
                                    style={{width:'100%',height:'100%',paddingLeft:5}}
                                    disabled={match_result.disabled}
                                    onChange={(evt,data) => this.onChange('score_B',data.value)}
                                    value={match_result.score_B}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

export default MatchComponent;