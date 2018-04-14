import React, {Component} from 'react';
import {Container, Segment, Grid} from 'semantic-ui-react';

import MatchComponent from './MatchComponent';

import Utils, {ROUND} from '../../utils/Utils';

class MatchResultsPanel extends Component{

    constructor(props){
        super();
        this.state = {
            matches: {},
            real: props.real
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
            <div>
                <Container style={{marginTop:'7em'}}>
                    {Object.keys(this.state.matches).map((round,i)=>{
                        return (
                            <Segment key={i}>
                                <h2>{ROUND[round]}</h2>
                                <Grid columns={3} style={{paddingLeft:50}}>
                                    {this.state.matches[round].map((match,i)=>{
                                        return (
                                            <Grid.Column key={i}>
                                                <MatchComponent match={match} real={this.state.real} />
                                            </Grid.Column>
                                        )
                                    })}
                                </Grid>
                            </Segment>
                        )
                    })}
                </Container>
            </div>
        );
    }
}

export default MatchResultsPanel;