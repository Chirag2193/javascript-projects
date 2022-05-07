document.addEventListener("DOMContentLoaded", function(){
    const panels = document.querySelectorAll('.panel');

    function toggleOpen(e) {
        const { currentTarget } = e;

        currentTarget.classList.toggle('open');
    }

    function toggleOpenActivity(e) {
        const { propertyName, target } = e;

        if(propertyName === 'flex-grow' || propertyName === 'flex') {
            target.classList.toggle('open-activity');
        }
    }

    panels.forEach((panel) => panel.addEventListener('click', toggleOpen));
    panels.forEach((panel) => panel.addEventListener('transitionend', toggleOpenActivity));
});