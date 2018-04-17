import React,{Component} from 'react';
import {Container, Button, Table, Header, Image} from 'semantic-ui-react';

import Utils,{ROUND} from '../../utils/Utils';

const podium = ['C1','C2','C3'];

class TeamsPoints extends Component{

    constructor(props){
        super(props);
        this.state = {
            round: 'G',
            teams:{}
        }
    }

    componentDidMount(){
        let scope = this;
        Utils.getMyTeams()
            .then(function(response){
                scope.setState({teams:response.data});
            }).catch(function(error){
                if(!error.response)
                    console.log('error de conexión');
            });
    }

    render(){
        return (
            <Container style={{marginTop:'4em'}}>
                <center>
                    <Button.Group size='big' color='teal'>
                        <Button onClick={() => this.setState({round:'G'})}
                            active={this.state.round === 'G'}>16 Equipos</Button>
                        <Button onClick={() => this.setState({round:'R16'})}
                            active={this.state.round === 'R16'}>8 Equipos</Button>
                        <Button onClick={() => this.setState({round:'R8'})}
                            active={this.state.round === 'R8'}>4 Equipos</Button>
                        <Button onClick={() => this.setState({round:'C'})}
                            active={this.state.round === 'C'}>Ganadores</Button>
                    </Button.Group>
                    <Table fixed style={{ maxWidth: 500 }}>
                        <Table.Header>
                            <Table.Row>
                                {this.state.round === 'C' &&
                                    <Table.HeaderCell>Puesto</Table.HeaderCell>
                                }
                                <Table.HeaderCell>Equipo</Table.HeaderCell>
                                <Table.HeaderCell>Puntos</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.round !== 'C' &&
                            this.state.teams[this.state.round] && this.state.teams[this.state.round].map((team)=>{
                                return (
                                    <Table.Row key={team.id}>
                                        <Table.Cell>
                                            <Header as='h5' image>
                                                <Image src={require(`../../resources/images/team_icons/${team.shortcut}.png`)}
                                                    size='mini' />
                                                <Header.Content>
                                                    {team.name}
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{team.points} puntos</Table.Cell>
                                    </Table.Row>
                                );
                            })}
                            {this.state.round === 'C' && podium.map((place)=>{
                                return(
                                    <Table.Row key={place}>
                                        <Table.Cell>{ROUND[place]}</Table.Cell>
                                        <Table.Cell>
                                            <Header as='h5' image>
                                                <Image src={require(`../../resources/images/team_icons/${this.state.teams[place][0].shortcut}.png`)}
                                                    size='mini' />
                                                <Header.Content>
                                                    {this.state.teams[place][0].name}
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>{this.state.teams[place][0].points} puntos</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </center>
            </Container>
        )
    }
}

export default TeamsPoints;