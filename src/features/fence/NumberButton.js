import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosition, savePosition } from './fenceSlice'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
const convert = require('convert-units')

export const NumberButton = (props) => {
    const units = props.units
    const precision = props.precision || 2
    const base_unit = props.base_unit || 'in'

    let position = useSelector(state => state.fence.position_inches)
    position = position || 0
    const conv = convert(position).from(base_unit)
    const local_pos = conv.to(units)

    let max_pos = useSelector(state => state.fence.max_position_inches)
    max_pos = max_pos || 10
    let min_pos = useSelector(state => state.fence.min_position_inches)
    min_pos = min_pos || 0
    const local_min_pos = convert(min_pos).from(base_unit).to(units)
    const local_max_pos = convert(max_pos).from(base_unit).to(units)

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);

    const [validated, setValidated] = useState(false);

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {
        setShow(true);
        setValidated(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;

        if (form.checkValidity() ) {
            const formData = new FormData(event.target)
            const formDataObj = Object.fromEntries(formData.entries())
            const pos = formDataObj.position
            const standard_pos = Number(convert(pos).from(units).to(base_unit))
            dispatch(setPosition(standard_pos))
            dispatch(savePosition(standard_pos))
            handleClose()
        }
        setValidated(true)
    };

    const onInputChange = (e) => {
        const val = e.target.value
        const submit_button = document.getElementById('numberButtonSubmit')

        let txt = 'Go'
        txt += e.target.form.checkValidity() ? ` ${Number(val).toFixed(precision)} ${conv.destination.abbr}` : ''
        submit_button.innerText = txt

    }

    return (
        <div className='number-button'>
            <Button
                className='btn-huge'
                onClick={handleShow}
            >
                {local_pos.toFixed(precision)} <small> {conv.destination.abbr}</small>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set {conv.destination.unit.name.plural} </Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="validationCustom05">
                            <Form.Label>Enter position in {conv.destination.unit.name.plural.toLowerCase()}</Form.Label>
                            <Form.Control
                                name="position"
                                type="number"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                // placeholder={new_pos.toFixed(precision)}
                                // min={local_min_pos}
                                // max={local_max_pos}
                                step=".0001"
                                onChange={onInputChange}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please enter position between {local_min_pos.toFixed(precision)} and {local_max_pos.toFixed(precision)} {conv.destination.unit.name.plural.toLowerCase()}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            id='numberButtonSubmit'
                            type="submit"
                            disabled={false}
                        >Go
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}