import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "S No.",
    dataIndex: "serial_number",
    key: "serial_number",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "PV. Present Value",
    dataIndex: "present_value",
    key: "present_value",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
];

const data = [];
for (let i = 1; i < 30; i++) {
  data.push({
    key: i,
    serial_number: `${i}`,
    present_value: "56°C",
    timestamp: "15/05/24",
  });
}

export default function LogsTable() {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          y: 240,
        }}
      />
    </div>
  );
}
