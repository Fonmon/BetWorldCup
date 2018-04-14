import React, {Component} from 'react';

import FixedMenu from '../base/FixedMenu';
import MatchResultsPanel from '../base/MatchResultsPanel';

import Utils,{STAFF_KEY} from '../../utils/Utils';

class Home extends Component{

    componentDidMount(){
        Utils.isStaff()
            .then(function(response){
                localStorage.setItem(STAFF_KEY,response.data);
            }).catch(function(error){
                if(!error.response)
                    console.log('Error de conexión');
            });
    }

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