import { Card, Col, Row, Statistic } from "antd";
import CountUp from "react-countup";
import DemoPie from "../dashboard/DemoPie";
import { useEffect, useState } from "react";
import { callFetchLevels, callFetchPie, callFetchSummary } from "@/config/api";
import DemoBar from "../dashboard/DemoBar";

const DashboardPage = () => {
  const [dataCardDashBoard, setdataCardDashBoard] = useState<any>();
  const [dataPie, setdataPie] = useState<any>();
  const [dataBar, setdataBar] = useState<any>();
  const formatter = (value: number | string) => {
    return <CountUp end={Number(value)} separator="," />;
  };
  const fetchDashBoardData = async () => {
    const res = await callFetchSummary();
    if (res && res.data) {
      setdataCardDashBoard(res.data);
    }
  };
  const fetchDashBoardDataBar = async () => {
    const res = await callFetchLevels();
    if (res && res.data) {
      setdataBar(res.data);
    }
  };
  const fetchDashBoardDataPie = async () => {
    const res = await callFetchPie();
    if (res && res.data) {
      const newData = res.data.map((item: any) => {
        return { type: item.name, value: item.number };
      });
      setdataPie(newData);
    }
  };
  useEffect(() => {
    fetchDashBoardData();
    fetchDashBoardDataPie();
    fetchDashBoardDataBar();
    return () => {};
  }, []);

  return (
    <Row gutter={[20, 20]}>
      <Col span={24} md={8}>
        <Card title={dataCardDashBoard?.jobsHiring?.message} bordered={false}>
          <Statistic
            title="Số Lượng"
            value={dataCardDashBoard?.jobsHiring?.number}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card title={dataCardDashBoard?.jobsToday.message} bordered={false}>
          <Statistic
            title="Số Lượng"
            value={dataCardDashBoard?.jobsToday?.number}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card title={dataCardDashBoard?.resumesMonth.message} bordered={false}>
          <Statistic
            title="Số Lượng"
            value={dataCardDashBoard?.resumesMonth?.number}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Row gutter={[20, 20]}>
        <Col>
          <DemoBar data={dataBar} />
        </Col>
        <Col>
          <DemoPie data={dataPie} />
        </Col>
      </Row>
    </Row>
  );
};

export default DashboardPage;
