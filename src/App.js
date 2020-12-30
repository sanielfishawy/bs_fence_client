import React from 'react'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import { PositionRange } from './features/fence/PositionRange'
import { NumberButton } from './features/fence/NumberButton'

export const App =  () => {


    return (
        <Container >
            <Row className='d-flex justify-content-center'>
                <h1 >Band Saw Fence</h1>
            </Row>

            {/* <Row className='justify-content-md-center'> */}
            <Row>
                <div className='centeredOuter'>
                    <div className='centeredInner'>
                        <div>
                            <NumberButton units='in' />
                        </div>
                        <div>
                            <NumberButton units='cm' />
                        </div>
                    </div>
                </div>
            </Row>
            <Row>
                <Col style={{margin: '20px'}}><PositionRange units='in'/></Col>
            </Row>
        </Container>
    )
}
