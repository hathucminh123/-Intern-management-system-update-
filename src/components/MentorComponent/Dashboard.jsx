import React, { useEffect, useState } from 'react'
import { Card, Space, Statistic, Table, Tag, Typography } from 'antd'
import { MdAdminPanelSettings,MdKeyboardArrowDown,MdKeyboardArrowUp,MdKeyboardDoubleArrowUp } from 'react-icons/md'
import { LuClipboardEdit } from 'react-icons/lu'
import { FaArrowsToDot } from 'react-icons/fa6'
import { FaNewspaper,FaUsers } from 'react-icons/fa'
import { getIntern, getTodos } from '../../api'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(   
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [todos,SetTodos]=useState(0)
    const [total,SetTotal]=useState(0)
    const [progress,SetProgress]=useState(0)
    const [completed,SetCompleted]=useState(0)

    useEffect(()=>{
        getTodos().then((res)=>{
            SetTodos(res.total)
        })

    },[])

    return (
        <Space size={20} direction='vertical' >
            <Typography.Title level={4}>Trang chủ</Typography.Title>
            <Space size={100} direction='horizontal' >
                <DashboardCard icon={<FaNewspaper style={iconStyle('blue', "rgba(0,0,255,0.25)")} />} title={"Tổng số Task"} value={todos} />
                <DashboardCard icon={<MdAdminPanelSettings style={iconStyle('green', "rgba(0,255,0,0.25)")} />} title={"TASK hoàn thành"} value={10} />
                <DashboardCard icon={<LuClipboardEdit style={iconStyle('red', "rgba(255,0,0,0.25)")} />} title={"TASK đang thực hiện"} value={10} />
                <DashboardCard icon={<FaArrowsToDot style={iconStyle('purple', "rgba(0,255,255,0.25)")} />} title={"TODOS"} value={10} />
            </Space>
            <Typography.Title level={4}>Recent Task</Typography.Title>
            <Space size={200} direction='horizontal'>
                <RecentTodos />
                
                <AllIntern />
                {/* <DashboardChart /> */}
            </Space>
            
        </Space>
    );
};

const iconStyle = (color, bgColor) => ({
    color,
    backgroundColor: bgColor,
    borderRadius: 20,
    fontSize: 50,
    padding: 8,
});

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction='horizontal'>
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function RecentTodos() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getTodos()
            .then(res => {
                setDataSource(res.todos.splice(0, 20));
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Table
            columns={[
                {
                    title: 'Task',
                    dataIndex: 'todo',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'completed',
                    render: (text, record) => {
                        console.log('record',record)
                        let color = 'volcano';
                        let status = 'Chưa hoàn thành';

                        if (record.inProgress) {
                            color = 'orange';
                            status = 'Đang tiến hành';
                        } else if (record.completed) {
                            color = 'green';
                            status = 'Hoàn thành';
                        }

                        return <Tag color={color}>{status}</Tag>;
                    },
                },
                {
                    title: 'Người nhận',
                    dataIndex: 'userId',
                },
            ]}
            dataSource={dataSource}
            loading={loading}
            rowKey="id" // Add rowKey for better table performance and handling
        />
    );
}

function AllIntern() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getIntern()
            .then(res => {
                setDataSource(res.users.splice(0, 10));
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
        <Typography.Title level={4}>Danh sách Intern</Typography.Title>
            <Table 
                columns={[
                    {
                        title: 'Hình ảnh',
                        dataIndex: 'image',
                        render: (text, record) => <img src={record.image} alt="Intern" style={{ width: 30, borderRadius: '50%' }} />
                    },
                    {
                        title: 'Tên Intern',
                        dataIndex: 'firstName',
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                    },
                    {
                        title: 'Số điện thoại',
                        dataIndex: 'phone',
                    },
                ]}
                dataSource={dataSource}
                loading={loading}
                rowKey="id" // Add rowKey for better table performance and handling
            />
  </div>
    );
}

// function DashboardChart() {
//     const labels = ['Todos', 'Task đang thực hiện', 'Task hoàn thành'];
//     const data = {
//         labels,
//         datasets: [
//             {
//                 label: 'Dataset 1',
//                 data: labels.map(() => Math.random() * 20),
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             },
//             {
//                 label: 'Dataset 2',
//                 data: labels.map(() => Math.random() * 20),
//                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
//             },
//         ],
//     };
//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'bottom',
//             },
//             title: {
//                 display: true,
//                 text: 'Task Progress',
//             },
//         },
//     };

//     return <Bar options={options} data={data} />;
// }

export default Dashboard;
