(function () {
    var time = document.createElement('div');
    time.setAttribute('id', 'time');
    var root = document.getElementById('root');
    root.append(time);

    function getTime() {
        const dateTime = new Date();
        let hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const seconds = dateTime.getSeconds();
        let session = "AM";

        if (hours > 12) {
            hours = hours - 12;
            session = 'PM';
        }

        return hours + " : " + minutes + " : " + seconds + ' ' + session;
    }

    function showTime() {
        document.getElementById('time').textContent = getTime();
    }

    setInterval(showTime, 1000);

    showTime();

})();