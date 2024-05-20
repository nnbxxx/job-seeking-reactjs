import { Bar } from "@ant-design/plots";
import React from "react";
import ReactDOM from "react-dom";

const data = [
  { position: "INTERN", value: 38 },
  { position: "FRESHER", value: 52 },
  { position: "JUNIOR", value: 61 },
  { position: "MIDDLE", value: 145 },
  { position: "SENIOR", value: 48 },
];

const DemoBar = (props: any) => {
  const { data } = props;
  const config = {
    data,
    xField: "position",
    yField: "value",
    shapeField: "hollow",
    colorField: "position",
    legend: {
      color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    },
  };
  return (
    <>
      <div style={{ backgroundColor: "white", borderRadius: "40px" }}>
        {" "}
        <Bar {...config} title={"Thống kê trình độ tuyển dụng "} />
      </div>
    </>
  );
};
export default DemoBar;
