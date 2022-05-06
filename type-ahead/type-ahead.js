const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const $inputField = document.querySelector('.search');
const $searchListContainer = document.querySelector('.suggestions');

const cities = [];

function debounce(func, wait, immediate) {
    // 'private' variable for instance
    // The returned function will be able to reference this due to closure.
    // Each call to the returned function will share this common timer.
    var timeout;
  
    // Calling debounce returns a new anonymous function
    return function() {
      // reference the context and args for the setTimeout function
      var context = this,
        args = arguments;
  
      // Should the function be called now? If immediate is true
      //   and not already in a timeout then the answer is: Yes
      var callNow = immediate && !timeout;
  
      // This is the basic debounce behaviour where you can call this 
      //   function several times, but it will only execute once 
      //   [before or after imposing a delay]. 
      //   Each time the returned function is called, the timer starts over.
      clearTimeout(timeout);
  
      // Set the new timeout
      timeout = setTimeout(function() {
  
        // Inside the timeout function, clear the timeout variable
        // which will let the next execution run when in 'immediate' mode
        timeout = null;
  
        // Check if the function already ran with the immediate flag
        if (!immediate) {
          // Call the original function with apply
          // apply lets you define the 'this' object as well as the arguments 
          //    (both captured before setTimeout)
          func.apply(context, args);
        }
      }, wait);
  
      // Immediate mode and no wait timer? Execute the function..
      if (callNow) func.apply(context, args);
    }
  }
  

function fetchData(endpoint, cb) {
    return fetch(endpoint).then((blob) => blob.json()).then(data => cb(data));
}

function findMatch(input) {
    if(!input) return []
    const regexP = new RegExp(input, 'gi');
    return cities.filter((place) => {
        return place.city.match(regexP) || place.state.match(regexP);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData(endpoint, (data) => {
        cities.push(...data);
    })

    $inputField.addEventListener('keyup', debounce((e) => {
        const { value } = e.target;
        const matches = findMatch(value);
        const regexP = new RegExp(value, 'gi');
        const html = matches.map((match) => {
            const cityName = value ? match.city.replace(regexP, `<span class='hl'>${value} </span>`) : match.city;
            const stateName = value ? match.state.replace(regexP, `<span class='hl'>${value} </span>`) : match.state;
            return `
                <li>
                    <span class='name'> ${cityName}, ${stateName} </span>
                    <span class='population'> ${match.population} </span>
                </li>
            `
        }).join('');

        $searchListContainer.innerHTML = html;

    }, 300));
});


