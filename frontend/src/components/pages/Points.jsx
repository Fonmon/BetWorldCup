import React,{Component} from 'react';
import {Button, Statistic, Segment} from 'semantic-ui-react';

import FixedMenu from '../base/FixedMenu';
import MatchResultsPanel from '../base/MatchResultsPanel';
import TeamsPoints from '../base/TeamsPoints';

import Utils from '../../utils/Utils';

class Points extends Component{

    constructor(){
        super();
        this.state = {
            toggle: true,
            points: '-'
        }
    }

    componentDidMount(){
        let scope = this;
        Utils.getMyPoints()
            .then(function(response){
                scope.setState({points:response.data});
            }).catch(function(error){
                if(!error.response)
                    console.log('Error de conexión');
            });
    }

    onToggle(panel){
        this.setState({toggle:!this.state.toggle})
    }

    render(){
        return (
            <div>
                <FixedMenu />
                <center>
                    <Segment inverted color='blue'>
                        <Button.Group style={{marginTop:50}} size='big'>
                            <Button onClick={() => this.onToggle('matches')} 
                                disabled={this.state.toggle} 
                                color="green">Partidos</Button>
                            <Button.Or text='O' />
                            <Button onClick={() => this.onToggle('teams')} 
                                disabled={!this.state.toggle} 
                                color="green">Equipos</Button>
                        </Button.Group><br />
                        <Statistic >
                            <Statistic.Value>{this.state.points}</Statistic.Value>
                            <Statistic.Label>Puntos</Statistic.Label>
                        </Statistic>
                    </Segment>
                </center>
                {this.state.toggle &&
                    <MatchResultsPanel real={false} showPoints={true}/>
                }
                {!this.state.toggle &&
                    <TeamsPoints />
                }
            </div>
        );
    }
}

export default Points;