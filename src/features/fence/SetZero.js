import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Row  from 'react-bootstrap/Row'
import { saveZeroPosition } from './fenceSlice'
import { useState } from 'react'

export const SetZero = (props) => {
    const precision = 3
    const zero= useSelector(state => state.fence.zero_position)?.toFixed(precision)
    const position = useSelector(state => state.fence.position)

    const [show, set_show] = useState(false)
    const toggle_show = () => { set_show(!show) }

    const dispatch = useDispatch()
    const handle_save_zero = () => {
        dispatch(saveZeroPosition(position))
        toggle_show()
    }

    const get_form = () => {
        return show && (
            <Row className='mt-2'>
                <Button onClick={handle_save_zero}>Set Zero</Button>
            </Row>
        )
    }

    return (
        <div className='mt-4'>
            <Row><h2>
                    <a href='#' onClick={toggle_show}>Zero</a>
                    <small className='font-weight-light'>&nbsp;&nbsp;{zero} </small>
                </h2>
            </Row>
            {get_form()}
        </div>
    )
}