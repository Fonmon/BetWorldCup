import React from 'react';
import {Container, Segment, Divider, List, Grid} from 'semantic-ui-react';

import FixedMenu from '../base/FixedMenu';

const Rules = () => (
    <div>
        <FixedMenu />
        <Container style={{marginTop:'4em'}}>
            <Segment style={{wordWrap:'break-word'}}>
                <h2>Reglas</h2>
                <List bulleted size='big'>
                    <List.Item>
                        Cada participante deberá inscribirse en la página de la Polla indicando:
                        <List.List>
                            <List.Item>Datos personales</List.Item>
                            <List.Item>Los 16 equipos que pasan a Octavos de Final</List.Item>
                            <List.Item>Los 8 equipos que pasan a Cuartos de Final</List.Item>
                            <List.Item>Los 4 equipos que pasan a la Semifinal</List.Item>
                            <List.Item>Equipo campeón</List.Item>
                            <List.Item>Equipo subcampeón</List.Item>
                            <List.Item>Equipo que ocupa el tercer puesto</List.Item>
                        </List.List>
                    </List.Item>
                    <List.Item>Podrá inscribir el marcador de cada partido hasta 1 hora antes de cada encuentro</List.Item>
                    <List.Item>Para los partidos de las Fases de Eliminación Directa, se tendrá en cuenta el marcador hasta los 120 minutos. No se tendrá en cuenta los penaltis</List.Item>
                </List>
                <Divider />
                <h2>Puntos ganados</h2>
                <Grid columns={2}>
                    <Grid.Row style={{paddingBottom:0}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado en el marcador exacto por equipo
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    5 Puntos por partido
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:3,paddingBottom:0}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado en el marcador exacto por partido
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    5 Puntos por partido
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:3,paddingBottom:0}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado al equipo ganador por partido
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    5 Puntos por partido
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:3,paddingBottom:0}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado al empate por partido
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    5 Puntos por partido
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:3,paddingBottom:0}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado en cada equipo que pasa a la fase de Octavos de Final
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    5 Puntos por Equipo acertado
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:3,paddingBottom:0}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado en cada equipo que pasa a la fase de Cuartos de Final
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    10 Puntos por Equipo acertado
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:3,paddingBottom:0}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado en cada equipo que pasa a la fase de Semifinales
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    15 Puntos por Equipo acertado
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:3,paddingBottom:0}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado al Equipo Campeón
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    20 Puntos
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:3,paddingBottom:0}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado al Equipo SubCampeón
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    15 Puntos
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{paddingTop:3}}>
                        <Grid.Column width={11}>
                            <List bulleted size='big'>
                                <List.Item>
                                    Por haber acertado al Equipo que ocupó el Tercer Puesto
                                </List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <List size='big'>
                                <List.Item>
                                    10 Puntos
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    </div>
)

export default Rules;