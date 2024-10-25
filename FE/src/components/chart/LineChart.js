import ReactApexChart from "react-apexcharts";
import { Col, Flex, Row, Typography } from "antd";
import { FaMinus } from "react-icons/fa";
import { options, series } from "./configs/lineChart";
import { useWebSocketStore } from "../../stores";
import { options2, series2 } from "./configs/lineChart2";

function LineChart() {
  const { Title } = Typography;

  const { message } = useWebSocketStore();

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24}>
          <div className="linechart">
            <div>
              <Title level={5}>Biểu đồ 1</Title>
            </div>
            <div className="sales">
              <ul>
                <li>{<FaMinus color="#008FFB" />} Nhiệt độ</li>
                <li>{<FaMinus color="#00E396" />} Độ ẩm</li>
                <li>{<FaMinus color="#FEB019" />} Ánh sáng</li>
              </ul>
            </div>
          </div>

          <ReactApexChart
            className="full-width"
            options={options(message)}
            series={series(message)}
            type="area"
            height={450}
            width={"100%"}
          />
        </Col>
        {/* <Col xs={11}>
          <div className="linechart">
            <div>
              <Title level={5}>Biểu đồ 2</Title>
            </div>
            <div className="sales">
              <ul>
                <li>{<FaMinus color="#A66DD4" />} Gas</li>
              </ul>
            </div>
          </div>

          <ReactApexChart
            className="full-width"
            options={options2(message)}
            series={series2(message)}
            type="area"
            height={450}
            width={"100%"}
          /></Col> */}
      </Row>
    </>
  );
}

export default LineChart;
