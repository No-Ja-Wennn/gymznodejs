var jsonPath = '../data/shopData.json';
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
    // console.log(product)
    return (
        <div className="container__danhmucsanpham" onClick={
            () => {
                // Lưu thông tin sản phẩm vào localStorage
                localStorage.setItem('product', JSON.stringify(product));

                // Chuyển hướng đến trang mới
                window.location.href = '../navigation/informationItem.html';
                // root.render(<Information data={product} />);
            }
        }>
            <img src={product.img && product.img[0]} alt="" />
            <div className="info-top-left">Số lượng: {product.amount}</div>
            <div className="info-top-right">Đã bán: {product.sold}</div>
            <h2>{product.title}</h2>
            <h1>{product.priceStart} - {product.priceEnd}</h1>
        </div>
    );
}

function App({ dataWhey, dataEquipment }) {
    return (
        <div className="container__sanpham">
            <h1>SẢN PHẨM GIÚP PHÁT TRIỂN CƠ THỂ</h1>
            <div className="parent__container">
                {dataWhey.map(product => (
                    <ProductItemWhey
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            <div className="container__danhmucsanpham_tadon">
                <h1>Dụng Cụ Tập Luyện</h1>
            </div>
            <div className="parent__container">
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





