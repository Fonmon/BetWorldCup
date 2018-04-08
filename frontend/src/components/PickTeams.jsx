import React from 'react'
import { Button, Grid, Message, Segment, Table } from 'semantic-ui-react'

const PickTeams = () => (
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
                        <p>Por favor elija los dos equipos que cree pasarán de cada grupo</p>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={4}>
                <Grid.Column style={{ maxWidth: 250 }}>
                    <Segment stacked>
                        <h3>Grupo A</h3>
                        <Table celled selectable>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Rusia</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    Group B
                </Grid.Column>
                <Grid.Column>
                    Group C
                </Grid.Column>
                <Grid.Column>
                    Group D
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
);

export default PickTeams;
