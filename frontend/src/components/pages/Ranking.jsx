import React, {Component} from 'react';
import {Container, Table} from 'semantic-ui-react';

import FixedMenu from '../base/FixedMenu';

import Utils from '../../utils/Utils';

class Ranking extends Component{

    constructor(){
        super();
        this.state = {
            ranking:[]
        }
    }

    componentDidMount(){
        let scope = this;
        Utils.getRanking()
            .then(function(response){
                scope.setState({ranking:response.data});
            }).catch(function(error){
                if(!error.response)
                    console.log('Error de conexión');
            })
    }

    render(){
        return(
            <div>
                <FixedMenu />
                <Container style={{marginTop:'7em'}}>
                    <Table fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Posición</Table.HeaderCell>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>Puntos</Table.HeaderCell>
                                <Table.HeaderCell>Partidos Marcador exacto</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.ranking.map((user,i) => {
                                return (
                                    <Table.Row active={user.is_current === 1} key={i}>
                                        <Table.Cell>{i+1}</Table.Cell>
                                        <Table.Cell>{user.first_name + ' ' + user.last_name}</Table.Cell>
                                        <Table.Cell>{user.points}</Table.Cell>
                                        <Table.Cell>{user.num_exact}</Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Ranking;