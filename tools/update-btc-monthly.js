#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SOURCE_URL =
  "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=max";
const TARGET_PATH = path.join(__dirname, "..", "assets", "js", "btc-powerlaw.js");
const START_MARKER = "// BEGIN BTC_MONTHLY_CLOSES";
const END_MARKER = "// END BTC_MONTHLY_CLOSES";

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function groupMonthly(prices) {
  const monthly = new Map();

  for (const [timestamp, price] of prices) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // 1-12
    const key = `${year}-${String(month).padStart(2, "0")}`;
    const existing = monthly.get(key);
    if (!existing || timestamp > existing.timestamp) {
      monthly.set(key, { timestamp, price });
    }
  }

  const rows = [];
  for (const [key, value] of monthly.entries()) {
    const [yearStr, monthStr] = key.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const lastDay = new Date(Date.UTC(year, month, 0)); // month is 1-12
    rows.push({
      date: formatDate(lastDay),
      price: Number(value.price.toFixed(1)),
    });
  }

  rows.sort((a, b) => (a.date < b.date ? 1 : -1));
  return rows;
}

function buildReplacement(rows) {
  const lines = rows.map(
    (row) => `  { date: "${row.date}", price: ${row.price} },`
  );
  return `${START_MARKER}\n${lines.join("\n")}\n  ${END_MARKER}`;
}

async function main() {
  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }
  const payload = await response.json();
  if (!payload.prices || !Array.isArray(payload.prices)) {
    throw new Error("Unexpected response shape from CoinGecko.");
  }

  const rows = groupMonthly(payload.prices);
  const replacement = buildReplacement(rows);

  const original = fs.readFileSync(TARGET_PATH, "utf8");
  const startIndex = original.indexOf(START_MARKER);
  const endIndex = original.indexOf(END_MARKER);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("Markers not found in btc-powerlaw.js.");
  }

  const before = original.slice(0, startIndex);
  const after = original.slice(endIndex + END_MARKER.length);
  const updated = `${before}${replacement}${after}`;

  fs.writeFileSync(TARGET_PATH, updated, "utf8");
  console.log(`Updated ${rows.length} monthly closes in ${TARGET_PATH}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
