import React, {Component} from 'react';
import { Button, Grid, Message, Segment, Dropdown } from 'semantic-ui-react';

class PodiumTeams extends Component{

    constructor(props){
        super(props);
        this.state = {
            submitError:true,
            dataSource : props.dataSource,
            optionTeams: [],
            team_1:null,
            team_2:null,
            team_3:null
        }
    }

    componentDidMount(){
        this.transformDatasource();
    }

    transformDatasource(){
        let dataSource = this.state.dataSource;
        let transformation = [];
        dataSource.forEach(team => {
            let teamOption = {
                key: team.id,
                text: team.name,
                value: team.id,
                image: {avatar:true,src:require(`../../resources/images/team_icons/${team.shortcut}.png`)}
            };
            transformation.push(teamOption);
        });
        this.setState({optionTeams:transformation});
    }

    handleSubmit(){
        this.setState({submitError:true});
        let podium = {
            first: this.state.team_1,
            second: this.state.team_2,
            third: this.state.team_3
        }
        if(!podium.first || !podium.second || !podium.third){
            this.setState({submitError:false});
            return;
        }
        if(podium.first === podium.second || podium.first === podium.third || podium.second === podium.third){
            this.setState({submitError:false});
            return;
        }
        this.props.onNext(podium);
    }

    onChange(event, data, indexTeam){
        let teamId = data.value;
        let key = `team_${indexTeam}`;
        this.setState({[key]:teamId});
    }

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
                                <p>Debe seleccionar los equipos que considere para cada uno de los siguientes títulos</p>
                                <Button color='red' onClick={this.handleSubmit.bind(this)}>Finalizar</Button>
                                <Message
                                    error
                                    hidden={this.state.submitError}
                                    header='Incompleto'
                                    content='Debe seleccionar equipos diferentes.'
                                />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column style={{ maxWidth: 500 }}>
                            <Segment stacked>
                                <h3>Campeón</h3>
                                <Dropdown placeholder='Seleccione Campeón' fluid 
                                    selection 
                                    options={this.state.optionTeams} 
                                    onChange={(event,value) => this.onChange(event,value,1)}/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column style={{ maxWidth: 500 }}>
                            <Segment stacked>
                                <h3>Subcampeón</h3>
                                <Dropdown placeholder='Seleccione Campeón' fluid 
                                    selection 
                                    options={this.state.optionTeams} 
                                    onChange={(event,value) => this.onChange(event,value,2)}/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1} >
                        <Grid.Column style={{ maxWidth: 500 }}>
                            <Segment stacked>
                                <h3>Tercer lugar</h3>
                                <Dropdown placeholder='Seleccione Campeón' fluid 
                                    selection 
                                    options={this.state.optionTeams} 
                                    onChange={(event,value) => this.onChange(event,value,3)}/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default PodiumTeams;