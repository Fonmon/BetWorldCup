import React, {Component} from 'react';
import {Container, Button, Message} from 'semantic-ui-react';

import FixedMenu from '../base/FixedMenu';
import MatchResultsPanel from '../base/MatchResultsPanel';
import PickGroupTeams from '../base/PickGroupTeams';
import PickListTeams from '../base/PickListTeams';
import PodiumTeams from '../base/PodiumTeams';

import Utils from '../../utils/Utils';

class Results extends Component{

    constructor(){
        super();
        this.state = {
            toggle: true,
            step: 2,
            dataSource: [],
            round: 32
        }
    }

    componentDidMount(){
        this.getCurrentStep();
    }

    onToggle(panel){
        this.setState({toggle:!this.state.toggle})
    }

    onNext(data){
        let scope = this;
        if(this.state.step !== 5)
            this.cleanData(data);
        Utils.saveRealTeams(this.state.step,data)
            .then(function(response){
                scope.setState({
                    round:scope.state.round/2,
                    dataSource:data,
                    step:scope.state.step+1
                });
            }).catch(function(error){
                if(!error.response)
                    console.log('Error de conexión');
            });
    }

    cleanData(listTeams){
        listTeams.forEach(function(team){
            team.active = false;
        })
    }

    getCurrentStep(){
        let scope = this;
        Utils.getRealTeams()
            .then(function(response){
                let step = response.data.step,
                    dataSource = [],
                    round = scope.getRound(step);
                if (step > 2 && step < 6)
                    dataSource = response.data.teams;
                scope.setState({
                    step:step,
                    dataSource:dataSource,
                    round: round
                });
            }).catch(function(error){
                if(!error.response)
                    console.log('Error de conexión');
            });
    }

    getRound(step){
        if(step === 2)
            return 32;
        if(step === 3)
            return 16;
        if(step === 4)
            return 8;
        return -1;
    }

    render(){
        return (
            <div>
                <FixedMenu />
                <center>
                    <Button.Group style={{marginTop:50}} size='big'>
                        <Button onClick={() => this.onToggle('matches')} 
                            disabled={this.state.toggle} 
                            color="green">Partidos</Button>
                        <Button.Or text='O' />
                        <Button onClick={() => this.onToggle('teams')} 
                            disabled={!this.state.toggle} 
                            color="green">Equipos</Button>
                    </Button.Group>
                </center>
                {this.state.toggle &&
                    <MatchResultsPanel real={true} />
                }
                {!this.state.toggle &&
                    <Container style={{marginTop:20}}>
                        {this.state.step === 2 &&
                            <PickGroupTeams label='pasaron' onNext={this.onNext.bind(this)} />}
                        {this.state.step >= 3 && this.state.step <= 4 &&
                            <PickListTeams onNext={this.onNext.bind(this)}
                                label='pasaron'
                                dataSource={this.state.dataSource}
                                round={this.state.round} />}
                        {this.state.step === 5 &&
                            <PodiumTeams onNext={this.onNext.bind(this)}
                                dataSource={this.state.dataSource} />}
                        {this.state.step === 6 &&
                            <Message icon='announcement'
                                header='Aviso'
                                content='Al parecer el mundial ha terminado :(' />
                        }
                    </Container>
                }
            </div>
        );
    }
}

export default Results;