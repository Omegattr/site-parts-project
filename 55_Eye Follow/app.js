document.querySelector("body").addEventListener("mousemove", eyeball);

function eyeball(event) {
  let eyes = document.querySelectorAll(".eye");
  eyes.forEach((eye) => {
    let rect = eye.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;
    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rotate = radian * (180 / Math.PI) * -1 + 270;
    eye.style.transform = `rotate(${rotate}deg)`;
  });
}
