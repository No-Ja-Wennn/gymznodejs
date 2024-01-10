var product = JSON.parse(localStorage.getItem('product'));
console.log(product);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Information data={product} />);

function Information({ data }) {
    console.log(data)

    return (
        <div>
            <div class="breadcrumb">
                <div class="grid">
                    <ul class="breadcrumb__list">
                        <li class="breadcrumb__item">
                            <span class="breadcrumb__item__text">
                                <a class="breadcrumb__item__link" href="#">Cửa hàng whey</a>
                                <i class="fa-solid fa-chevron-right"></i>
                            </span>
                        </li>
                        <li class="breadcrumb__item">
                            <span class="breadcrumb__item__text">
                                <a class="breadcrumb__item__link" href="#">Dởm whey</a>
                                <i class="fa-solid fa-chevron-right"></i>
                            </span>
                        </li>
                        <li class="breadcrumb__item">
                            <span class="breadcrumb__item__text">
                                <a class="breadcrumb__item__link" href="#">Đểu whey</a>
                            </span>
                        </li>
                        <li class="breadcrumb__item"></li>
                    </ul>
                </div>
            </div>
            <div class="container__block">
                <div class="grid">

                    <div class="container__main">
                        <div class="container__pictures">
                            <div class="container__pictures_big">
                                <img src={data.img[0]}
                                    alt="#" class="container__pictures_big__img" />
                            </div>
                            <div class="container__pictures_other">
                                <ul class="container__pictures_other__list">
                                    <li class="container__pictures_other__item">
                                        <img src={data.img[0]}
                                            alt="#" class="container__pictures_other__img" />
                                    </li>
                                    <li class="container__pictures_other__item">
                                        <img src={data.img[1]}
                                            alt="#" class="container__pictures_other__img" />
                                    </li>
                                    <li class="container__pictures_other__item">
                                        <img src={data.img[2]}
                                            alt="#" class="container__pictures_other__img" />
                                    </li>
                                    <li class="container__pictures_other__item">
                                        <img src={data.img[3]}
                                            alt="#" class="container__pictures_other__img" />
                                    </li>
                                    <li class="container__pictures_other__item">
                                        <img src={data.img[4]}
                                            alt="#" class="container__pictures_other__img" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="container__product">
                            <div class="product__detail">
                                <div class="product__detail__flash">
                                    <span class="product__detail__flash__buy">{data.sold} đã bán</span>
                                </div>
                                <div class="product__detail__wrapper">
                                    <h1 class="product__detail__title">{data.title}</h1>
                                </div>
                                <div class="product__detail__review">
                                    <div class="product__detail__review__star">
                                        <ul class="product__detail__review__star__list">
                                            <li class="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                            <li class="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                            <li class="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                            <li class="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                            <li class="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                        </ul>
                                    </div>
                                    <span class="product__detail__review__text">{data.countReview} Đánh giá</span>

                                </div>
                                <div class="product__detail__band">
                                    <div class="product__detail__band__name">Thương hiệu : </div>
                                    <a href="#" class="product__detail__band__link">{data.brand}</a>
                                </div>
                                <div class="product__detail__price">
                                    <span class="product__detail__price__mormal">{data.normalPrice}</span>
                                    <div class="origin-block">
                                        <span class="product__detail__price__discount">{data.discountPrice}</span>
                                        <span class="product__detail__price__deteted">{data.detectedPrice}</span>
                                    </div>
                                </div>

                                <div class="product__detail__status">
                                    <span class="product__detail__title">
                                        Trạng thái:
                                    </span>
                                    <span class="product__detail__text">
                                        Hàng có sẵn
                                    </span>
                                </div>
                                <div class="product__detail__time-use">
                                    <span class="product__detail__title">
                                        Hạn sử dụng:
                                    </span>
                                    <span class="product__detail__time-use__text">08/2024</span>
                                </div>
                                <div class="product__detail__promotion">
                                    <div class="product__detail__promotion__tag">
                                        <ul class="product__detail__promotion__tag__list">
                                            <li class="product__detail__promotion__tag__item">
                                                <span class="product__detail__promotion__tag__name">Không mùi, không
                                                    ngọt</span>
                                            </li>
                                            <li class="product__detail__promotion__tag__item">
                                                <span class="product__detail__promotion__tag__name">Hỗ trợ tăng cân hiệu
                                                    quả</span>
                                            </li>
                                            <li class="product__detail__promotion__tag__item">
                                                <span class="product__detail__promotion__tag__name">Có thể kết hợp với
                                                    whey để tăng thêm năng lượng</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="product__bar">
                                <div class="product__delivery">
                                    <span class="product__delivery__head">Tùy chọn giao hàng</span>
                                    <div class="product__delivery__local">
                                        <i class="fa-solid fa-location-dot"></i>
                                        <span>
                                            Thái Nguyên, z115, Tân Thịnh, TP.Thái Nguyên
                                        </span>
                                    </div>
                                    <div class="product__delivery__chat">
                                        <i class="fa-solid fa-message"></i>
                                        <a href="../navigation/chatbox.html">Trò chuyện</a>
                                    </div>
                                </div>
                                <div class="product__delivery__ingredient">
                                    <h5 class="product__delivery__ingredient__title">BẢNG THÀNH PHẦN</h5>
                                    <div class="product__delivery__ingredient__table">
                                        <div class="product__delivery__ingredient__box">
                                            <p>Serving Size: 5g (1 teaspoon)</p>
                                            <p>Servings Per Container: 80</p>
                                        </div>
                                        <div class="product__delivery__ingredient__box ">
                                            <div class="product__delivery__ingredient__box--flex">
                                                <p>Amount Per Serving</p>
                                                <p>5g †</p>
                                            </div>
                                        </div>
                                        <div class="product__delivery__ingredient__box">
                                            <p>Creatine Monohydrate</p>
                                        </div>
                                        <div class="product__delivery__ingredient__box">
                                            <p>* % Daily Value is based on a 2,000 calorie diet. Your daily values may
                                                be higher or lower based on your calorie needs.
                                                † Daily Value (DV) not established.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container__more">
                        <h5 class="container__more__title">MÔ TẢ SẢN PHẨM</h5>
                        <p class="container__more__text">{data.detail}</p>
                    </div>
                    <div class="container__message">
                        <div class="container__message__notification">
                            <ul class="container__message__notification__list">
                                <li class="container__message__notification__item">
                                    <span>
                                        Thông tin này chỉ mang tính chất trợ giúp người đọc hiểu hơn về sản phẩm, không
                                        nhằm
                                        mục đích quảng cáo.</span>

                                </li>
                                <li class="container__message__notification__item">
                                    <span>
                                        Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="container__message__use">
                            <h5 class="container__message__title">
                                Hướng dẫn sử dụng:
                            </h5>
                            <p class="container__message__text">Lấy 1 muỗng (5g) hòa tan trong 240ml nước hoặc đồ
                                uống yêu thích của bạn. Tiêu thụ sau khi tập luyện của bạn.</p>
                        </div>
                        <div class="container__message__warring">
                            <h5 class="container__message__title">
                                Lưu ý:
                            </h5>
                            <p class="container__message__text">Không được sử dụng bởi những người có bệnh lí từ
                                trước, những người dùng bất kỳ loại thuốc nào, những người dưới 18 tuổi hoặc tham khảo ý
                                kiến bác sĩ trước khi sử dụng. Tránh xa tầm tay trẻ em và vật nuôi.</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
