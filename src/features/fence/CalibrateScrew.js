import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button'
import  Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { saveRevolutionsPerInch } from './fenceSlice'
import { useState } from 'react'

export const CalibrateScrew = (props) => {

    const precision = 3
    const max_inches = 20
    const position = useSelector(state => state.fence.position)?.toFixed(precision)
    const revolutions_per_inch = useSelector(state => state.fence.revolutions_per_inch)?.toFixed(precision)
    const [pos_a, set_pos_a] = useState(null)
    const [pos_b, set_pos_b] = useState(null)
    const [inches, set_inches] = useState(null)
    const [show, set_show] = useState(false)
    
    const diff = pos_a && pos_b && Math.abs(pos_a - pos_b)
    const rev_per_inch = diff && inches && (diff / inches).toFixed(precision)

    const toggle_show = () => {set_show(!show)}
    const handle_click_a = () => {set_pos_a(position)}
    const handle_click_b = () => {set_pos_b(position)}

    const dispatch = useDispatch()
    const handle_submit = () => { 
        dispatch(saveRevolutionsPerInch(rev_per_inch))
        toggle_show()
    }

    const on_input_change = (e) => { 
        set_inches(e.target.value)
    }

    const get_numeric_entry = () => {
        return (
            <Form>
                <Form.Group controlId="validationCustom05">
                    <Form.Control
                        name="inches"
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        // placeholder={new_pos.toFixed(precision)}
                        min='0'
                        max={max_inches}
                        step=".0001"
                        onChange={on_input_change}
                        required />
                    <Form.Control.Feedback type="invalid">
                        Please enter inches between 0 and {max_inches}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
        )
    }

    const get_form = () => {
        return (
            show && (
            <div className='mt-2'>
                <Row>
                    <Col><h5>Current</h5></Col>
                    <Col><h5>Position A</h5></Col>
                    <Col><h5>Position B</h5></Col>
                    <Col><h5>Inches</h5></Col>
                    <Col><h5>Rev per Inch</h5></Col>
                </Row>
                <Row>
                    <Col>{position}</Col>
                    <Col>{pos_a}</Col>
                    <Col>{pos_b}</Col>
                    <Col>{get_numeric_entry()}</Col>
                    <Col>{rev_per_inch}</Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col><Button onClick={handle_click_a}>Set</Button></Col>
                    <Col><Button onClick={handle_click_b}>Set</Button></Col>
                    <Col>
                        <Button 
                            onClick={handle_submit}
                            disabled={!rev_per_inch || rev_per_inch > 50}
                        >Submit</Button></Col>
                    <Col></Col>
                </Row> 
            </div>
            )
        )
    }

    return (
        <div>
            <Row className='mt-4'><h2>
                    <a href='#' onClick={toggle_show}>Screw</a>
                    <small className='font-weight-light'>&nbsp;&nbsp;{revolutions_per_inch} rev/in</small>
                </h2>
            </Row>
            {get_form()}
        </div>
    )

}