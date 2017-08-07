if ('geolocation' in navigator) {
    console.log('Geolocation is available');
    // getCurrentPosition();
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
    });
}


document.querySelector('.js-watch').addEventListener('click', () => {
    var watchId = navigator.geolocation.watchPosition((position) => {
       console.log(position)
    });
}, false);
