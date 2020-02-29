function EditRow(e) {
  let tblName = e.target.parentElement.parentElement.children[0].children[0],
    tblPhone = e.target.parentElement.parentElement.children[1].children[0];

  if (e.target.innerHTML === 'Edit') {
    e.target.innerHTML = 'Save';
    tblName.removeAttribute('readonly');
    tblPhone.removeAttribute('readonly');
    tblName.classList.add('table__name-focus');
    tblPhone.classList.add('table__phone-focus');
  } else {

    if (tblName.value !== ''
      && tblPhone.value.match('^(8|\\+7)[\\- ]?\\d{3}[\\- ]?\\d{3}[\\- ]?\\d{2}[\\- ]?\\d{2}$') != null) {
      document.getElementsByClassName('error__text')[0].style.display = "none";
      e.target.innerHTML = 'Edit';
      tblName.setAttribute('readonly', 'readonly');
      tblPhone.setAttribute('readonly', 'readonly');
      tblName.classList.remove('table__name-focus');
      tblPhone.classList.remove('table__phone-focus');
    } else {
      document.getElementsByClassName('error__text')[0].style.display = "block";
    }
  }
}

DeleteRow = (e) => {
  document.getElementsByClassName('table__body')[0].removeChild(e.target.parentElement.parentElement);
  document.getElementsByClassName('error__text')[0].style.display = "none";
};

function AddRow() {
  if (document.getElementsByClassName('add__phone')[0].value.match('^(8|\\+7)[\\- ]?\\d{3}[\\- ]?\\d{3}[\\- ]?\\d{2}[\\- ]?\\d{2}$') != null
    && document.getElementsByClassName('add__name')[0].value !== '') {

    document.getElementsByClassName('error__text')[0].style.display = "none";

    let tblRow = `<td><input class=\"table__name\" type=\"text\" value=\"${document.getElementsByClassName('add__name')[0].value}\" readonly></td>\n` +
      `        <td><input class=\"table__phone\" type=\"text\" value=\"${document.getElementsByClassName('add__phone')[0].value}\" readonly></td>\n` +
      "        <td>\n" +
      "          <button class=\"table__edit\" onclick=\"EditRow(event)\">Edit</button>\n" +
      "          <button class=\"table__del\" onclick=\"DeleteRow(event)\">Delete</button>\n" +
      "        </td>\n",
      childNode = document.createElement('tr');

    childNode.classList.add("table__row");
    childNode.innerHTML = tblRow;
    document.getElementsByClassName('table__body')[0].appendChild(childNode);
  } else {
    document.getElementsByClassName('error__text')[0].style.display = "block";
  }
}

document.addEventListener('DOMContentLoaded', function () {

  let canvasBig = document.getElementsByClassName("canvas-big")[0],
    ctxBig = canvasBig.getContext("2d"),
    canvasSmall = document.getElementsByClassName("canvas-small")[0],
    ctxSmall = canvasSmall.getContext("2d");

  function strokeStar(x, y, r, n, inset, color) {
    ctxBig.save();
    ctxBig.beginPath();
    ctxBig.translate(x, y);
    ctxBig.moveTo(0, 0 - r);
    for (let i = 0; i < n; i++) {
      ctxBig.rotate(Math.PI / n);
      ctxBig.lineTo(0, 0 - (r * inset));
      ctxBig.rotate(Math.PI / n);
      ctxBig.lineTo(0, 0 - r);
    }
    ctxBig.closePath();
    ctxBig.fillStyle = color;
    ctxBig.fill();
    ctxBig.restore();
  }

  ctxBig.fillStyle = "rgb(255,255,255)";
  ctxBig.fillRect(0, 0, 600, 600);

  strokeStar(100, 100, 20, 5, 2.2, '#b00');
  strokeStar(200, 200, 20, 5, 2.2, '#37a0f6');
  strokeStar(300, 300, 20, 5, 2.2, '#56ba32');
  strokeStar(400, 400, 20, 5, 2.2, '#ffbf00');
  strokeStar(500, 500, 20, 5, 2.2, '#000');

  function findPos(obj) {
    let curleft = 0,
      curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj == obj.offsetParent);
      return {x: curleft, y: curtop};
    }
    return undefined;
  }

  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  canvasBig.addEventListener('click', function (e) {
    let pos = findPos(this),
      x = e.pageX - pos.x,
      y = e.pageY - pos.y,
      c = this.getContext('2d'),
      p = c.getImageData(x, y, 1, 1).data,
      hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    console.log(hex);
    ctxSmall.fillStyle = `rgb(${p[0]},${p[1]},${p[2]})`;
    ctxSmall.fillRect(0, 0, 600, 50);
  });

});