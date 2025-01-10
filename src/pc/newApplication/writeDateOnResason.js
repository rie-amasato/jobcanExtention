function setReason(reason) {
  document.getElementsByName("description")[0].value = reason;
}

const writeDateOnReason = () => {
  const now = new Date();

  setReason(
    `申請日時: ${now.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })} ${now.getHours()}:${now.getMinutes()}\n`
  );
};

writeDateOnReason();
