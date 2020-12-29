import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosition, savePosition } from './fenceSlice'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
const convert = require('convert-units')

export const NumberButton = (props) => {
    const position = useSelector(state => state.fence.position)

    const units = props.units

    const conv = convert(position).from('in')
    const local_pos = conv.to(units)

    const max_pos = useSelector(state => state.fence.max_postion)
    const min_pos = useSelector(state => state.fence.min_postion)
    const local_min_pos = convert(min_pos).from('in').to(units)
    const local_max_pos = convert(max_pos).from('in').to(units)

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);
    const [new_pos, set_new_pos] = useState(local_pos)

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            dispatch(setPosition(new_pos))
            await dispatch(savePosition(new_pos))
        }

        setValidated(true);
    };

    const onInputChange = (e) =>{
        const np = parseFloat(e.currentTarget.value)
        if (np) set_new_pos(parseFloat(e.currentTarget.value))
    }

    const go_message = () => {
        return new_pos !== local_pos ? `${new_pos.toFixed(2)} ${conv.destination.abbr}` : ''
    }

    return (
        <>
            <Button
                className='btn-huge'
                class='btn-primary'
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
                            <Form.Label>Enter pos in foo</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={local_pos.toFixed(2)}
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