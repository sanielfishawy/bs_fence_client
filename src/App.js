import React from 'react'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import { PositionRange } from './features/fence/PositionRange'
import { NumberButton } from './features/fence/NumberButton'

export const App =  () => {


    return (
        <Container >
            <Row className='justify-content-md-center'>
                <h1 style={{marginBottom:'4rem'}}>Band Saw Fence</h1>
            </Row>

            <Row className='justify-content-md-center'>
                <Col md='auto'>
                    <NumberButton units='in' />
                </Col>
                <Col md='auto'>
                    <NumberButton units='ft' />
                </Col>
            </Row>
            <Row>
                <Col style={{margin: '20px'}}><PositionRange units='in'/></Col>
            </Row>
        </Container>
    )
}
