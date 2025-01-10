function pullDown_reverse() {
  const pullDowns = document.getElementsByClassName(
    "form-control jbc-form-control custom-select custom-select-sm"
  );

  Array.from(pullDowns).forEach((pd) => {
    if (pd.name === "projects[]") {
      const opts_pulldown = Array.from(pd.getElementsByTagName("option"));

      if (
        opts_pulldown[1]?.value < opts_pulldown[opts_pulldown.length - 1]?.value
      ) {
        let newNodesHTML = opts_pulldown[0].outerHTML + "\n";
        // 0番めは未選択なので変化なし
        for (let i = opts_pulldown.length - 1; 1 < i; i -= 1) {
          newNodesHTML += opts_pulldown[i]?.outerHTML + "\n";
        }
        pd.innerHTML = `${newNodesHTML}</select>`;
      }
    }
  });
}

function getyearmonth() {
  // 操作対象年月日取得
  const year = parseInt(document.getElementsByName("year")[0].value) % 100;

  const month = document.getElementsByName("month")[0].value;

  if (month < 10) {
    return `${year}0${month}`;
  } else {
    return `${year}${month}`;
  }
}

const str_yearmonth = getyearmonth();
document.body.addEventListener("click", pullDown_reverse);
