"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  month:    string;
  revenue:  number;
  bookings: number;
}

interface Props {
  data:     DataPoint[];
  currency: string;
  locale:   string;
}

function formatRevenue(value: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, {
    style:                 "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label, currency, locale }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E4E0D9] rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-[#111] mb-2">{label}</p>
      {payload.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: entry.color }} />
            <span className="text-[#7A746D]">{entry.name === "revenue" ? "Revenue" : "Bookings"}:</span>
            <span className="font-semibold text-[#111]">
              {entry.name === "revenue"
                ? formatRevenue(entry.value, currency, locale)
                : entry.value}
            </span>
          </div>
        )
      )}
    </div>
  );
}

export function RevenueChart({ data, currency, locale }: Props) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#A8A29E" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="revenue"
          orientation="left"
          tick={{ fontSize: 11, fill: "#A8A29E" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) =>
            new Intl.NumberFormat(locale, {
              style: "currency", currency,
              notation: "compact", maximumFractionDigits: 0,
            }).format(v)
          }
          domain={[0, maxRevenue * 1.2]}
          width={60}
        />
        <YAxis
          yAxisId="bookings"
          orientation="right"
          tick={{ fontSize: 11, fill: "#A8A29E" }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip content={<CustomTooltip currency={currency} locale={locale} />} />
        <Legend
          iconType="square"
          iconSize={10}
          wrapperStyle={{ fontSize: 12, paddingTop: 12, color: "#7A746D" }}
          formatter={(value) => (value === "revenue" ? "Revenue" : "Bookings")}
        />
        <Bar
          yAxisId="revenue"
          dataKey="revenue"
          fill="#C41230"
          radius={[4, 4, 0, 0]}
          maxBarSize={36}
          opacity={0.85}
        />
        <Line
          yAxisId="bookings"
          type="monotone"
          dataKey="bookings"
          stroke="#1B2847"
          strokeWidth={2}
          dot={{ r: 3, fill: "#1B2847", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
