import React from "react";
import "./style.css";

export const Wrapper = () => {
  const data = [
    {
      cover: <i class="fa-solid fa-truck-fast"></i>,
      title: "Giao Hàng Toàn Cầu",
      desc: "Chúng tôi giao hàng nhanh chóng và an toàn tới mọi nơi trên thế giới. Hãy tin tưởng lựa chọn dịch vụ giao hàng của chúng tôi.",
    },
    {
      cover: <i class="fa-solid fa-id-card"></i>,
      title: "Thanh Toán An Toàn",
      desc: "Với các phương thức thanh toán an toàn, bạn có thể thực hiện giao dịch một cách dễ dàng và tin tưởng.",
    },
    {
      cover: <i class="fa-solid fa-shield"></i>,
      title: "Mua Sắm An Tâm",
      desc: "Chúng tôi cam kết cung cấp sản phẩm chất lượng và đáng tin cậy. Hãy mua sắm cùng chúng tôi và trải nghiệm mua sắm an tâm nhất.",
    },
    {
      cover: <i class="fa-solid fa-headset"></i>,
      title: "Hỗ Trợ 24/7",
      desc: "Dù bạn gặp vấn đề vào bất kỳ thời điểm nào, chúng tôi luôn sẵn sàng hỗ trợ bạn. Dịch vụ khách hàng của chúng tôi hoạt động 24/7.",
    },
  ];
  return (
    <>
      <section className="wrapper background">
        <div className="container grid2">
          {data.map((val, index) => {
            return (
              <>
                <div className="product" key={index}>
                  <div className="img icon-circle">
                    <i>{val.cover}</i>
                  </div>
                  <h3>{val.title}</h3>
                  <p>{val.desc}</p>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};
