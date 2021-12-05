console.log('client side loaded this thang');

const weatherForm = document.querySelector('form');
const searchBar = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

//messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchBar.value;
    //console.log(location);

    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
            } else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
            
        });
    });

})

