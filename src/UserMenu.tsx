import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    tags: Array<unknown>
}

const columns: ColumnsType<DataType> = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
        width: 150,
        fixed: 'left'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter:(a,b)=> a.age - b.age,
        width: 80,
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address 1',
        ellipsis: true,
    },
    {
        title: '很长很长的表题',
        dataIndex: 'address',
        key: 'address 2',
        ellipsis: true,
    },
    {
        title: '长表题',
        dataIndex: 'address',
        key: 'address 3',
        ellipsis: true,
    },
    {
        title: '长表题',
        dataIndex: 'address',
        key: 'address 4',
        ellipsis: true,
    },
    {
        title: '长表题',
        dataIndex: 'address',
        key: 'address 4',
        ellipsis: true,
    },
    {
        title: '长表题',
        dataIndex: 'address',
        key: 'address 4',
        ellipsis: true,
    },
    {
        title: '长表题',
        dataIndex: 'address',
        key: 'address 4',
        ellipsis: true,
    },
    {
        title: '长表题',
        dataIndex: 'address',
        key: 'address 4',
        ellipsis: true,
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 200,
        render: (value: any, record: DataType) => (
            <Space size="middle">
                <Button ghost type='primary'>编辑</Button>
                <Button danger>删除</Button>
            </Space>
        ),
    }
];

const ayncData: DataType[] = []
for (let i = 0; i < 100; i++) {
    ayncData.push({
        key: i,
        name: 'Jonhn Brown' + i,
        age: Math.round(Math.random() * 100 + i),
        address: `New York No. ${i} Lake Park, New York No. 1 Lake Park`,
        tags: ['nice', 'developer']
    })
}
const UserMenu: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<DataType[]>([])
    setTimeout(() => {
        setData(ayncData)
        setLoading(false)
    }, 1000);
    return (
        <Table loading={loading} columns={columns} dataSource={data} scroll={{ x: 1300 }} />
    )
}

export default UserMenu;