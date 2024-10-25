import {
    Input,
    Card,
    Table,
    Button,
    Flex,
    Select,
    DatePicker
} from "antd";
import { FaSearch } from "react-icons/fa";
import { DataSensorFields } from "../../constant";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axios-client";
import { createQueryString } from "../../ulti";
import { mappingDataSensor } from "../../ulti";


const { RangePicker } = DatePicker;

const columns = [
    {
        title: "STT",
        dataIndex: 'stt',
        key: 'stt',
        width: "10%",
        sorter: {
            compare: (a, b) => a.stt - b.stt,
            multiple: 3,
        },
    },
    {
        title: "ID",
        dataIndex: 'id',
        key: 'id',
        sorter: {
            compare: (a, b) => a.id - b.id,
            multiple: 3,
        },
    },

    {
        title: "Nhiệt độ",
        key: 'temperature',
        dataIndex: 'temperature',
        sorter: {
            compare: (a, b) => a.temperature - b.temperature,
            multiple: 3,
        },
    },
    {
        title: "Độ ẩm",
        key: 'humidity',
        dataIndex: 'humidity',
        sorter: {
            compare: (a, b) => a.humidity - b.humidity,
            multiple: 3,
        },
    },
    {
        title: "Ánh sáng",
        key: 'light',
        dataIndex: 'light',
        sorter: {
            compare: (a, b) => a.light - b.light,
            multiple: 3,
        },
    },
    {
        title: "Gas",
        key: 'Gas',
        dataIndex: 'gas',
        sorter: {
            compare: (a, b) => a.gas - b.gas,
            multiple: 3,
        },
    },
    {
        title: "Thời gian",
        key: 'time',
        dataIndex: 'time',
        sorter: {
            compare: (a, b) => a.time.toString().localeCompare(b.time.toString()),
            multiple: 3,
        },
    },
];


function SensorTable() {
    const [data, setData] = useState();
    const [totalCount, setTotalCount] = useState();
    const [filter, setFilter] = useState({
        content: null,
        searchBy: null,
        startTime: null,
        endTime: null,
    });

    const [page, setPage] = useState({
        page: null,
        pageSize: null,
        sortBy: null,
        orderBy: null
    })

    const getSensorData = async () => {
        const queryString = createQueryString(filter, page);
        const sensorDatas = await axiosClient.get(`/table/data${queryString}`);
        setData(mappingDataSensor(sensorDatas.data));
        setTotalCount(sensorDatas.meta.totalCount)
    }

    useEffect(() => {
        getSensorData();
    }, [page])

    const handleChangeFilter = (data) => {
        setFilter(prev => ({ ...prev, ...data }))
    }

    const handleClickSearch = () => {
        getSensorData();
    }

    return (
        <div className="tabled">
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Sensor Data Table"
            >
                <Flex justify="space-around" align="center" style={{ margin: "20px 0" }}>
                    <Input
                        placeholder=""
                        size="small"
                        prefix={<FaSearch />}
                        style={{ width: '20%', height: 30 }}
                        onChange={(e) => {
                            handleChangeFilter({ content: e.target.value })
                        }}
                    />
                    <Select
                        defaultValue={DataSensorFields.ALL}
                        style={{ width: '20%' }}
                        onChange={(e) => handleChangeFilter({ searchBy: e })}
                        options={[
                            { value: DataSensorFields.ALL, label: 'Tất cả' },
                            { value: DataSensorFields.ID, label: 'ID' },
                            { value: DataSensorFields.TEMPERATURE, label: 'Nhiệt độ' },
                            { value: DataSensorFields.HUMIDITY, label: 'Độ ẩm' },
                            { value: DataSensorFields.LIGHT, label: 'Ánh sáng' },
                            { value: DataSensorFields.GAS, label: 'Gas' },
                            { value: DataSensorFields.TIME, label: 'Thời gian' }
                        ]}
                    />
                    <RangePicker
                        showTime
                        onChange={(_time, timeString) => handleChangeFilter({
                            startTime: timeString[0],
                            endTime: timeString[1]
                        })}
                    />
                    <Button
                        type="primary"
                        icon={<FaSearch />}
                        style={{ width: '15%' }}
                        onClick={handleClickSearch}
                    >
                        Search
                    </Button>
                </Flex>
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            position: ['bottomRight'],
                            current: filter.page,
                            pageSize: filter.pageSize,
                            total: totalCount
                        }}
                        className="ant-border-space"
                        onChange={(pagination, _filters, _sorter, _extra) => {
                            setPage({
                                page: pagination.current,
                                pageSize: pagination.pageSize
                            })
                        }}
                    />
                </div>
            </Card>

        </div>
    )
}

export default SensorTable;