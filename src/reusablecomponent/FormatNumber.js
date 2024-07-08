export default function formatNumber(n) {
  let num = Math.round(parseInt(n), 0);
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return "0";
  }
}
