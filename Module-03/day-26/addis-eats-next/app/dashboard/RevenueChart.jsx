
"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const birr = (value) =>
  `${Number(value).toLocaleString()} ETB`;

export default function RevenueChart({ revenueData, orderData }) {
  return (
    <section>
      <h2>Revenue by Neighbourhood</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="neighbourhood" />
            <YAxis domain={[0, "auto"]} />
            <Tooltip formatter={(value) => birr(value)} />
            <Bar dataKey="revenue" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Orders Over Time</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#16a34a" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2>Revenue Data</h2>
      <table>
        <thead>
          <tr><th>Neighbourhood</th><th>Revenue (ETB)</th></tr>
        </thead>
        <tbody>
          {revenueData.map((item) => (
            <tr key={item.neighbourhood}>
              <td>{item.neighbourhood}</td>
              <td>{birr(item.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Order Data</h2>
      <table>
        <thead>
          <tr><th>Date</th><th>Orders</th></tr>
        </thead>
        <tbody>
          {orderData.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}






