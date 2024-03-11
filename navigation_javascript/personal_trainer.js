var button1 = document.querySelector('#button1');
var button2 = document.querySelector('#button2');
var cancel = document.querySelector('.cancel');
var form = document.querySelector('.form');

if(button1)
button1.addEventListener('click', function(){
    form.style.display = 'flex';
});

if(cancel)
cancel.addEventListener('click', function(){
    form.style.display = 'none';
})
