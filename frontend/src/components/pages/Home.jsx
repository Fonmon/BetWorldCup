import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';

import FixedMenu from '../base/FixedMenu';
import MatchComponent from '../base/MatchComponent';

class Home extends Component{

    constructor(){
        super();
        this.state = {
            matches: {}
        }
    }

    componentDidMount(){
        
    }

    render(){
        return (
            <div>
                <FixedMenu />
                <Container style={{marginTop:'7em'}}>
                    {/* <MatchComponent match=/> */}
                </Container>
            </div>
        );
    }
}

export default Home;