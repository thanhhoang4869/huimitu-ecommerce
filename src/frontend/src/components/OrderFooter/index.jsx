import React from 'react'
import './style.css'

const OrderFooter = ({order}) => {
  return (
    <div className="order-footer">
        <p className='order-total'>Tổng tiền: <span className='order-total-number color-key'>{order.total}</span></p>
        <button className="primary-btn" style={{ borderRadius: "5px" }}>Đánh giá</button>
    </div>
  )
}

export default OrderFooter