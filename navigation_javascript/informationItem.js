// import { loadData } from './loadData.js';

// loadData();
var product = JSON.parse(localStorage.getItem('product'));
// if (!Array.isArray(product)) {
//     product = [];
// }
// console.log(product)
// var dataItem = [
//     img,
//     title,
//     price,
//     count
// ];

// product.push(dataItem);
// localStorage.setItem('product', JSON.stringify(product));


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(< Information data={product} />);

function Information({ data }) {
    return (
        <div>
            <div className="breadcrumb">
                <div className="grid">
                    <ul className="breadcrumb__list">
                        <li className="breadcrumb__item">
                            <span className="breadcrumb__item__text">
                                <a className="breadcrumb__item__link" href="#">Cửa hàng whey</a>
                                <i className="fa-solid fa-chevron-right"></i>
                            </span>
                        </li>
                        <li className="breadcrumb__item">
                            <span className="breadcrumb__item__text">
                                <a className="breadcrumb__item__link" href="#">Dởm whey</a>
                                <i className="fa-solid fa-chevron-right"></i>
                            </span>
                        </li>
                        <li className="breadcrumb__item">
                            <span className="breadcrumb__item__text">
                                <a className="breadcrumb__item__link" href="#">Đểu whey</a>
                            </span>
                        </li>
                        <li className="breadcrumb__item"></li>
                    </ul>
                </div>
            </div>
            <div className="container__block">
                <div className="grid">

                    <div className="container__main">
                        <div className="container__pictures">
                            <div className="container__pictures_big">
                                <div className="container__pictures_big__slide">
                                    <img src={data.img[0]} alt="#" className="container__pictures_big__img" />
                                </div>
                                <div className="container__pictures_big__slide">
                                    <img src={data.img[1]} alt="#"
                                        className="container__pictures_big__img" />
                                </div>
                                <div className="container__pictures_big__slide">
                                    <img src={data.img[2]} alt="#"
                                        className="container__pictures_big__img" />
                                </div>
                                <div className="container__pictures_big__slide">
                                    <img src={data.img[3]} alt="#"
                                        className="container__pictures_big__img" />
                                </div>
                                <div className="container__pictures_big__slide">
                                    <img src={data.img[4]} alt="#"
                                        className="container__pictures_big__img" />
                                </div>
                            </div>
                            <div className="container__pictures_other">
                                <ul className="container__pictures_other__list">
                                    <li className="container__pictures_other__item">
                                        <img src={data.img[0]}
                                            alt="#" className="container__pictures_other__img" onClick={() => {
                                                currentSlide(1)
                                            }} />

                                    </li>
                                    <li className="container__pictures_other__item">
                                        <img src={data.img[1]}
                                            alt="#" className="container__pictures_other__img" onClick={() => {
                                                currentSlide(2)
                                            }} />

                                    </li>
                                    <li className="container__pictures_other__item">
                                        <img src={data.img[2]}
                                            alt="#" className="container__pictures_other__img" onClick={() => {
                                                currentSlide(3)
                                            }} />

                                    </li>
                                    <li className="container__pictures_other__item">
                                        <img src={data.img[3]}
                                            alt="#" className="container__pictures_other__img" onClick={() => {
                                                currentSlide(4)
                                            }} />

                                    </li>
                                    <li className="container__pictures_other__item">
                                        <img src={data.img[4]}
                                            alt="#" className="container__pictures_other__img" onClick={() => {
                                                currentSlide(5)
                                            }} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="container__product">
                            <div className="product__detail">
                                <div className="product__detail__flash">
                                    <span className="product__detail__flash__buy">{data.sold} đã bán</span>
                                </div>
                                <div className="product__detail__wrapper">
                                    <h1 className="product__detail__title">{data.title}</h1>
                                </div>
                                <div className="product__detail__review">
                                    <div className="product__detail__review__star">
                                        <ul className="product__detail__review__star__list">
                                            <li className="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                            <li className="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                            <li className="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                            <li className="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                            <li className="product__detail__review__star__item">
                                                <img src="../img/icon/star.png" alt="" />
                                            </li>
                                        </ul>
                                    </div>
                                    <span className="product__detail__review__text">{data.countReview} Đánh giá</span>

                                </div>
                                <div className="product__detail__band">
                                    <div className="product__detail__band__name">Thương hiệu : </div>
                                    <a href="#" className="product__detail__band__link">{data.brand}</a>
                                </div>
                                <div className="product__detail__price">
                                    <span className="product__detail__price__mormal">{data.normalPrice}</span>
                                    <div className="origin-block">
                                        <span className="product__detail__price__discount">{data.discountPrice}</span>
                                        <span className="product__detail__price__deteted">{data.detectedPrice}</span>
                                    </div>
                                </div>

                                <div className="product__detail__status">
                                    <span className="product__detail__title">
                                        Trạng thái:
                                    </span>
                                    <span className="product__detail__text">
                                        Hàng có sẵn
                                    </span>
                                </div>
                                <div className="product__detail__time-use">
                                    <span className="product__detail__title">
                                        Hạn sử dụng:
                                    </span>
                                    <span className="product__detail__time-use__text">08/2024</span>
                                </div>
                                <div className="product__detail__promotion">
                                    <div className="product__detail__promotion__tag">
                                        <ul className="product__detail__promotion__tag__list">
                                            <li className="product__detail__promotion__tag__item">
                                                <span className="product__detail__promotion__tag__name">Không mùi, không
                                                    ngọt</span>
                                            </li>
                                            <li className="product__detail__promotion__tag__item">
                                                <span className="product__detail__promotion__tag__name">Hỗ trợ tăng cân hiệu
                                                    quả</span>
                                            </li>
                                            <li className="product__detail__promotion__tag__item">
                                                <span className="product__detail__promotion__tag__name">Có thể kết hợp với
                                                    whey để tăng thêm năng lượng</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="product__bar">
                                <div className="product__delivery">
                                    <span className="product__delivery__head">Tùy chọn giao hàng</span>
                                    <div className="product__delivery__local">
                                        <i className="fa-solid fa-location-dot"></i>
                                        <span>
                                            Thái Nguyên, z115, Tân Thịnh, TP.Thái Nguyên
                                        </span>
                                    </div>
                                    <div className="product__delivery__chat">
                                        <i className="fa-solid fa-message"></i>
                                        <a href="../navigation/chatbox.html">Trò chuyện</a>
                                    </div>
                                </div>
                                <div className="product__delivery__ingredient">
                                    <h5 className="product__delivery__ingredient__title">BẢNG THÀNH PHẦN</h5>
                                    <div className="product__delivery__ingredient__table">
                                        <div className="product__delivery__ingredient__box">
                                            <p>Serving Size: 5g (1 teaspoon)</p>
                                            <p>Servings Per Container: 80</p>
                                        </div>
                                        <div className="product__delivery__ingredient__box ">
                                            <div className="product__delivery__ingredient__box--flex">
                                                <p>Amount Per Serving</p>
                                                <p>5g †</p>
                                            </div>
                                        </div>
                                        <div className="product__delivery__ingredient__box">
                                            <p>Creatine Monohydrate</p>
                                        </div>
                                        <div className="product__delivery__ingredient__box">
                                            <p>* % Daily Value is based on a 2,000 calorie diet. Your daily values may
                                                be higher or lower based on your calorie needs.
                                                † Daily Value (DV) not established.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container__more">
                        <h5 className="container__more__title">MÔ TẢ SẢN PHẨM</h5>
                        <p className="container__more__text">{data.detail}</p>
                    </div>
                    <div className="container__message">
                        <div className="container__message__notification">
                            <ul className="container__message__notification__list">
                                <li className="container__message__notification__item">
                                    <span>
                                        Thông tin này chỉ mang tính chất trợ giúp người đọc hiểu hơn về sản phẩm, không
                                        nhằm
                                        mục đích quảng cáo.</span>

                                </li>
                                <li className="container__message__notification__item">
                                    <span>
                                        Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="container__message__use">
                            <h5 className="container__message__title">
                                Hướng dẫn sử dụng:
                            </h5>
                            <p className="container__message__text">Lấy 1 muỗng (5g) hòa tan trong 240ml nước hoặc đồ
                                uống yêu thích của bạn. Tiêu thụ sau khi tập luyện của bạn.</p>
                        </div>
                        <div className="container__message__warring">
                            <h5 className="container__message__title">
                                Lưu ý:
                            </h5>
                            <p className="container__message__text">Không được sử dụng bởi những người có bệnh lí từ
                                trước, những người dùng bất kỳ loại thuốc nào, những người dưới 18 tuổi hoặc tham khảo ý
                                kiến bác sĩ trước khi sử dụng. Tránh xa tầm tay trẻ em và vật nuôi.</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}


// slide show
let slideIndex = 1;

setTimeout(()=>{
    showSlides(slideIndex);
}, 1);


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("container__pictures_big__slide");
    let dots = document.getElementsByClassName("container__pictures_other__img");
    
    //   let captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    // console.log("n = ", slides);
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    // console.log(slides[slideIndex - 1])
    dots[slideIndex - 1].className += " active";
    //   captionText.innerHTML = dots[slideIndex-1].alt;
}
