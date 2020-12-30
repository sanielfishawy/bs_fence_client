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

    const position = useSelector(state => state.fence.position)
    const conv = convert(position).from('in')
    const local_pos = conv.to(units)

    const max_pos = useSelector(state => state.fence.max_position)
    const min_pos = useSelector(state => state.fence.min_position)
    const local_min_pos = convert(min_pos).from('in').to(units)
    const local_max_pos = convert(max_pos).from('in').to(units)

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
            const standard_pos = Number(convert(pos).from(units).to('in'))
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
        txt += e.target.form.checkValidity() ? ` ${Number(val).toFixed(2)} ${conv.destination.abbr}` : ''
        submit_button.innerText = txt

    }

    return (
        <div className='number-button'>
            <Button
                className='btn-huge btn-primary'
                onClick={handleShow}
            >
                {local_pos.toFixed(2)} <small> {conv.destination.abbr}</small>
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
                                // placeholder={new_pos.toFixed(2)}
                                min={local_min_pos}
                                max={local_max_pos}
                                step=".0001"
                                onChange={onInputChange}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please enter position between {local_min_pos.toFixed(2)} and {local_max_pos.toFixed(2)} {conv.destination.unit.name.plural.toLowerCase()}
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