function loadData() {
    const jsonPathAccount = '../data/loginData.json';

    const jsonPathCard = '../data/carddata.json';
    const jsonPathCalendar = '../data/calendarData.json';
    const jsonPathShop = '../data/shopData.json';
    let myData;
    if (!localStorage.getItem('cardData')) {
        fetch(jsonPathCard)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                myData = data;
                localStorage.setItem('cardData', JSON.stringify(myData));
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    /*   ====    */
    if (!localStorage.getItem('loginData')) {
        fetch(jsonPathAccount)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                myData = data;
                // Lưu dữ liệu vào localStorage
                localStorage.setItem('loginData', JSON.stringify(myData));
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
    
    /*   ====    */
    if (!localStorage.getItem('calendarData')) {
        fetch(jsonPathCalendar)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                myData = data;
                // Lưu dữ liệu vào localStorage
                localStorage.setItem('calendarData', JSON.stringify(myData));
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    // 
    if (!localStorage.getItem('product')) {
        fetch(jsonPathShop)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                myData = data;
                localStorage.setItem('product', JSON.stringify(myData));
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }


    var dataHistoryMessage = JSON.parse(localStorage.getItem('historyMessage'));
    if(!dataHistoryMessage){
        dataHistoryMessage = {
            messages: []
        }
        localStorage.setItem('historyMessage', JSON.stringify(dataHistoryMessage));
    }
}

export {loadData};