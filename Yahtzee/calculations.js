function hesapla() {
  const zarlar = document.body.querySelectorAll(".zar");
  const zarNumalari = [];
  zarlar.forEach((element) => {
    zarNumalari.push(+element.id.charAt(element.id.length - 1)); //atılan zarları alır
  });
  upperHesapla(zarNumalari, oyuncu);
  lowerHesapla(zarNumalari, oyuncu);

}

function totalHesaplama(player) {
  var upperPuan = 0;
  for (let i = 1; i <= 6; i++) {
    var puanYeri = document.getElementById("puan-tablo").querySelectorAll("tr")[i].querySelectorAll("td")[player];
    if (puanYeri.classList.contains("selected")) {
      upperPuan = upperPuan + Number(puanYeri.innerText);
    }
  }

  if (upperPuan >= 63) {
    document.getElementById("puan-tablo").querySelectorAll("tr")[9].querySelectorAll("td")[player].innerText = 35;
  }

  document.getElementById("puan-tablo").querySelectorAll("tr")[8].querySelectorAll("td")[player].innerText = upperPuan;

  /**----------------------- */

  var lowerPuan = 0;
  for (let i = 1; i <= 8; i++) {
    var puanYeri = document.getElementById("puan-tablo").querySelectorAll("tr")[i + 10].querySelectorAll("td")[player];
    if (puanYeri.classList.contains("selected") || puanYeri.classList.contains("yahtzeeBonus")) {
      lowerPuan = lowerPuan + Number(puanYeri.innerText);
    }
  }
  document.getElementById("puan-tablo").querySelectorAll("tr")[20].querySelectorAll("td")[player].innerText = lowerPuan;

  var totalPuan = lowerPuan + upperPuan;
  document.getElementById("puan-tablo").querySelectorAll("tr")[22].querySelectorAll("td")[player].innerText = totalPuan;
}
//UPPER HESAPLAMA
function upperHesapla(zarNumalari, player) {
  const upperHesaplama = [0, 0, 0, 0, 0, 0];

  zarNumalari.forEach((zar) => {
    upperHesaplama[zar - 1] = upperHesaplama[zar - 1] + zar;
  });

  for (let i = 1; i <= 6; i++) {
    var puanYeri = document.getElementById("puan-tablo").querySelectorAll("tr")[i].querySelectorAll("td")[player];

    if (!puanYeri.classList.contains("selected")) {
      puanYeri.innerText = upperHesaplama[i - 1]; /* ("td")[oyuncu numarası] */
    }
  }
}

function lowerHesapla(zarNumalari, player) {
  //soralama                                            0    1      2         3     4     5       6     7
  const lowerHesaplama = [0, 0, 0, 0, 0, 0, 0, 0]; // three four full-house small large chance yahtzee ybonus

  zarNumalari.forEach((zar) => {
    //chance hesaplama
    lowerHesaplama[5] = lowerHesaplama[5] + zar;
  });

  //yahtzee hesaplama
  var same = 0;
  var zarNo = 0;
  zarNumalari.forEach((zar) => {
    if (zarNo === 0 && same === 0) {
      zarNo = zar;
      return;
    }

    if (zarNo === zar) return;
    else same = -1;
  });

  if (same !== -1) {

    lowerHesaplama[6] = 50;

    var yahtzeeHucre = document.getElementById("puan-tablo").querySelectorAll("tr")[17].querySelectorAll("td")[player];

    const yahtzeeBonus = document.getElementById("puan-tablo").querySelectorAll("tr")[18].querySelectorAll("td")[player];

    if (yahtzeeHucre.classList.contains("selected") && yahtzeeHucre.innerText === "0") {
      //no yahtzee bonus
    } else {
      if (yahtzeeHucre.classList.contains("selected") && yahtzeeHucre.innerText === "50") {
        console.log("BONUS")
        lowerHesaplama[7] = Number(yahtzeeBonus.innerText) + 100;
      }
    }
  }
  //!yahtzee hesaplama

  //buyuk duz ve kucuk duz
  let zarDuzeni = new Array(6).fill(false);
  zarNumalari.forEach((zar) => {
    zarDuzeni[zar - 1] = true;
  });

  if ((zarDuzeni[0] == true && zarDuzeni[1] == true && zarDuzeni[2] == true && zarDuzeni[3] == true && zarDuzeni[4] == true) ||
    (zarDuzeni[1] == true && zarDuzeni[2] == true && zarDuzeni[3] == true && zarDuzeni[4] == true && zarDuzeni[5] == true)) {
    lowerHesaplama[4] = 40;
  }

  if ((zarDuzeni[0] == true && zarDuzeni[1] == true && zarDuzeni[2] == true && zarDuzeni[3] == true) ||
    (zarDuzeni[1] == true && zarDuzeni[2] == true && zarDuzeni[3] == true && zarDuzeni[4] == true) ||
    (zarDuzeni[2] == true && zarDuzeni[3] == true && zarDuzeni[4] == true && zarDuzeni[5] == true)) {
    lowerHesaplama[3] = 30;
  }

  //!!!buyuk duz ve kucuk duz

  //3 ve 4 tür
  zarNumalari.forEach((zar, i) => {
    var puan = zar;
    var ayniZarlar = 1;
    zarNumalari.forEach((diger_zar, j) => {
      if (i === j) return;

      puan = puan + diger_zar;
      if (zar === diger_zar) ayniZarlar++;
    });

    if (ayniZarlar >= 3) lowerHesaplama[0] = puan;
    if (ayniZarlar >= 4) lowerHesaplama[1] = puan;
  });

  //!3 ve 4 tür

  //full house
  zarNumalari.forEach((zar, i) => {
    var ayniZarlar = 1;

    zarNumalari.forEach((diger_zar, j) => {
      if (i === j) return;
      if (zar === diger_zar) ayniZarlar++;
    });

    if (ayniZarlar === 3) {
      var ikinciZar = -1;
      var ikinciTur = 1;

      zarNumalari.forEach((diger_zar) => {
        if (zar === diger_zar) return;
        if (ikinciZar === -1) ikinciZar = diger_zar;
        else if (ikinciZar === diger_zar) ikinciTur++;
      });
      if (ikinciTur == 2) lowerHesaplama[2] = 25;
    }
  });
  //!full house

  for (let i = 1; i <= 8; i++) {
    var puanYeri = document.getElementById("puan-tablo").querySelectorAll("tr")[i + 10].querySelectorAll("td")[player];

    if (!puanYeri.classList.contains("selected")) {
      puanYeri.innerText = lowerHesaplama[i - 1];
    }
  }
}
