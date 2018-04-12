import React, {Component} from 'react';

import PersonalInfo from './signup/PersonalInfo';
import PickGroupTeams from './signup/PickGroupTeams';
import PickListTeams from './signup/PickListTeams';
import PodiumTeams from './signup/PodiumTeams';

class SignUp extends Component{

    constructor(){
        super();
        this.state = {
            step: 1,
            round: 32,
            dataSource:[]
        }
    }

    onNext(data){
        let step = this.state.step;
        let key = `step_${step}`;
        if(step >= 2 && step <=3)
            this.cleanData(data);
        this.setState({[key]:data});
        this.setState({step:step+1});

        if(step+1 >= 3){
            this.setState({dataSource:data,round:this.state.round/2});
        }
        if(step+1 === 6)
            this.onSubmit();
    }

    onSubmit(){
        console.log('registro acabado :D');
        // show message
        // redirect to login
    }

    cleanData(listTeams){
        listTeams.forEach(function(team){
            team.active = false;
        })
    }

    render(){
        return (
            <div>
                {this.state.step === 1 &&
                    <PersonalInfo onNext={this.onNext.bind(this)} />}
                {this.state.step === 2 &&
                    <PickGroupTeams onNext={this.onNext.bind(this)} />}
                {this.state.step >= 3 && this.state.step <= 4 &&
                    <PickListTeams onNext={this.onNext.bind(this)}
                        dataSource={this.state.dataSource}
                        round={this.state.round} />}
                {this.state.step === 5 &&
                    <PodiumTeams onNext={this.onNext.bind(this)}
                        dataSource={this.state.dataSource} />}
            </div>
        );
    }
}

export default SignUp;