

/**zarları seçme ve geri koyma */
let donuyor = true;

document.body.querySelector('.grid-container').classList.add("blur");
document.body.querySelector(".rollDice").disabled = true;

function basla() {
  document.body.querySelector('.grid-container').classList.remove("blur");
  document.body.querySelector('.gameBegin').style.display = "none";
  document.body.querySelector(".rollDice").disabled = false;
  document.getElementById("puan-tablo").querySelectorAll("tr")[0].querySelectorAll("th")[1].classList.add("blink");
}

document.body.addEventListener("click", function (evt) {
  if (turSayisi < 3 && !donuyor && turSayisi > 0) {
    if (evt.target.className === "zar" && evt.target.parentNode.className === "zarlar") {
      evt.target.classList.add("selectedZar");

    } else if (evt.target.classList.contains("zar") && evt.target.classList.contains("selectedZar")) {
      evt.target.classList.remove("selectedZar");
    }
    if (document.querySelectorAll(".selectedZar").length === 5) {

      document.body.querySelector(".rollDice").disabled = true;
    } else {
      document.body.querySelector(".rollDice").disabled = false;
    }
  }
}, false);
/**!zarları seçme ve geri koyma */

/**puan yeri seçme */

document.querySelectorAll("td").forEach((cell) => {
  cell.addEventListener("click", () => {
    if ((cell.className === "point" && !donuyor) || turSayisi === 3) {
      var tiklananKolon = cell.cellIndex;
      console.log(tiklananKolon + " " + oyuncu);
      if (tiklananKolon === oyuncu) {
        if (cell.innerText == "0") {
          if (!confirm("Seçilen değer sıfırdır. Seçildiği taktirde 0 olarak kalacak ve tekrar seçilmeyecektir. Emin misiniz?")) {
            return false;
          }
        }
        if (oyuncu === 2)
          genelTur = genelTur + 1;
        cell.classList.add("selected");
        totalHesaplama(oyuncu);

        document.getElementById("donecekZar").querySelectorAll(".zar").forEach((zar) => {
          zar.classList.remove("selectedZar");
        });

        for (let i = 1; i <= 6; i++) {
          //seçilmeyen puanları resetle
          var puanYeri = document.getElementById("puan-tablo").querySelectorAll("tr")[i].querySelectorAll("td")[oyuncu];
          if (!puanYeri.classList.contains("selected")) {
            puanYeri.innerText = 0;
          }
        }

        for (let i = 1; i <= 7; i++) {
          var puanYeri = document.getElementById("puan-tablo").querySelectorAll("tr")[i + 10].querySelectorAll("td")[oyuncu];
          if (!puanYeri.classList.contains("selected")) {
            puanYeri.innerText = 0;
          }
        }

        turSayisi = 0;

        document.getElementById("puan-tablo").querySelectorAll("tr")[0].querySelectorAll("th")[oyuncu].classList.remove("blink");
        oyuncu = oyuncu == 1 ? 2 : 1;
        document.getElementById("puan-tablo").querySelectorAll("tr")[0].querySelectorAll("th")[oyuncu].classList.add("blink");

        document.body.querySelector(".rollDice").disabled = false;
        donuyor = false;
        document.body.querySelector("h2").innerText = "TUR SAYISI: " + turSayisi;
      } else {
        alert("Oyun sırası sende değil");
      }
    }
    if (genelTur > 13) {//OYUN BİTTİ
      var hucreler = document.getElementById("puan-tablo").querySelectorAll("tr");
      var kazanan = Number(hucreler[22].querySelectorAll("td")[1].innerText) > Number(hucreler[22].querySelectorAll("td")[2].innerText) ? 1 : 2;


      document.body.querySelector('.gameOver').querySelectorAll('tr')[1].querySelector('td').innerText = "Oyun Bitti. Oyuncu " + kazanan + " kazandı";
      document.body.querySelector('.gameOver').style.display = "block";
      document.body.querySelector('.grid-container').classList.add("blur");



      var yeniButon = document.createElement("button");

      yeniButon.innerText = "Yeni Oyun!";
      yeniButon.addEventListener("click", function (evt) {
        location.reload();
      });
      document.body.querySelector('.gameOver').querySelectorAll('tr')[1].querySelector('td').appendChild(yeniButon);

      document.querySelectorAll("td").forEach((cell) => {
        cell.addEventListener("click", () => { });
      });


    }
  });
});

/**zarları yeri seçme */

/*zarları atar*/
document.body.querySelector(".rollDice").addEventListener("click", function (evt) {

  evt.target.disabled = true;
  donuyor = true;
  let count = 0;

  (function () {//zarların dönmesini sağlar
    const collection = document.getElementsByClassName("zarlar")[0].getElementsByClassName("zar");
    for (i = 0; i < collection.length; i++) {
      if (!collection[i].classList.contains("selectedZar"))
        collection[i].id = "zar" + (Math.floor(Math.random() * 6) + 1);
    }
    count++;
    if (count == 25) {


      evt.target.disabled = false;
      donuyor = false;
      turSayisi++;
      if (turSayisi >= 3) {
        evt.target.disabled = true;
        donuyor = true;
        document.getElementById("donecekZar").querySelectorAll(".zar").forEach((zar) => {
          zar.classList.add("selectedZar");
        });
      }

      hesapla(); //calculations.js
      document.body.querySelector("h2").innerText = "TUR SAYISI: " + turSayisi;
      return;
    }
    setTimeout(arguments.callee, 100);

  })();

}, false);
/*!zarları atar */
