import React, {Component} from 'react';
import { Button, Grid, Message, Segment, Table, Image, Header } from 'semantic-ui-react';

import Utils from "../utils/Utils";

class PickTeams extends Component{

    constructor(){
        super();
        this.state = {
            groups: [],
            selectedTeams: {},
            nextError: true
        }
    }

    componentDidMount = () => {
        this.getTeams();
    }

    getTeams(){
        let scope = this;
        Utils.getTeams()
            .then(function(response){
                scope.setState({groups:response.data});
            }).catch(function(error){
                if(!error.response)
                    console.log('Error de conexión');
            })
    }

    indexOfGroup(group){
        let ascii = group.charCodeAt(group.length - 1);
        return ascii - 65;
    }

    onPickTeam(event,team){
        let teamRound = {
            id: team.id,
            round: team.group
        }
        let selectedTeams = this.state.selectedTeams;
        if(!selectedTeams[team.group])
            selectedTeams[team.group] = [];
        let groupTeams = selectedTeams[team.group];
        let indexTeam = groupTeams.map(selectedTeam => selectedTeam.id)
            .indexOf(team.id);
        if(indexTeam >= 0){
            groupTeams.splice(indexTeam,1);
            team.active = false;
        }else{
            if(groupTeams.length > 1){
                let teamRemoved = groupTeams.splice(0,1)[0];
                let originalTeam = this.state.groups[this.indexOfGroup(team.group)]
                    .teams.find(originalTeamIT => originalTeamIT.id === teamRemoved.id);
                originalTeam.active = false;
            }
            groupTeams.push(team);
            team.active = true;
        }
        this.setState({selectedTeams:selectedTeams});
    }

    onNext(){
        this.setState({nextError:true});
        let selectedTeams = this.state.selectedTeams;
        // TODO: validate
        if(selectedTeams.length !== this.state.groups.length){
            this.setState({nextError:false});
            return;
        }
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
                                <p>Por favor elija los dos equipos que cree pasarán de cada grupo</p>
                                <Button onClick={() => this.onNext()}>Siguiente</Button>
                                <Message
                                    error
                                    hidden={this.state.nextError}
                                    header='Incompleto'
                                    content='Debe seleccionar dos equipos por cada uno de los grupos.'
                                />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={4}>
                        {this.state.groups.map((group,i) => {
                            return i < 4 ? (<Grid.Column key={i} 
                                style={{ maxWidth: 250 }}>
                                <Segment stacked>
                                    <h3>{group.group}</h3>
                                    <Table celled selectable >
                                        <Table.Body>
                                            {group.teams.map((team,j) => {
                                                return (
                                                    <Table.Row key={j}>
                                                        <Table.Cell active={team.active}
                                                            style={{cursor: 'pointer'}}
                                                            onClick={(event)=>this.onPickTeam(event,team)}
                                                        >
                                                            <Header as='h5' image>
                                                                <Image src={require(`../resources/images/team_icons/${team.shortcut}.png`)}
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
                            </Grid.Column>):(null)
                        })}
                    </Grid.Row>
                    <Grid.Row columns={4}>
                        {this.state.groups.map((group,i) => {
                            return i >= 4 ? (<Grid.Column key={i} 
                                style={{ maxWidth: 250 }}>
                                <Segment stacked>
                                    <h3>{group.group}</h3>
                                    <Table celled selectable>
                                        <Table.Body>
                                            {group.teams.map((team,j) => {
                                                return (
                                                    <Table.Row key={j}>
                                                        <Table.Cell active={team.active}
                                                            style={{cursor: 'pointer'}}
                                                            onClick={(event)=>this.onPickTeam(event,team)}
                                                        >
                                                            <Header as='h5' image>
                                                                <Image src={require(`../resources/images/team_icons/${team.shortcut}.png`)}
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
                            </Grid.Column>):(null)
                        })}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default PickTeams;