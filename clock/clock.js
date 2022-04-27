(function () {
    var time = document.createElement('div');
    time.setAttribute('id', 'time');
    var root = document.getElementById('root');
    root.append(time);

    function getTime() {
        var dateTime = new Date();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var seconds = dateTime.getSeconds();
        var session = "AM";

        if(hours > 12) {
            hours = hours - 12;
            session = 'PM';
        }

        return hours + " : " + minutes + " : " + seconds + ' '  + session;
    }

    function showTime() {
        document.getElementById('time').textContent = getTime();
    }

    setInterval(showTime, 1000);

    showTime();

})();