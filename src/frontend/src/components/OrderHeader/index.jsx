import React from 'react'
import './style.css'

const OrderHeader = ({order}) => {
  return (
    <div className='order-header'>
        {/* <p className='order-id'>
            {order.id}
        </p> */}
        <p className='order-date-created'>
            {order.created_time}
        </p>
        <p className='order-status'>
            Đang vận chuyển
        </p>
    </div>
  )
}

export default OrderHeader