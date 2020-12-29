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
    const [new_pos, set_local_pos] = useState(local_pos)

    const max_pos = useSelector(state => state.fence.max_position)
    const min_pos = useSelector(state => state.fence.min_position)
    const local_min_pos = convert(min_pos).from('in').to(units)
    const local_max_pos = convert(max_pos).from('in').to(units)

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() ) {
            const standard_pos = convert(new_pos).from(units).to('in')
            dispatch(setPosition(standard_pos))
            dispatch(savePosition(standard_pos))
        }
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
        handleClose()
    };

    const [changed, set_changed] = useState(false)

    const onInputChange = (e) =>{
        set_changed(true)
        const np = parseFloat(e.currentTarget.value)
        if (np) set_local_pos(parseFloat(e.currentTarget.value))
    }

    const go_message = () => {
        return changed ? `${new_pos.toFixed(2)} ${conv.destination.abbr}` : ''
    }

    return (
        <>
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
                                type="number"
                                placeholder={new_pos.toFixed(2)}
                                min={local_min_pos}
                                max={local_max_pos}
                                onChange={onInputChange}
                                step=".0001"
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please enter position in {conv.destination.unit.name.plural}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={false}
                        >Go {go_message()}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}