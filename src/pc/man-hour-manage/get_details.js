const get_date = () => {
  const date = {};
  const pd_year = document.getElementsByName("year")[0];
  const arr_yearOpt = Array.prototype.slice.call(
    pd_year.getElementsByTagName("option")
  );

  arr_yearOpt.forEach((opt) => {
    if (opt.selected) {
      date.year = opt.value;
    }
  });

  const pd_month = document.getElementsByName("month")[0];
  const arr_monthOpt = Array.prototype.slice.call(
    pd_month.getElementsByTagName("option")
  );

  arr_monthOpt.forEach((opt) => {
    if (opt.selected) {
      date.month = opt.value;
    }
  });

  return date;
};

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const button = document.createElement("button");
button.style.width = "320px";
button.classList = "btn jbc-btn-primary";
button.innerHTML = "入力したプロジェクトリストを取得する";
let result = "";

const get_details = async () => {
  if (!result) {
    button.disabled = true;
    const date = get_date();

    const month_start = new Date(date.year, date.month - 1, 1);
    const month_end = new Date(date.year, date.month, 1);

    const get_data = [];

    let arr_mes;
    let cnt = 0;
    for (
      let today = month_start.getTime();
      today < month_end.getTime();
      today += 86400000
    ) {
      cnt += 1;
      button.innerHTML = `<div style="text-align: left;width: 120px;margin: 0 auto;">データ取得中(${cnt})${".".repeat(
        cnt % 4
      )}</div>`;
      await sleep(1000);
      const resp = await fetch(
        `https://ssl.jobcan.jp/employee/man-hour-manage/get-man-hour-data-for-edit/unix_time/${parseInt(
          today / 1000
        )}`
      );
      const data = await resp.json();

      const selected = data.html.match(/selected>[^<>]*<\/option/g);

      if (selected) {
        let i = 0;
        for (const d of selected) {
          const ldate = new Date(today);
          const ldata = d.match(/>(.*)</)[1];
          if (!ldata.match(/^[1A-G]_.*$/)) {
            const ldata_aft = selected[i + 1].match(/>(.*)</)[1];
            if (!get_data[`${ldata}-${ldata_aft}`])
              get_data[`${ldata}-${ldata_aft}`] = [ldate.getDate()];
            else get_data[`${ldata}-${ldata_aft}`].push(ldate.getDate());
          }
          i += 1;
        }

        arr_mes = Object.keys(get_data).map((k) => {
          return `${k}: ${get_data[k].join(", ")}`;
        });
      }
    }

    result = arr_mes.join("\n\n");
  }
  alert(result);
  button.innerHTML = "結果の再閲覧";
  button.disabled = false;
};

button.onclick = get_details;

const elm_chart = document.getElementById("chart-area");
elm_chart.parentNode.insertBefore(button, elm_chart);
