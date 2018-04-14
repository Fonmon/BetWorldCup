import React, {Component} from 'react';

import FixedMenu from '../base/FixedMenu';
import MatchResultsPanel from '../base/MatchResultsPanel';

class Results extends Component{

    render(){
        return (
            <div>
                <FixedMenu />
                <MatchResultsPanel real={true} />
            </div>
        );
    }
}

export default Results;