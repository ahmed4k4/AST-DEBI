const image = document.getElementById("mapImage");
const canvas = document.getElementById("debugCanvas");
const ctx = canvas.getContext("2d");
const checkbox = document.getElementById("checkbox");

let DEBUG = checkbox.checked;

function loadCanvas() {
  canvas.width = image.clientWidth;
  canvas.height = image.clientHeight;

  canvas.style.display = DEBUG ? "block" : "none";

  if (DEBUG) drawAreas();
}

checkbox.addEventListener("change", () => {
  DEBUG = checkbox.checked;
  loadCanvas();
});

if (image.complete) {
  loadCanvas();
} else {
  image.onload = loadCanvas;
}

window.addEventListener("resize", loadCanvas);

function drawAreas() {
  if (!canvas.width || !canvas.height) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const areas = document.querySelectorAll('area[shape="poly"]');

  areas.forEach((area) => {
    const coords = area.coords.split(",").map(Number);

    ctx.strokeStyle = "rgb(26, 200, 206)";

    ctx.fillStyle = "rgba(40, 228, 81, 0.34)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(coords[0], coords[1]);

    for (let i = 2; i < coords.length; i += 2) {
      ctx.lineTo(coords[i], coords[i + 1]);
    }

    ctx.closePath();

    ctx.fill();
    ctx.stroke();
    const textX = (coords[0] + coords[4]) / 2;
    drawText(area.title, textX, coords[3]);
  });
}

function drawText(text, x, y) {
  ctx.font = "16px Arial";

  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  ctx.fillText(text, x, y - 5);
}

function anywhere() {
  alert("do not click anywhere");
}
