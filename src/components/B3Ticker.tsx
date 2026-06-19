import { useEffect, useState } from "react";

type Quote = {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
};

const SYMBOLS = [
  "PETR4", "VALE3", "ITUB4", "BBDC4", "ABEV3", "WEGE3",
  "BBAS3", "SUZB3", "EGIE3", "TAEE11", "RENT3", "RADL3",
];

const BRAPI_TOKEN = "o7g1xVzVZrzTTgwCuxYr4D";

const FALLBACK: Quote[] = [
  { symbol: "PETR4", regularMarketPrice: 38.42, regularMarketChangePercent: 1.23 },
  { symbol: "VALE3", regularMarketPrice: 62.18, regularMarketChangePercent: -0.85 },
  { symbol: "ITUB4", regularMarketPrice: 34.95, regularMarketChangePercent: 0.42 },
  { symbol: "BBDC4", regularMarketPrice: 14.27, regularMarketChangePercent: -0.31 },
  { symbol: "ABEV3", regularMarketPrice: 12.83, regularMarketChangePercent: 0.78 },
  { symbol: "WEGE3", regularMarketPrice: 41.56, regularMarketChangePercent: 1.45 },
  { symbol: "BBAS3", regularMarketPrice: 27.89, regularMarketChangePercent: -0.62 },
  { symbol: "SUZB3", regularMarketPrice: 56.34, regularMarketChangePercent: 0.95 },
  { symbol: "EGIE3", regularMarketPrice: 39.71, regularMarketChangePercent: 0.18 },
  { symbol: "TAEE11", regularMarketPrice: 35.42, regularMarketChangePercent: -0.24 },
  { symbol: "RENT3", regularMarketPrice: 48.63, regularMarketChangePercent: 2.11 },
  { symbol: "RADL3", regularMarketPrice: 22.18, regularMarketChangePercent: -1.05 },
];

function formatPrice(n: number) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function B3Ticker() {
  const [quotes, setQuotes] = useState<Quote[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    const url = `https://brapi.dev/api/quote/${SYMBOLS.join(",")}?token=${BRAPI_TOKEN}`;

    async function load() {
      try {
        const res = await fetch(url);
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled || !json?.results) return;
        const mapped: Quote[] = SYMBOLS.map((sym) => {
          const r = json.results.find((x: any) => x.symbol === sym);
          if (!r || typeof r.regularMarketPrice !== "number") {
            return FALLBACK.find((f) => f.symbol === sym)!;
          }
          return {
            symbol: sym,
            regularMarketPrice: r.regularMarketPrice,
            regularMarketChangePercent: r.regularMarketChangePercent ?? 0,
          };
        });
        setQuotes(mapped);
      } catch {
        // keep fallback
      }
    }

    load();
    const id = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // duplicate for seamless loop
  const loop = [...quotes, ...quotes];

  return (
    <>
    <div
      className="b3-ticker"
      style={{
        position: "absolute",
        top: "62%",
        left: 60,
        right: 60,
        height: 44,
        borderRadius: 12,
        background: "rgba(7, 15, 30, 0.60)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          height: "100%",
          borderRight: "1px solid rgba(255, 255, 255, 0.10)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#1E8C5A",
            boxShadow: "0 0 0 0 rgba(30, 140, 90, 0.7)",
            animation: "b3-pulse 1.6s ease-out infinite",
          }}
        />
        <span
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontWeight: 600,
          }}
        >
          B3
        </span>
      </div>

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          height: "100%",
        }}
      >
        <div className="b3-track" style={{ display: "flex", alignItems: "center", height: "100%", width: "max-content" }}>
          {loop.map((q, i) => {
            const up = q.regularMarketChangePercent >= 0;
            const color = up ? "#1E8C5A" : "#C0392B";
            const arrow = up ? "▲" : "▼";
            return (
              <div
                key={`${q.symbol}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "0 20px",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 13,
                  whiteSpace: "nowrap",
                  height: 24,
                }}
              >
                <span style={{ color: "#fff", fontWeight: 500 }}>{q.symbol}</span>
                <span style={{ color: "#fff" }}>R$ {formatPrice(q.regularMarketPrice)}</span>
                <span style={{ color, fontWeight: 500 }}>
                  {arrow} {Math.abs(q.regularMarketChangePercent).toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes b3-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes b3-pulse {
          0% { box-shadow: 0 0 0 0 rgba(30, 140, 90, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(30, 140, 90, 0); }
          100% { box-shadow: 0 0 0 0 rgba(30, 140, 90, 0); }
        }
        .b3-track {
          animation: b3-scroll 35s linear infinite;
        }
        .b3-ticker:hover .b3-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
    </>
  );
}
