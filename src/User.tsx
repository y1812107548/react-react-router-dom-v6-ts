import React, { useState } from 'react'
import { Form, Popconfirm, Table, Typography } from 'antd'
import EditableCell from './components/EditableCell'
import { Row } from './types/common'

const originData: Row[] = []
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: 'edrward' + i,
        age: 19,
        address: 'London park no.' + i
    })
}


const User: React.FC = () => {
    const [form] = Form.useForm()
    const [data, setData] = useState<Row[]>([]);
    const [editingKey, setEditingKey] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(true)
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
    const columns = [
        {
            title: '名字',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            width: '15%',
            editable: true,
        },
        {
            title: '地址',
            dataIndex: 'address',
            width: '40%',
            editable: true,
        },
        {
            title: '操作',
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
                pagination={{
                    onChange: handleCancel,
                }}
            >

            </Table>
        </Form>
    )
}

export default User