var spans = document.querySelectorAll('.char');
var previousChar;
spans[1].classList.add('active');

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight'
        exactPosition = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 15;
        roundPercent = Math.round(exactPosition);
    console.log(roundPercent);
    if ( roundPercent == 0) {
      spans[1].classList.add('active');
      return
  }
    if (previousChar != roundPercent) {
        document.querySelector('.active').classList.remove('active');
        spans[roundPercent].classList.add('active');
        return
    }
    previousChar = roundPercent;
}


// The debounce function receives our function as a parameter
const debounce = (fn) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;

    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {

      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) {
        cancelAnimationFrame(frame);
      }

      // Queue our function call for the next frame
      frame = requestAnimationFrame(() => {

        // Call our function and pass any params we received
        fn(...params);
      });

    }
  };


  // Reads out the scroll position and stores it in the data attribute
  // so we can use it in our stylesheets
  const storeScroll = () => {
    // document.documentElement.dataset.scroll = window.scrollY;
    getScrollPercent()
  }

  // Listen for new scroll events, here we debounce our `storeScroll` function
  document.addEventListener('scroll', debounce(storeScroll), { passive: true });

  // Update scroll position for first time
  storeScroll();