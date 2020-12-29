import React from 'react'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import { PositionRange } from './features/fence/PositionRange'
import { NumberButton } from './features/fence/NumberButton'

export const App =  () => {


    return (
        <Container >
            <h1 style={{'textAlign': 'center'}}>Band Saw Fence</h1>
            <Row>
                <Col>
                    <NumberButton units='cm' />
                </Col>
            </Row>
            <Row>
                <Col style={{margin: '20px'}}><PositionRange units='cm'/></Col>
            </Row>
        </Container>
    )
}
