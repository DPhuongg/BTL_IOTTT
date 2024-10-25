import {
  Card,
  Col,
  Flex,
  Row,
  Typography,
  Switch,
  Progress,
  Spin
} from "antd";
import { useEffect, useState, } from "react";

import LineChart from "../components/chart/LineChart";
import { FaTemperatureLow, FaFan, FaLightbulb, FaRegSnowflake } from "react-icons/fa";
import { RiWaterPercentFill } from "react-icons/ri";
import { MdLightMode } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import '../assets/styles/home.css'
import { useActionDeviceLoadingStore, useActionDeviceStore, useDataSensorStore, useWebSocketStore } from "../stores";
import axiosClient from "../api/axios-client";

function Home() {
  const { Title } = Typography;
  const { temperature, humidity, light, gas } = useDataSensorStore();
  const { isOnLed, isOnAirConditioner, isOnFan, isOnLamp, updateActionDevice } = useActionDeviceStore();

  const { updateDataSensorAray } = useWebSocketStore()
  const { isLoadingLed,
    isLoadingLamp,
    isLoadingFan,
    isLoadingAirConditioner, updateActionDeviceLoading } = useActionDeviceLoadingStore()
  const { sendMessage } = useWebSocketStore();

  const { updateDataSensor } = useDataSensorStore()
  useEffect(() => {
    const get10dataLast = async () => {
      const dataLast = await axiosClient.get('/data/10-data-last');
      updateDataSensorAray(dataLast.data);
      updateDataSensor({
        temperature: dataLast.data[0].temperature,
        humidity: dataLast.data[0].humidity,
        light: dataLast.data[0].light,
        gas: dataLast.data[0].gas,
      });
    }

    get10dataLast();
  }, [])

  useEffect(() => {
    const getActionLast = async () => {
      const actionLast = await axiosClient.get('/data/action/last');
      updateActionDevice({
        isOnLed: actionLast.led === 'ON',
        isOnAirConditioner: actionLast.airConditioner === 'ON',
        isOnFan: actionLast.fan === 'ON',
        isOnLamp: actionLast.lamp === 'ON',
      });
    }

    getActionLast();
  }, [])

  const weatherDatas = [
    {
      title: "Nhiệt độ",
      value: temperature,
      unit: "*C",
      icon: <FaTemperatureLow size={18} />,
      progressColor: '#008FFB',
      bnb: "redtext",
    },
    {
      title: "Độ ẩm",
      value: humidity,
      unit: "%",
      icon: <RiWaterPercentFill size={18} />,
      progressColor: '#00E396',
      bnb: "redtext",
    },
    {
      title: "Ánh sáng",
      value: Math.round(light),
      unit: "Lux",
      icon: <MdLightMode size={18} />,
      progressColor: '#FEB019',
      bnb: "redtext",
    },
    {
      title: "Gas",
      value: Math.round(gas),
      unit: "??",
      icon: <FaCloud size={18} />,
      progressColor: '#A66DD4',
      bnb: "redtext",
    }
  ];

  const actionDatas = [
    {
      title: "Quạt",
      status: isOnFan,
      icon: <FaFan size={50} className={isOnFan ? "spin-icon" : ""} />,
      isLoading: isLoadingFan,
      onChange: (e) => {
        updateActionDeviceLoading({
          isLoadingFan: !isLoadingFan,
        })
        sendMessage({
          topic: 'action/fan',
          message: e ? 'on' : 'off'
        })
      }
    },
    {
      title: "Điều hòa",
      status: isOnAirConditioner,
      isLoading: isLoadingAirConditioner,
      icon: <FaRegSnowflake size={50} color={isOnAirConditioner ? "rgb(140, 208, 242)" : ""} />,
      onChange: (e) => {
        updateActionDeviceLoading({
          isLoadingAirConditioner: !isLoadingAirConditioner,
        })
        sendMessage({
          topic: 'action/airConditioner',
          message: e ? 'on' : 'off'
        })
      }
    },
    {
      title: "Đèn",
      status: isOnLed,
      icon: <FaLightbulb size={50} color={isOnLed ? "yellow" : ""} />,
      isLoading: isLoadingLed,
      onChange: (e) => {
        updateActionDeviceLoading({
          isLoadingLed: !isLoadingLed,
        })
        sendMessage({
          topic: 'action/led',
          message: e ? 'on' : 'off'
        })
      }
    },
    {
      title: "Đèn 2",
      status: isOnLamp,
      icon: <FaLightbulb size={50} color={isOnLamp ? "#EE4D2D" : ""} />,
      isLoading: isLoadingLamp,
      onChange: (e) => {
        updateActionDeviceLoading({
          isLoadingLamp: !isLoadingLamp,
        })
        sendMessage({
          topic: 'action/lamp',
          message: e ? 'on' : 'off'
        })
      }
    }
  ]

  const getMaxValue = (title) => {
    if (title.includes("Ánh sáng")) return 1024;
    return 100; // Giới hạn mặc định là 100
  };


  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {weatherDatas.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox" >
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={6}>
                      <span style={{ color: "#000" }}>{c.title}</span>
                      <Title level={3}>
                        {c.value} <small style={{ color: c.progressColor }}>{c.unit}</small>
                      </Title>
                    </Col>
                    <Col xs={14}>
                    <Progress
                      percent={(c.value / getMaxValue(c.title)) * 100} // Tính phần trăm dựa trên giá trị tối đa
                      showInfo={false}
                      strokeColor={c.progressColor}
                      />
                    </Col>
                    <Col xs={4}>
                      <div className="icon-box" style={{ backgroundColor: c.progressColor }}>{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={18}>
            <Card bordered={false} className="criclebox h-full" style={{ width: '100%' }}>
              <LineChart style={{ width: '100%' }} />
            </Card>
          </Col>
          <Col xs={6} >
            <Flex vertical justify="flex-start" className="h-full">
              {actionDatas.map((action, index) => (
                <Card key={index} style={{marginBottom: '10px'}}>
                  <Row gutter={[24, 0]}>
                    <Col xs={15}>
                      <Title level={5} style={{ margin: 0 }}>
                        {action.title}
                      </Title>
                      <Switch checkedChildren="ON" unCheckedChildren="OFF" onChange={action.onChange} value={action.status} />
                      <Spin spinning={action.isLoading} />
                    </Col>
                    <Col xs={9} >
                      {action.icon}
                    </Col>
                  </Row>
                </Card>
              ))}
            </Flex>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
