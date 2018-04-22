import React, {Component} from 'react';
import { Button, Grid, Message, Segment, Table, Image, Header } from 'semantic-ui-react';

import {ROUND,WarningSignUpMessage} from '../../utils/Utils';

class PickListTeams extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataSource: props.dataSource,
            selectedTeams: [],
            submitError: true,
            round: props.round
        }
    }

    componentWillReceiveProps(props){
        this.setState({dataSource:props.dataSource});
        this.setState({round:props.round});
    }

    onPickTeam(event,team){
        let selectedTeams = this.state.selectedTeams;
        let indexTeam = selectedTeams.map(selectedTeam => selectedTeam.id).indexOf(team.id);
        if(indexTeam >= 0){
            selectedTeams.splice(indexTeam,1);
            team.active = false;
        }else{
            if(selectedTeams.length === (this.state.round/2)){
                let teamRemoved = selectedTeams.splice(0,1)[0];
                let originalTeam = this.state.dataSource.find(originalTeamIT => originalTeamIT.id === teamRemoved.id);
                originalTeam.active = false;
            }
            selectedTeams.push(team);
            team.active = true;
        }
        this.setState({selectedTeams:selectedTeams});
    }

    handleSubmit(){
        this.setState({submitError:true});
        let selectedTeams = this.state.selectedTeams;
        if(selectedTeams.length !== (this.state.round / 2)){
            this.setState({submitError:false});
            return;
        }
        this.props.onNext(selectedTeams);
        this.setState({selectedTeams:[]});
    }

    //http://www.iconarchive.com/show/all-country-flag-icons-by-custom-icon-design.5.html 
    render(){
        return (
            <div>
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
                `}</style>
                <Grid textAlign='center'
                    verticalAlign='middle'
                >
                    <Grid.Row columns={1}>
                        <Grid.Column style={{ maxWidth: 700 }}>
                            <Segment stacked>
                                <h2>Elección de equipos</h2>
                                <p>Por favor elija los {this.state.round/2} equipos que {this.props.label} a la siguiente ronda</p>
                                <WarningSignUpMessage />
                                <Button color='red' onClick={this.handleSubmit.bind(this)}>Siguiente</Button>
                                <Message
                                    error
                                    hidden={this.state.submitError}
                                    header='Incompleto'
                                    content={`Debe seleccionar ${this.state.round/2} equipos.`}
                                />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} style={{ maxWidth: 700 }}>
                        <Segment stacked>
                            <h3>{ROUND[`R${this.state.round}`]}</h3>
                                <Table celled selectable >
                                    <Table.Body>
                                        {this.state.dataSource && this.state.dataSource.map((team,i) => {
                                            return (
                                                <Table.Row key={i}>
                                                    <Table.Cell active={team.active}
                                                        style={{cursor: 'pointer'}}
                                                        onClick={(event)=>this.onPickTeam(event,team)}
                                                    >
                                                        <Header as='h5' image>
                                                            <Image src={require(`../../resources/images/team_icons/${team.shortcut}.png`)}
                                                                size='mini' />
                                                            <Header.Content>
                                                                {team.name}
                                                            </Header.Content>
                                                        </Header>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>
                                </Table>
                            </Segment>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default PickListTeams;