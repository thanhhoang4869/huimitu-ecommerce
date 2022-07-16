import React from 'react'
import './style.css'
import formatter from "utils/formatter";


const OrderHeader = ({order}) => {
  return (
    <div className='order-header'>
        <p className='order-date-created'>
            {formatter.formatDate(order.created_time)}
        </p>
        <p className='order-status'>
            Đang vận chuyển
        </p>
    </div>
  )
}

export default OrderHeader