const jsonPath = '../data/shopData.json';
let myData = {};

fetch(jsonPath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        myData = data;
        // console.log(myData);
        root.render(<App dataWhey={myData.dataWhey} dataEquipment={myData.dataEquipment} />);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    }
    );

const root = ReactDOM.createRoot(document.getElementById("root"));

const ProductItemWhey = product => {
    product = product.product
    console.log(product)
    return (
        <div class="container__danhmucsanpham" onClick={()=>{
            root.render(<Information data={product}/>);
        }}>
            <img src={product.img && product.img[0]} alt="" />
            <div class="info-top-left">Số lượng: {product.amount}</div>
            <div class="info-top-right">Đã bán: {product.sold}</div>
            <h2>{product.title}</h2>
            <h1>{product.priceStart} - {product.priceEnd}</h1>
        </div>
    );
}

function App({ dataWhey, dataEquipment }) {
    return (
        <div class="container__sanpham">
            <h1>SẢN PHẨM GIÚP PHÁT TRIỂN CƠ THỂ</h1>
            <div class="parent__container">
                {dataWhey.map(product => (
                    <ProductItemWhey
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            <div class="container__danhmucsanpham_tadon">
                <h1>Dụng Cụ Tập Luyện</h1>
            </div>
            <div class="parent__container">
                {dataEquipment.map(product => (
                    <ProductItemWhey
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}



function Information({data}) {
    // console.log(data)
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
                                    <div class="product__detail__flash__time">
                                        <span class="product__detail__flash__time__text">Kết thúc sau</span>
                                        <span class="product__detail__flash__time__real">09:17:37</span>
                                    </div>
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
                                <div class="product__detail__promotion">
                                    <h6 class="product__detail__promotion__title">Khuyến mãi</h6>
                                    <div class="product__detail__promotion__tag">
                                        <ul class="product__detail__promotion__tag__list">
                                            <li class="product__detail__promotion__tag__item">
                                                <span class="product__detail__promotion__tag__name">🔥MUA MỘT TẶNG MỘT TÍNH TIỀN HAiiiiiiiiiiiiiiii🔥</span>
                                            </li>
                                            <li class="product__detail__promotion__tag__item">
                                                <span class="product__detail__promotion__tag__name">🔥MUA MỘT TẶNG MỘT TÍNH TIỀN HAI🔥</span>
                                            </li>
                                            <li class="product__detail__promotion__tag__item">
                                                <span class="product__detail__promotion__tag__name">🔥MUA MỘT TẶNG MỘT TÍNH TIỀN HAI🔥</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
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
                        </div>
                    </div>
                    <div class="container__more">
                        <h5 class="container__more__title">{data.title}</h5>
                        <p class="container__more__text">{data.detail}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}


