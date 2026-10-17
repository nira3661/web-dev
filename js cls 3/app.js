const percent = (amount, p) => (amount * p)/ 100;
const round2 = (n) => Math.round(n * 100)/100;
let bill = 0, tipPct = 10, people = 1;
const $ = (id) => document.getElementById(id);
const billEl = $("bill"), peopleEl = $("people");
const tipEl = $("tip"), totalEl =$("total"), eachEl =$("each");
function calc() {
  const tip = percent(bill, tipPct);
  const total = bill + tip;
  const each = total / Math.max(1, people);
  tipEl.textContent="৳" + round2(tip);
  totalEl.textContent="৳" + round2(total);
  eachEl.textContent = "৳" + round2(each);
}

billEl.addEventListener("input", (e) => { bill = +e.target.value || 0; calc(); });
peopleEl.addEventListener("input", (e) => { people = +e.target.value || 1; calc(); });
document.querySelectorAll(".pct").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pct").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    tipPct = +btn.dataset.p;
    calc();
  });
});
document.querySelector('.pct[data-p="10"]').classList.add("active");
calc();