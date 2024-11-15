import { useEffect, useState } from "react"
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../slices/cartSlice"

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        {/* <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            className="my-2"
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                        {/* <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check> */}
                        <Form.Check
                            type='radio'
                            label='Cash on Delivery'
                            id='Stripe'
                            name='paymentMethod'
                            value='COD'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' className="my-4">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen