// 入力前の月日をアンカーとして取得、その年月をセットして画面更新する
function setbeforemonth() {
  const today = new Date();

  if (location.hash !== "") {
    const hashnum = location.hash.match(/[0-9]/g);
    const year = parseInt(hashnum[0] + hashnum[1] + hashnum[2] + hashnum[3]);
    const month = parseInt(hashnum[4] + hashnum[5]);

    // Dateの都合上0から始まるMonthは+1する
    if (year !== today.getFullYear() || month !== today.getMonth() + 1) {
      // 年月のプルダウン
      const pd_month = document.getElementsByName("month")[0];
      const pd_year = document.getElementsByName("year")[0];

      const arr_monthOpt = Array.prototype.slice.call(
        pd_month.getElementsByTagName("option")
      );
      const arr_yearOpt = Array.prototype.slice.call(
        pd_year.getElementsByTagName("option")
      );

      // 待たないとうまくプルダウンメニューが読みこまれないので少し待ってから年月をセット
      const sleep = (waitTime) =>
        new Promise((resolve) => setTimeout(resolve, waitTime));
      const waitsec = 100; // 待ち時間（ミリ秒）
      sleep(waitsec).then(() => {
        arr_monthOpt.forEach((opt) => {
          if (parseInt(opt.value) === month) {
            opt.selected = true;
          }
        });
        arr_yearOpt.forEach((opt) => {
          if (parseInt(opt.value) === year) {
            opt.selected = true;
          }
        });
        // onchangeの関数を発火させるダミーイベント
        pd_year.dispatchEvent(new CustomEvent("change", { bubbles: true }));
      });
    }
  }
}

// postの先にアンカーをセットする関数
function setAnchor() {
  if (document.getElementById("save-form")) {
    if (document.getElementById("save-form").action.match(/#/) == null) {
      // NaNになるとバグるだろうのでダミーを入れておく
      // MonthはDateが0から始まる都合上+1する
      const today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;

      // 年月のプルダウン
      const pd_month = document.getElementsByName("month")[0];
      const pd_year = document.getElementsByName("year")[0];

      const arr_monthOpt = Array.prototype.slice.call(
        pd_month.getElementsByTagName("option")
      );
      const arr_yearOpt = Array.prototype.slice.call(
        pd_year.getElementsByTagName("option")
      );

      arr_monthOpt.forEach((opt) => {
        if (opt.selected) {
          month = opt.value;
        }
      });

      arr_yearOpt.forEach((opt) => {
        if (opt.selected) {
          year = opt.value;
        }
      });

      document.getElementById("save-form").action += `#${year}${month}`;
    }
  }
}

// ページ読み込み終了後に動作する関数
setbeforemonth();

// クリック時に発火する関数でリンクにアンカーセット
document.getElementsByTagName("html")[0].addEventListener("click", setAnchor);
