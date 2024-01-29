import React from "react";
import "./Rating.css";
const HoverRating = () => {
  return (
    <div className="container">
      <div id="rating">
        <input type="radio" id="star5" name="rating" value="5" />
        <label class="full" for="star5" title="Awesome - 5 stars"></label>

        <input type="radio" id="star4" name="rating" value="4" />
        <label class="full" for="star4" title="Pretty good - 4 stars"></label>

        <input type="radio" id="star3" name="rating" value="3" />
        <label class="full" for="star3" title="Meh - 3 stars"></label>

        <input type="radio" id="star2" name="rating" value="2" />
        <label class="full" for="star2" title="Kinda bad - 2 stars"></label>

        <input type="radio" id="star1" name="rating" value="1" />
        <label class="full" for="star1" title="Sucks big time - 1 star"></label>
      </div>
      <div className="Text">
        <textarea
          className="message"
          placeholder="Mời bạn chia sẻ  thêm cảm nhận"
        ></textarea>
        <div>
          <label>Gửi ảnh thực tế</label>
          <input type="file" className="anh" />
        </div>

        <div className="Name">
          <input placeholder="Họ Tên ( bắt buộc )"></input>
        </div>
        <div className="SĐT">
          <input placeholder="Số điện thoại  ( bắt buộc )"></input>
        </div>

        <div>
          <button className="b1">Gửi đánh giá</button>
        </div>
      </div>
    </div>
  );
};

export default HoverRating;
