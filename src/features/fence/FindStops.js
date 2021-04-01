import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { findStops } from './fenceSlice'
import { useState } from 'react'

export const FindStops = (props) => {

    const [finding_stops, set_finding_stops] = useState(false)
    const found_stops = useSelector(state => state.fence.limits_set)

    const get_button_text = () => {
        return finding_stops ? 'Please Wait' : 'Find Stops' 
    }

    const get_body_text = () => {
        return  finding_stops ? 
                'Finding stops. Please wait.' :
                'I need to move the blade to its limits to find the stops.' 
    }

    const dispatch = useDispatch()

    const handle_click = () => {
        set_finding_stops(true)
        dispatch(findStops())
    }

    const handle_hide = () => { }

    return(
        <Modal show={!found_stops} onHide={handle_hide}>
            <Modal.Header>
                <Modal.Title>Find Stops</Modal.Title>
            </Modal.Header>
            <Modal.Body>{get_body_text()}</Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={finding_stops}
                    onClick={handle_click}
                >
                    {get_button_text()}
                </Button>
            </Modal.Footer>
        </Modal>
    )


}