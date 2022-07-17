import React from 'react'
import './style.css'
import formatter from "utils/formatter";


const OrderHeader = (order) => {
  return (
    <div className='order-header'>
        <p className='order-date-created'>
            {formatter.formatDate(order.createdTime)}
        </p>
        <p className='order-status'>
            Đang vận chuyển
        </p>
        <div>
          <p className="my-2">
            <b>Tên người nhận: </b>
            {order.receiverName}
          </p>
          <p className="my-2">
            <b>Sđt: </b>
            {order.receiverPhone}
          </p>
        </div>
    </div>

  )
}

export default OrderHeader