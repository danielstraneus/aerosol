let reset = function () {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext("2d");

  let mouseX;
  let mouseY;

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const maxRadius = 35;

  canvas.onmousemove = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Circle {
    constructor(xCoordinate, yCoordinate, radius) {
      const randomNumber = Math.floor(Math.random() * 4);
      const randomTrueOrFalse = Math.floor(Math.random() * 4);

      this.xCoordinate = xCoordinate;
      this.yCoordinate = yCoordinate;
      this.radius = radius / 2;
      this.color = colorArray[randomNumber];

      if (randomTrueOrFalse == 1) {
        this.xVelocity = -Math.random() * 0.5;
      } else {
        this.xVelocity = Math.random() * 0.5;
      }

      if (randomTrueOrFalse == 1) {
        this.yVelocity = -Math.random() * 0.5;
      } else {
        this.yVelocity = Math.random() * 0.5;
      }

      this.update = function () {
        this.xCoordinate += this.xVelocity;
        const xDistance = mouseX - this.xCoordinate;
        const yDistance = mouseY - this.yCoordinate;
        const originalRadius = radius / 2;
        this.yCoordinate += this.yVelocity;

        this.draw();
      };

      this.draw = function () {
        c.beginPath();
        c.arc(
          this.xCoordinate,
          this.yCoordinate,
          Math.abs(this.radius),
          0,
          Math.PI * 2
        );
        c.fillStyle = this.color;
        c.fill();
      };
    }
  }

  const colorArray = [
    "rgba(0, 0, 0, 0.2)",
    "rgba(255, 255, 255, 0.7)",
    "rgba(150, 150, 150, 0.4)",
    "rgba(0, 0, 0, 0.5)",
  ];
  const myCircle = new Circle(30, 80, 10);
  let circleArray = [];

  for (let i = 0; i < 5000; i++) {
    const randomXCoordinate = Math.random() * canvasWidth;
    const randomYCoordinate = Math.random() * canvasHeight;
    const randomRadius = Math.random() * 9;
    circleArray.push(
      new Circle(randomXCoordinate, randomYCoordinate, randomRadius)
    );
  }

  function updateAll() {
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    myCircle.update();
    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
    window.requestAnimationFrame(updateAll);
  }
  updateAll();
};

document.getElementById("button").addEventListener("click", reset);
