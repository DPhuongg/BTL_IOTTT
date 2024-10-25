import {
  Tabs,
} from "antd";
import SensorTable from "../components/tables/sensor";
import ActionTable from "../components/tables/action";
import '../assets/styles/table.css'


const items = [
  {
    label: 'Sensor Data',
    key: '1',
    children: <SensorTable/>,
  },
  {
    label: 'Action Data',
    key: '2',
    children: <ActionTable/>,
  },
]

function Tables() {

  return (
    <>
      <Tabs defaultActiveKey="1" items={items}/>
    </>
  );
}

export default Tables;
