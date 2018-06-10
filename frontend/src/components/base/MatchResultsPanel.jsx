import React, {Component} from 'react';
import {Container, Segment, Grid, Button} from 'semantic-ui-react';

import MatchComponent from './MatchComponent';

import Utils, {ROUND} from '../../utils/Utils';

class MatchResultsPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            matches: {},
            real: props.real,
            group: 'GA',
        }
    }

    componentDidMount(){
        let scope = this;
        Utils.getMatchResults(this.state.real)
            .then(function(response){
                scope.setState({matches:response.data});
            }).catch(function(error){
                if(!error.response)
                    console.log('error de conexión');
            });
    }

    onSave(matchResult, index, round){
        let matches = this.state.matches,
            group = matches[round];
        group[index].result_id = matchResult.id;
        group[index].team_A_score = matchResult.score_A;
        group[index].team_B_score = matchResult.score_B;
        this.setState({matches:matches});
    }

    render(){
        let finalsComponent = null;
        if(this.state.matches['R3'] && this.state.matches['R2']){
            let thirdMatch = this.state.matches['R3'][0];
            let finalMatch = this.state.matches['R2'][0];
            finalsComponent = (
                <Grid columns={2} style={{paddingLeft:50}}>
                    <Grid.Column>
                        <h4 style={{marginLeft:40}}>Partido tercer lugar</h4>
                        <MatchComponent match={thirdMatch} real={this.state.real} 
                            showPoints={this.props.showPoints}
                            onSave={(result) => this.onSave(result,0,'R3')}/>
                    </Grid.Column>
                    <Grid.Column>
                        <h4 style={{marginLeft:40}}>Final</h4>
                        <MatchComponent match={finalMatch} real={this.state.real} 
                            showPoints={this.props.showPoints}
                            onSave={(result) => this.onSave(result,0,'R2')}/>
                    </Grid.Column>
                </Grid>
            );
        }else{
            finalsComponent = (
                <p>Aún no está configurada esta instancia. Vuelve luego.</p>
            )
        }
        return (
            <Container style={{marginTop:'4em'}}>
                <center>
                    <Button.Group size='big' color='teal'>
                        <Button onClick={() => this.setState({group:'GA'})}
                            active={this.state.group === 'GA'}>Grupo A</Button>
                        <Button onClick={() => this.setState({group:'GB'})}
                            active={this.state.group === 'GB'}>Grupo B</Button>
                        <Button onClick={() => this.setState({group:'GC'})}
                            active={this.state.group === 'GC'}>Grupo C</Button>
                        <Button onClick={() => this.setState({group:'GD'})}
                            active={this.state.group === 'GD'}>Grupo D</Button>
                        <Button onClick={() => this.setState({group:'GE'})}
                            active={this.state.group === 'GE'}>Grupo E</Button>
                        <Button onClick={() => this.setState({group:'GF'})}
                            active={this.state.group === 'GF'}>Grupo F</Button>
                        <Button onClick={() => this.setState({group:'GG'})}
                            active={this.state.group === 'GG'}>Grupo G</Button>
                        <Button onClick={() => this.setState({group:'GH'})}
                            active={this.state.group === 'GH'}>Grupo H</Button>
                    </Button.Group>
                    <Button.Group size='big' color='teal' style={{marginTop:5}}>
                        <Button onClick={() => this.setState({group:'R16'})}
                            active={this.state.group === 'R16'}>Octavos de final</Button>
                        <Button onClick={() => this.setState({group:'R8'})}
                            active={this.state.group === 'R8'}>Cuartos de final</Button>
                        <Button onClick={() => this.setState({group:'R4'})}
                            active={this.state.group === 'R4'}>Semifinales</Button>
                        <Button onClick={() => this.setState({group:'R2'})}
                            active={this.state.group === 'R2'}>Finales</Button>
                    </Button.Group>
                </center>
                {/* {Object.keys(this.state.matches).map((round,i)=>{
                    let basicGrid;
                    if(round.charAt(0) !== 'G'){
                        basicGrid = (
                            <Segment key={i}>
                                <h2>{ROUND[round]}</h2>
                                <Grid columns={3} style={{paddingLeft:50}}>
                                    {this.state.matches[round].map((match,j)=>{
                                        return (
                                            <Grid.Column key={match.match_id}>
                                                <MatchComponent match={match} real={this.state.real} 
                                                    showPoints={this.props.showPoints}
                                                    onSave={(result) => this.onSave(result,j,round)}/>
                                            </Grid.Column>
                                        )
                                    })}
                                </Grid>
                            </Segment>
                        )
                    }
                    return basicGrid;
                })} */}
                {this.state.group !== 'R2' && this.state.matches[this.state.group] &&
                    <Segment>
                        <h2>{ROUND[this.state.group]}</h2>
                        <Grid stackableq columns={3} style={{paddingLeft:50}}>
                            {this.state.matches[this.state.group].map((match,i)=>{
                                return (
                                    <Grid.Column key={match.match_id}>
                                        <MatchComponent match={match} real={this.state.real} 
                                            showPoints={this.props.showPoints}
                                            onSave={(result) => this.onSave(result,i,this.state.group)}/>
                                    </Grid.Column>
                                )
                            })}
                        </Grid>
                    </Segment>
                }
                {this.state.group !== 'R2' && !this.state.matches[this.state.group] &&
                    <Segment>
                        <h2>{ROUND[this.state.group]}</h2>
                        <p>Aún no está configurada esta instancia. Vuelve luego.</p>
                    </Segment>
                }
                {this.state.group === 'R2' &&
                    <Segment>
                        <h2>Partidos finales</h2>
                        {finalsComponent}
                    </Segment>
                }
            </Container>
        );
    }
}

export default MatchResultsPanel;