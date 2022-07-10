import React from "react";
import { UserOutlined } from "@ant-design/icons";

import { Avatar, Comment, Tooltip } from "antd";
import StarRatings from "react-star-ratings";
import moment from "moment";

import "./style.css";

const CustomComment = ({ review }) => {
  return (
    <div className="comment">
      <div className="comment-content">
        <Comment
          // actions={actions}
          author={<a>{review.fullName}</a>}
          avatar={
            <Avatar
              src={review.avatarPath}
              icon={<UserOutlined />}
              alt={review.fullName}
            />
          }
          content={<p>{review.comment}</p>}
          datetime={
            <span>
              {moment(review.createdTime).format("DD/MM/YYYY HH:mm:ss")}
            </span>
          }
        />
      </div>
      <div className="comment-rating">
        <StarRatings
          rating={parseFloat(review.rating)}
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
