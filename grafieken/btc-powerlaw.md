---
layout: page
title: "BTC Power Law (EUR)"
permalink: /grafieken/btc-powerlaw/
---

<p>
  Deze pagina toont de BTC-prijsgrafiek met power-law banden en de stabiliteit
  van de exponent (b) en R² doorheen de tijd.
</p>

<div class="btc-pl-header">
  <div>
    <h2 class="btc-pl-title">BTC Power Law (days since genesis)</h2>
    <p class="btc-pl-subtitle">
      2010 → 2054 (log y, tijd op x-as). In log/log hoort dit bijna een rechte
      lijn te zijn.
    </p>
  </div>

  <div class="btc-pl-toggles">
    <label class="btc-toggle">
      <span class="btc-toggle-label">Y log</span>
      <input type="checkbox" id="y-log-toggle" checked>
      <span class="btc-toggle-switch"></span>
    </label>
  </div>
</div>

<div class="btc-kpi-row">
  <div class="btc-kpi-card">
    <div class="btc-kpi-label">Laatste BTC close</div>
    <div class="btc-kpi-value" id="kpi-last-close">–</div>
  </div>

  <div class="btc-kpi-card">
    <div class="btc-kpi-label">PL avg vandaag</div>
    <div class="btc-kpi-value" id="kpi-pl-avg">–</div>
  </div>

  <div class="btc-kpi-card">
    <div class="btc-kpi-label">PL support vandaag</div>
    <div class="btc-kpi-value" id="kpi-pl-support">–</div>
  </div>

  <div class="btc-kpi-card">
    <div class="btc-kpi-label">Days since genesis</div>
    <div class="btc-kpi-value" id="kpi-days-genesis">–</div>
  </div>

  <div class="btc-kpi-card">
    <div class="btc-kpi-label">a (scale)</div>
    <div class="btc-kpi-value" id="kpi-a-scale">–</div>
  </div>

  <div class="btc-kpi-card">
    <div class="btc-kpi-label">b (exponent)</div>
    <div class="btc-kpi-value" id="kpi-b-exp">–</div>
  </div>

  <div class="btc-kpi-card">
    <div class="btc-kpi-label">R² (full fit)</div>
    <div class="btc-kpi-value" id="kpi-r2">–</div>
  </div>
</div>

<div class="btc-powerlaw-charts">
  <div class="chart-block">
    <h3>BTC prijs + power law (support & middenlijn)</h3>
    <canvas id="btc-price-chart"></canvas>
  </div>

  <div class="chart-block">
    <h3>b exponent (slope) doorheen de tijd</h3>
    <canvas id="btc-slope-chart"></canvas>
  </div>

  <div class="chart-block">
    <h3>R² doorheen de tijd</h3>
    <canvas id="btc-r2-chart"></canvas>
  </div>
</div>

<!-- Chart.js van CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Jouw eigen script -->
<script src="{{ '/assets/js/btc-powerlaw.js' | relative_url }}"></script>
