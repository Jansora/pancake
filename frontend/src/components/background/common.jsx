import React from 'react';

const Background = () => {


  React.useEffect(() => {

    var canvas = document.getElementById('space')

    var c = canvas.getContext('2d')

    var numStars = 1000
    var radius = '0.' + Math.floor(Math.random() * 9) + 1;
    var focalLength = canvas.width * 2;

    var centerX, centerY;

    var stars = [];
    var star;
    var i;

    var animate = true;




    function executeFrame () {
      if (animate) window.requestAnimationFrame(executeFrame);
      moveStars();
      drawStars()
    }

    function initializeStars () {

      centerX = canvas.width / 2;
      centerY = canvas.height / 2;

      stars = [];
      for (i = 0; i < numStars; i++) {
        star = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * canvas.width,
          o: '0.' + Math.floor(Math.random() * 99) + 1
        };
        stars.push(star)
      }
    }

    function moveStars () {
      for (i = 0; i < numStars; i++) {
        star = stars[i];
        star.z--;

        if (star.z <= 0) {
          star.z = canvas.width
        }
      }
    }

    function drawStars () {
      var pixelX, pixelY, pixelRadius;

      // Resize to the screen
      if (canvas.width !== window.innerWidth || canvas.width !== window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars()
      }

      c.fillStyle = 'rgba(255, 255, 255,1)'
      c.fillRect(0, 0, canvas.width, canvas.height);
      // c.fillStyle = 'rgba(62,175,125, ' + radius + ')'
      c.fillStyle = 'rgba(0,0,0, ' + radius + ')';
      for (i = 0; i < numStars; i++) {
        star = stars[i]

        pixelX = (star.x - centerX) * (focalLength / star.z);
        pixelX += centerX
        pixelY = (star.y - centerY) * (focalLength / star.z);
        pixelY += centerY
        pixelRadius = (focalLength / star.z);

        c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
        c.fillStyle = 'rgba(0,0,0, ' + star.o + ')'
        // c.fill()
      }
    }
    initializeStars();
    executeFrame();

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      /**
       * Your drawings need to be inside this function otherwise they will be reset when
       * you resize the browser window and the canvas goes will be cleared.
       */
      drawStars();
    }

  }, );




  const style = {
    "width":"100vw",
    "height":"100vh",
    "display": "block",
    "top": 0,
    "position":"fixed",
    "zIndex": -2,
  }

  return <canvas id="space" style={style}> </canvas>



}

export default Background;


