import React from 'react'
import  Container  from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col  from 'react-bootstrap/Col'
import { PowerSwitch } from './features/light/PowerSwitch'
import { FrequencyRange } from './features/light/FrequencyRange'
import { useSelector } from 'react-redux'

export const App =  () => {

    const blink = useSelector(state => state.light.blink)
    const displayFreqDuty = blink ? '' : 'd-none'

    return (
        <Container>
            <h1>Light</h1>
            <Row>
                <Col xs={1} style={{margin: '20px'}}><PowerSwitch/></Col>
                <Col sm className={displayFreqDuty} style={{margin: '20px'}}><FrequencyRange/></Col>
            </Row>
        </Container>
    )
}
