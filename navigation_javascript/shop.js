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
        console.log(myData);
        root.render(<App dataWhey={myData.dataWhey} dataEquipment={myData.dataEquipment} />);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    }
);

const root = ReactDOM.createRoot(document.getElementById("root"));

const ProductItemWhey = props => {
    return (
        <div class="container__danhmucsanpham"> 
            <img src={props.img} alt="" />
            <div class="info-top-left">Số lượng: {props.amount}</div>
            <div class="info-top-right">Đã bán: {props.sold}</div>
            <h2>{props.title}</h2>
            <h1>{props.priceStart} - {props.priceEnd}</h1>
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
                        img={product.img[0]}
                        amount={product.amount}
                        sold={product.sold}
                        title={product.title}
                        priceStart={product.priceStart}
                        priceEnd={product.priceEnd}
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
                        img={product.img[0]}
                        amount={product.amount}
                        sold={product.sold}
                        title={product.title}
                        priceStart={product.priceStart}
                        priceEnd={product.priceEnd}
                    />
                ))}
            </div>
        </div>
    );
}
