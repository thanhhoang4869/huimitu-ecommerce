import React from "react";
import { Avatar, Comment, Tooltip } from "antd";
import StarRatings from "react-star-ratings";
import moment from "moment";

import "./style.css";

const CustomComment = () => {
  return (
    <div className="comment">
      <div className="comment-content">
        <Comment
          // actions={actions}
          author={<a>Nguyễn Nga</a>}
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Nguyễn Nga" />
          }
          content={
            <p>
              Hàng đẹp nha mọi người , xinh lắm luôn . Đóng gói sản phẩm cẩn thận. Sẽ ủng hộ.
              Chất lượng sản phẩm tốt, đóng gói đẹp cẩn thận, giao hàng đúng số lượng nhanh chóng
            </p>
          }
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </div>
      <div className="comment-rating">
        <StarRatings
          rating={4.5}
          starRatedColor="orange"
          starDimension="20px"
          // changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
        />
      </div>
    </div>
  );
};

export default CustomComment;
