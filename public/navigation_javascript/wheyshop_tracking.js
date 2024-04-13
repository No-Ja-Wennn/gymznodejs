const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$('.tab button')
const contents = $$('.content')

tabs.forEach((tab, index) => {
    
    const content = contents[index]

    tab.onclick = function(){
        
        $('.tab button.active').classList.remove('active');
        $('.content.active').classList.remove('active');
        
        this.classList.add('active');
        content.classList.add('active');
    }
})


const editAccount = $('.user-account-edit');
editAccount.onclick = function(){
    window.location.href = 'information_account.html'
}
