import React, {Component} from 'react';

import FixedMenu from '../base/FixedMenu';
import MatchResultsPanel from '../base/MatchResultsPanel';

class Home extends Component{

    render(){
        return (
            <div>
                <FixedMenu />
                <MatchResultsPanel real={false} />
            </div>
        );
    }
}

export default Home;