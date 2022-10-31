import React, { useState } from 'react'
import { Form, Popconfirm, Table, Tooltip, Typography } from 'antd'
import EditableCell from './components/EditableCell'
import { Row } from './types/common'

const originData: Row[] = []
const date = new Date()
for (let i = 0; i < 100; i++) {
    originData.push({
        key: date.getTime() + i.toString(),
        name: 'edrward' + i,
        nickName: 'Joker' + i,
        business: '客服组',
        age: 19,
        address: 'London park no.333333333333333333333333333333333333333' + i
    })
}


const User: React.FC = () => {
    const [form] = Form.useForm()
    const [data, setData] = useState<Row[]>([]);
    const [editingKey, setEditingKey] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)
    // 模拟接口
    setTimeout(() => {
        setData(originData)
        setLoading(false)
    }, 1000);
    const isEditable = (record: Row) => record.key === editingKey
    // 取消
    const handleCancel = () => setEditingKey('')
    // 保存
    const handleSave = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Row
            const newData = [...data]
            const index = newData.findIndex(item => key === item.key)
            if (index > -1) {
                const item = newData[index]
                newData.splice(index, 1, {
                    ...item,
                    ...row
                })
                setData(newData)
                setEditingKey('')

            } else {
                newData.push(row)
                setData(newData)
                setEditingKey('')
            }
        } catch (error) {
            console.log('表单验证不通过');
        }
    }
    // 编辑
    const handleEdit = (record: Partial<Row> & { key: React.Key }) => {
        console.log(record);
        form.setFieldsValue({ name: '', age: '', address: '', ...record })
        setEditingKey(record.key)
    }
    // 跳转详情
    const gotoDetail = (row: Row) => {
        console.log(row);
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            width: 200,
            render: (key: React.Key, record: Row) => <a onClick={() => gotoDetail(record)}> {key} </a>,
            editable: false,
            fixed: 'left' as 'left'
        },
        {
            title: '名字',
            dataIndex: 'name',
            width: 100,
            editable: true,
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            width: 100,
            editable: true
        },
        {
            title: '所属业务',
            dataIndex: 'business',
            width: 200,
            editable: true
        },
        {
            title: '年龄',
            dataIndex: 'age',
            width: 100,
            editable: true,
        },
        {
            title: '地址',
            dataIndex: 'address',
            ellipsis: true,
            editable: true,
        },
        {
            title: '地址',
            dataIndex: 'address',
            ellipsis: {
                showTitle:false
            },
            editable: true,
            render:(address:Row['address']) =>(
                <Tooltip placement='topLeft' title={address}>{address}</Tooltip>
            )
        },
        {
            title: '操作',
            fixed: 'right' as 'right',
            width: 200,
            dataIndex: 'operation',
            render: (_: any, record: Row) => {
                const editable = isEditable(record)
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => handleSave(record.key)} style={{ marginRight: 8 }}>
                            保存
                        </Typography.Link>
                        <Popconfirm title="确认取消？" onConfirm={handleCancel}>
                            <a>取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => handleEdit(record)}>
                        编辑
                    </Typography.Link>
                )
            }
        }
    ];
    const mergedColumns = columns.map(col => {
        // console.log(col);
        if (!col.editable) return col
        return {
            ...col,
            onCell: (record: Row) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditable(record)
            })
        }
    })
    // console.log(mergedColumns);
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
                loading={loading}
                bordered
                dataSource={data}
                columns={mergedColumns}
                scroll={{ x: 1500 }}
                pagination={{
                    onChange: handleCancel,
                }}
            >

            </Table>
        </Form>
    )
}

export default User