// assets/js/btc-powerlaw.js

// =============== DATA ===============
// 1) Plak hier je maandelijkse prijzen in EUR.
//    Structuur is dezelfde als in je app: [{ date: 'YYYY-MM-DD', price: 123.45 }, ...]
//
//    Voor nu kun je tijdelijk je USD-data gebruiken.
//    Als je straks de EUR-reeks hebt, vervang je gewoon dit array.

const btcMonthlyCloses = [
  { date: "2025-11-01", price: 109620.5 },
  { date: "2025-10-01", price: 114591.9 },
  { date: "2025-09-01", price: 114048.5 },
  { date: "2025-08-01", price: 108226.8 },
  { date: "2025-07-01", price: 115765.0 },
  { date: "2025-06-01", price: 107171.1 },
  { date: "2025-05-01", price: 104598.0 },
  { date: "2025-04-01", price: 94184.4 },
  { date: "2025-03-01", price: 82548.8 },
  { date: "2025-02-01", price: 84381.2 },
  { date: "2025-01-01", price: 94536.1 },
  { date: "2024-12-01", price: 93557.2 },
  { date: "2024-11-01", price: 96405.7 },
  { date: "2024-10-01", price: 70281.8 },
  { date: "2024-09-01", price: 63339.2 },
  { date: "2024-08-01", price: 58978.6 },
  { date: "2024-07-01", price: 64626.0 },
  { date: "2024-06-01", price: 62754.3 },
  { date: "2024-05-01", price: 67530.1 },
  { date: "2024-04-01", price: 60666.6 },
  { date: "2024-03-01", price: 71332.0 },
  { date: "2024-02-01", price: 61169.3 },
  { date: "2024-01-01", price: 42580.5 },
  { date: "2023-12-01", price: 42272.5 },
  { date: "2023-11-01", price: 37712.9 },
  { date: "2023-10-01", price: 34650.6 },
  { date: "2023-09-01", price: 26962.7 },
  { date: "2023-08-01", price: 25937.3 },
  { date: "2023-07-01", price: 29232.4 },
  { date: "2023-06-01", price: 30472.9 },
  { date: "2023-05-01", price: 27216.1 },
  { date: "2023-04-01", price: 29252.1 },
  { date: "2023-03-01", price: 28473.7 },
  { date: "2023-02-01", price: 23130.5 },
  { date: "2023-01-01", price: 23125.1 },
  { date: "2022-12-01", price: 16537.4 },
  { date: "2022-11-01", price: 17163.9 },
  { date: "2022-10-01", price: 20496.3 },
  { date: "2022-09-01", price: 19423.0 },
  { date: "2022-08-01", price: 20043.9 },
  { date: "2022-07-01", price: 23303.4 },
  { date: "2022-06-01", price: 19926.6 },
  { date: "2022-05-01", price: 31793.4 },
  { date: "2022-04-01", price: 37650.0 },
  { date: "2022-03-01", price: 45525.0 },
  { date: "2022-02-01", price: 43188.2 },
  { date: "2022-01-01", price: 38498.6 },
  { date: "2021-12-01", price: 46219.5 },
  { date: "2021-11-01", price: 56882.9 },
  { date: "2021-10-01", price: 61309.6 },
  { date: "2021-09-01", price: 43823.3 },
  { date: "2021-08-01", price: 47130.4 },
  { date: "2021-07-01", price: 41553.7 },
  { date: "2021-06-01", price: 35026.9 },
  { date: "2021-05-01", price: 37298.6 },
  { date: "2021-04-01", price: 57720.3 },
  { date: "2021-03-01", price: 58763.7 },
  { date: "2021-02-01", price: 45164.0 },
  { date: "2021-01-01", price: 33108.1 },
  { date: "2020-12-01", price: 28949.4 },
  { date: "2020-11-01", price: 19698.1 },
  { date: "2020-10-01", price: 13797.3 },
  { date: "2020-09-01", price: 10776.1 },
  { date: "2020-08-01", price: 11644.2 },
  { date: "2020-07-01", price: 11333.4 },
  { date: "2020-06-01", price: 9135.4 },
  { date: "2020-05-01", price: 9454.8 },
  { date: "2020-04-01", price: 8629.0 },
  { date: "2020-03-01", price: 6412.5 },
  { date: "2020-02-01", price: 8543.7 },
  { date: "2020-01-01", price: 9349.1 },
  { date: "2019-12-01", price: 7196.4 },
  { date: "2019-11-01", price: 7546.6 },
  { date: "2019-10-01", price: 9152.6 },
  { date: "2019-09-01", price: 8284.3 },
  { date: "2019-08-01", price: 9594.4 },
  { date: "2019-07-01", price: 10082.0 },
  { date: "2019-06-01", price: 10818.6 },
  { date: "2019-05-01", price: 8558.3 },
  { date: "2019-04-01", price: 5320.8 },
  { date: "2019-03-01", price: 4102.3 },
  { date: "2019-02-01", price: 3816.6 },
  { date: "2019-01-01", price: 3437.2 },
  { date: "2018-12-01", price: 3709.4 },
  { date: "2018-11-01", price: 4039.7 },
  { date: "2018-10-01", price: 6365.9 },
  { date: "2018-09-01", price: 6635.2 },
  { date: "2018-08-01", price: 7033.8 },
  { date: "2018-07-01", price: 7729.4 },
  { date: "2018-06-01", price: 6398.9 },
  { date: "2018-05-01", price: 7502.6 },
  { date: "2018-04-01", price: 9245.1 },
  { date: "2018-03-01", price: 6938.2 },
  { date: "2018-02-01", price: 10333.9 },
  { date: "2018-01-01", price: 10265.4 },
  { date: "2017-12-01", price: 13850.4 },
  { date: "2017-11-01", price: 9946.8 },
  { date: "2017-10-01", price: 6451.2 },
  { date: "2017-09-01", price: 4360.6 },
  { date: "2017-08-01", price: 4735.1 },
  { date: "2017-07-01", price: 2883.3 },
  { date: "2017-06-01", price: 2480.6 },
  { date: "2017-05-01", price: 2303.3 },
  { date: "2017-04-01", price: 1351.9 },
  { date: "2017-03-01", price: 1079.1 },
  { date: "2017-02-01", price: 1189.3 },
  { date: "2017-01-01", price: 965.5 },
  { date: "2016-12-01", price: 963.4 },
  { date: "2016-11-01", price: 742.5 },
  { date: "2016-10-01", price: 698.7 },
  { date: "2016-09-01", price: 608.1 },
  { date: "2016-08-01", price: 573.9 },
  { date: "2016-07-01", price: 621.9 },
  { date: "2016-06-01", price: 670.0 },
  { date: "2016-05-01", price: 528.9 },
  { date: "2016-04-01", price: 448.5 },
  { date: "2016-03-01", price: 415.7 },
  { date: "2016-02-01", price: 436.2 },
  { date: "2016-01-01", price: 369.8 },
  { date: "2015-12-01", price: 430.0 },
  { date: "2015-11-01", price: 378.0 },
  { date: "2015-10-01", price: 311.2 },
  { date: "2015-09-01", price: 235.9 },
  { date: "2015-08-01", price: 229.5 },
  { date: "2015-07-01", price: 283.7 },
  { date: "2015-06-01", price: 264.1 },
  { date: "2015-05-01", price: 229.8 },
  { date: "2015-04-01", price: 235.8 },
  { date: "2015-03-01", price: 244.1 },
  { date: "2015-02-01", price: 254.1 },
  { date: "2015-01-01", price: 218.5 },
  { date: "2014-12-01", price: 318.2 },
  { date: "2014-11-01", price: 374.9 },
  { date: "2014-10-01", price: 337.9 },
  { date: "2014-09-01", price: 388.2 },
  { date: "2014-08-01", price: 481.8 },
  { date: "2014-07-01", price: 589.5 },
  { date: "2014-06-01", price: 635.1 },
  { date: "2014-05-01", price: 627.9 },
  { date: "2014-04-01", price: 445.6 },
  { date: "2014-03-01", price: 444.7 },
  { date: "2014-02-01", price: 573.9 },
  { date: "2014-01-01", price: 938.8 },
  { date: "2013-12-01", price: 805.9 },
  { date: "2013-11-01", price: 1205.7 },
  { date: "2013-10-01", price: 211.2 },
  { date: "2013-09-01", price: 141.9 },
  { date: "2013-08-01", price: 141.0 },
  { date: "2013-07-01", price: 106.2 },
  { date: "2013-06-01", price: 97.5 },
  { date: "2013-05-01", price: 128.8 },
  { date: "2013-04-01", price: 139.2 },
  { date: "2013-03-01", price: 93.0 },
  { date: "2013-02-01", price: 33.4 },
  { date: "2013-01-01", price: 20.4 },
  { date: "2012-12-01", price: 13.5 },
  { date: "2012-11-01", price: 12.6 },
  { date: "2012-10-01", price: 11.2 },
  { date: "2012-09-01", price: 12.4 },
  { date: "2012-08-01", price: 10.2 },
  { date: "2012-07-01", price: 9.4 },
  { date: "2012-06-01", price: 6.7 },
  { date: "2012-05-01", price: 5.2 },
  { date: "2012-04-01", price: 4.9 },
  { date: "2012-03-01", price: 4.9 },
  { date: "2012-02-01", price: 4.9 },
  { date: "2012-01-01", price: 5.5 },
  { date: "2011-12-01", price: 4.7 },
  { date: "2011-11-01", price: 3.0 },
  { date: "2011-10-01", price: 3.3 },
  { date: "2011-09-01", price: 5.1 },
  { date: "2011-08-01", price: 8.2 },
  { date: "2011-07-01", price: 13.4 },
  { date: "2011-06-01", price: 16.1 },
  { date: "2011-05-01", price: 8.7 },
  { date: "2011-04-01", price: 3.5 },
  { date: "2011-03-01", price: 0.8 },
  { date: "2011-02-01", price: 0.9 },
  { date: "2011-01-01", price: 0.5 },
  { date: "2010-12-01", price: 0.3 },
  { date: "2010-11-01", price: 0.2 },
  { date: "2010-10-01", price: 0.2 },
  { date: "2010-09-01", price: 0.1 },
  { date: "2010-08-01", price: 0.1 },
];

// =============== CONSTANTS & HELPERS ===============

const GENESIS_MS = Date.UTC(2009, 0, 3); // 2009-01-03
const EPS = 1e-9;

// dagen sinds genesis op basis van datumstring (YYYY-MM-DD)
function daysSinceGenesisFromDateStr(dateStr) {
  const ms = new Date(dateStr + "T00:00:00Z").getTime();
  const d = (ms - GENESIS_MS) / (1000 * 60 * 60 * 24);
  return Math.max(EPS, d);
}

// price = a * days^b
function pricePLDays(a, b, dateStr) {
  const d = daysSinceGenesisFromDateStr(dateStr);
  return a * Math.pow(d, b);
}

// eenvoudige lineaire regressie in log10-space
// x = log10(days), y = log10(price)
function linearRegressionStats(xs, ys) {
  const n = xs.length;
  const xMean = xs.reduce((p, c) => p + c, 0) / n;
  const yMean = ys.reduce((p, c) => p + c, 0) / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - xMean) * (ys[i] - yMean);
    den += (xs[i] - xMean) * (xs[i] - xMean);
  }
  const B = num / (den || 1e-12); // slope
  const A = yMean - B * xMean; // intercept
  let ssRes = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i++) {
    const yPred = A + B * xs[i];
    ssRes += (ys[i] - yPred) ** 2;
    ssTot += (ys[i] - yMean) ** 2;
  }
  const r2 = 1 - ssRes / (ssTot || 1e-12);
  return { A, B, r2 };
}

// rollende fits: cumulatieve regressie tot en met elke maand
function buildRollingFits(data) {
  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const results = [];
  const xsAll = [];
  const ysAll = [];

  for (let i = 0; i < sorted.length; i++) {
    const row = sorted[i];
    const d = daysSinceGenesisFromDateStr(row.date);
    if (d <= 0 || row.price <= 0) continue;

    xsAll.push(Math.log10(d));
    ysAll.push(Math.log10(row.price));

    if (xsAll.length < 12) continue; // nog te weinig punten

    const { A, B, r2 } = linearRegressionStats(xsAll, ysAll);

    results.push({
      date: row.date,
      year: new Date(row.date + "T00:00:00Z").getUTCFullYear(),
      bExp: B,
      aCoef: Math.pow(10, A),
      r2,
      n: xsAll.length,
    });
  }

  return results;
}

function formatMoneyEUR(x) {
  if (!isFinite(x)) return "-";
  return x.toLocaleString("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

// label op log/linear as
function formatYTick(v) {
  if (!isFinite(v) || v <= 0) return "";
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(2) + " mld";
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + " mln";
  if (v >= 1_000) return (v / 1_000).toFixed(0) + "k";
  if (v >= 1) return v.toFixed(0);
  return v.toPrecision(2);
}

// =============== DATA PREP ===============

// power-law parameters (kopie uit je app)
const B_EXP = 5.5697;
const A_AVG = 8.85116e-17;
const A_LOWER = A_AVG * 0.4;

// prijs + power law lijnen, mét projectie tot 2054
function buildPriceSeries() {
  const cutoff = "2010-05-01";

  const sorted = [...btcMonthlyCloses].sort((a, b) =>
    a.date < b.date ? -1 : 1
  );

  const rows = [];

  // historische data
  for (const row of sorted) {
    if (row.date < cutoff) continue;
    rows.push({
      date: row.date,
      price: row.price,
      plAvg: pricePLDays(A_AVG, B_EXP, row.date),
      plLower: pricePLDays(A_LOWER, B_EXP, row.date),
    });
  }

  // projectie: alleen power-law lijnen (geen prijs) tot 2054
  if (sorted.length) {
    const last = sorted[sorted.length - 1];
    const lastDate = new Date(last.date + "T00:00:00Z");
    let y = lastDate.getUTCFullYear();
    let m = lastDate.getUTCMonth() + 1;

    // start bij maand NÁ de laatste close
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }

    const endYear = 2054;

    while (y < endYear || (y === endYear && m <= 12)) {
      const jsDate = new Date(Date.UTC(y, m - 1, 1));
      const dateStr = jsDate.toISOString().slice(0, 10);

      rows.push({
        date: dateStr,
        price: null,
        plAvg: pricePLDays(A_AVG, B_EXP, dateStr),
        plLower: pricePLDays(A_LOWER, B_EXP, dateStr),
      });

      m++;
      if (m > 12) {
        m = 1;
        y++;
      }
    }
  }

  return rows;
}

// =============== CHART CONSTRUCTORS ===============

let priceChart = null;
let slopeChart = null;
let r2Chart = null;

function createPriceChart(ctx, yLog, priceData) {
  const labels = priceData.map((d) => d.date);
  const marketPrices = priceData.map((d) => d.price);
  const plAvg = priceData.map((d) => d.plAvg);
  const plLower = priceData.map((d) => d.plLower);

  if (priceChart) {
    priceChart.destroy();
  }

  priceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "BTC maandelijkse close (EUR)",
          data: marketPrices,
          borderWidth: 1.8,
          borderColor: "#f97316", // oranje
          pointRadius: 0,
          spanGaps: false,
        },
        {
          label: "Power law middenlijn",
          data: plAvg,
          borderWidth: 1.5,
          borderColor: "#0f172a", // donker
          borderDash: [4, 2],
          pointRadius: 0,
          spanGaps: true,
        },
        {
          label: "Power law support",
          data: plLower,
          borderWidth: 1.5,
          borderColor: "#2563eb", // blauw
          borderDash: [2, 2],
          pointRadius: 0,
          spanGaps: true,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          type: "category",
          ticks: {
            maxTicksLimit: 10,
          },
          grid: {
            color: "rgba(148, 163, 184, 0.3)",
          },
        },
        y: {
          type: yLog ? "logarithmic" : "linear",
          min: 0.1,
          ticks: {
            callback: (value) => formatYTick(value),
          },
          grid: {
            color: "rgba(148, 163, 184, 0.3)",
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${formatMoneyEUR(
                context.parsed.y
              )}`,
          },
        },
      },
    },
  });
}

function createSlopeChart(ctx, rollingFits) {
  const labels = rollingFits.map((d) => d.date);
  const bValues = rollingFits.map((d) => d.bExp);

  if (slopeChart) slopeChart.destroy();

  slopeChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "b exponent",
          data: bValues,
          borderWidth: 1.5,
          borderColor: "#0f172a",
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: "category",
          ticks: { maxTicksLimit: 10 },
        },
        y: {
          type: "linear",
        },
      },
      plugins: {
        legend: { display: true, position: "bottom" },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(4)}`,
          },
        },
      },
    },
  });
}

function createR2Chart(ctx, rollingFits) {
  const labels = rollingFits.map((d) => d.date);
  const r2Values = rollingFits.map((d) => d.r2);

  if (r2Chart) r2Chart.destroy();

  r2Chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "R²",
          data: r2Values,
          borderWidth: 1.5,
          borderColor: "#2563eb",
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: "category",
          ticks: { maxTicksLimit: 10 },
        },
        y: {
          type: "linear",
          min: 0,
          max: 1,
        },
      },
      plugins: {
        legend: { display: true, position: "bottom" },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(3)}`,
          },
        },
      },
    },
  });
}

// kleine helper voor KPI's
function setKpiText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// =============== INIT ===============

document.addEventListener("DOMContentLoaded", () => {
  if (!btcMonthlyCloses.length) {
    console.warn(
      "btcMonthlyCloses is leeg – vergeet je prijsdata niet te plakken!"
    );
    return;
  }

  const priceData = buildPriceSeries();
  const rollingFits = buildRollingFits(btcMonthlyCloses);

  const priceCtx = document
    .getElementById("btc-price-chart")
    .getContext("2d");
  const slopeCtx = document
    .getElementById("btc-slope-chart")
    .getContext("2d");
  const r2Ctx = document
    .getElementById("btc-r2-chart")
    .getContext("2d");

  const yLogToggle = document.getElementById("y-log-toggle");

  // eerste render (Y log)
  createPriceChart(priceCtx, true, priceData);
  createSlopeChart(slopeCtx, rollingFits);
  createR2Chart(r2Ctx, rollingFits);

  // KPI-balk invullen
  const sorted = [...btcMonthlyCloses].sort((a, b) =>
    a.date < b.date ? -1 : 1
  );
  const lastRow = sorted[sorted.length - 1];

  if (lastRow) {
    setKpiText("kpi-last-close", formatMoneyEUR(lastRow.price));
  }

  // vandaag in UTC
  const todayIso = new Date().toISOString().slice(0, 10);
  const dToday = daysSinceGenesisFromDateStr(todayIso);
  const plAvgToday = A_AVG * Math.pow(dToday, B_EXP);
  const plLowerToday = A_LOWER * Math.pow(dToday, B_EXP);
  const daysSinceGenesisToday = Math.floor(dToday);

  setKpiText("kpi-pl-avg", formatMoneyEUR(plAvgToday));
  setKpiText("kpi-pl-support", formatMoneyEUR(plLowerToday));
  setKpiText(
    "kpi-days-genesis",
    daysSinceGenesisToday.toLocaleString("nl-BE")
  );
  setKpiText("kpi-a-scale", A_AVG.toExponential(3));
  setKpiText("kpi-b-exp", B_EXP.toFixed(4));

  const latestFit = rollingFits.length
    ? rollingFits[rollingFits.length - 1]
    : null;
  setKpiText("kpi-r2", latestFit ? latestFit.r2.toFixed(3) : "-");

  // toggle log/linear Y
  if (yLogToggle) {
    yLogToggle.addEventListener("change", (e) => {
      const useLog = e.target.checked;
      createPriceChart(priceCtx, useLog, priceData);
    });
  }
});
