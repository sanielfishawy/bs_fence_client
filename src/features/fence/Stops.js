import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button'
import  Row  from 'react-bootstrap/Row'
import { findStops } from './fenceSlice'
import { useState } from 'react'

export const Stops = (props) => {
    const precision = 3
    const min_position = useSelector(state => state.fence.min_position)?.toFixed(precision)
    const max_position = useSelector(state => state.fence.max_position)?.toFixed(precision)

    const [show, set_show] = useState(false)

    const toggle_show = () => { set_show(!show) }
    const dispatch = useDispatch()
    const handle_find_stops = () => {
        dispatch(findStops())
        toggle_show()
    }

    const get_form = () => {
        return show && (
            <Row className='mt-2'>
                <Button onClick={handle_find_stops}>Find Stops</Button>
            </Row>
        )
    }

    return (
        <div className='mt-4'>
            <Row><h2>
                    <a href='#' onClick={toggle_show}>Stops</a>
                    <small className='font-weight-light'>&nbsp;&nbsp;{min_position} , {max_position}</small>
                </h2>
            </Row>
            {get_form()}
        </div>
    )
}