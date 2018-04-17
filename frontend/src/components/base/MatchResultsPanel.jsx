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

    render(){
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
                </center>
                {Object.keys(this.state.matches).map((round,i)=>{
                    let basicGrid;
                    if(round.charAt(0) !== 'G'){
                        basicGrid = (
                            <Segment key={i}>
                                <h2>{ROUND[round]}</h2>
                                <Grid columns={3} style={{paddingLeft:50}}>
                                    {this.state.matches[round].map((match,j)=>{
                                        return (
                                            <Grid.Column key={j}>
                                                <MatchComponent match={match} real={this.state.real} 
                                                    showPoints={this.props.showPoints}/>
                                            </Grid.Column>
                                        )
                                    })}
                                </Grid>
                            </Segment>
                        )
                    }
                    return basicGrid;
                })}
                {this.state.matches[this.state.group] &&
                    <Segment>
                        <h2>{ROUND[this.state.group]}</h2>
                        <Grid columns={3} style={{paddingLeft:50}}>
                            {this.state.matches[this.state.group].map((match)=>{
                                return (
                                    <Grid.Column key={match.match_id}>
                                        <MatchComponent match={match} real={this.state.real} 
                                            showPoints={this.props.showPoints}/>
                                    </Grid.Column>
                                )
                            })}
                        </Grid>
                    </Segment>
                }
            </Container>
        );
    }
}

export default MatchResultsPanel;