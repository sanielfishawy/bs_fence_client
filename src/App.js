import React from 'react'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import { PositionRange } from './features/fence/PositionRange'
import { NumberButton } from './features/fence/NumberButton'
import { FindStops } from './features/fence/FindStops'
import { Errors } from './features/fence/Errors'
import { CalibrateScrew} from './features/fence/CalibrateScrew'
import { Stops } from './features/fence/Stops'
import { SetZero } from './features/fence/SetZero'

export const App =  () => {


    return (
        <Container >
            < FindStops/>

            <Row className='d-flex justify-content-center'>
                <h1 >Table Saw Up Down</h1>
            </Row>

            {/* <Row className='justify-content-md-center'> */}
            <Row>
                <div className='centeredOuter'>
                    <div className='centeredInner'>
                        <div>
                            <NumberButton units='in' />
                        </div>
                        <div>
                            <NumberButton units='cm' precision='2' base_units='cm' />
                        </div>
                    </div>
                </div>
            </Row>
            <Row>
                <Col style={{margin: '20px'}}><PositionRange units='in'/></Col>
            </Row>
            <SetZero/>
            <Stops/>
            <CalibrateScrew/>
            <Row> <Errors/></Row>
        </Container>
    )
}
