import React, { useEffect, useState } from 'react'
import './Cart.css'
import GooglePayButton from '@google-pay/button-react'

const Cart = ({cart,setCart}) => {

    const[price,setPrice]=useState(0)
    const handleButtonClick = (id, operation) => {
      const updatedCart = cart.map(item =>
        item.id === id
          ? { ...item, amount: operation === 'increment' ? item.amount + 1 : item.amount - 1 }
          : item
      );
      setCart(updatedCart);
    };

    function handlePrice(){
        let ans =0
        cart.map((item)=>ans+=item.price*item.amount)
        setPrice(ans)
    }

    useEffect(()=>{
        handlePrice()
    })

    function handleRemove(id){
        const del = cart.filter(i=>id!==i.id)
        setCart(del)
    }
  return (
    <div>
        <table border={'2px solid black'} rules='none'>
            <thead>
                <tr>
                    <td><b>Image</b></td>
                    <td><b>Name</b></td>
                    <td><b>Incre</b></td>
                    <td><b>Qty</b></td>
                    <td><b>Decre</b></td>
                    <td><b>TotalPrice</b></td>
                    <td><b>Remove</b></td>
                </tr>
            </thead>
            <tbody>
                {cart.map((item)=>{
                    return(
                        <tr key={item.id}>
                            <td><img src={item.image} alt="" height={'50px'} width={'50px'}/></td>
                            <td>{item.title}</td>
                            <td><button onClick={() => handleButtonClick(item.id, 'increment')}>+</button></td>
                            <td>{item.amount}</td>
                            <td><button onClick={() => handleButtonClick(item.id, 'decrement')}>-</button></td>
                            <td>{item.price}</td>
                            <td><button onClick={()=>handleRemove(item.id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td ><b>Total Amount</b></td>
                    <td colSpan={'5'}>{price}</td>
                    <td><button>
                    <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
  }}
/>
                        </button></td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}

export default Cart