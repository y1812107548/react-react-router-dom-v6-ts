
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';

const { Option } = Select;

const areas = [
    { label: '北京', value: 'Beijing' },
    { label: '上海', value: 'Shanghai' },
];

const sights = {
    Beijing: ['天安门', '南天门'],
    Shanghai: ['朝天门', '东方明珠'],
};

type SightsKeys = keyof typeof sights;

const AntAddForm: React.FC = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const onFinish = (values: any) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        console.log(values);
    }
    const handleChange = (e:any) => {
        form.setFieldsValue({ sights: [] });
    }
    return (
        <Form 
            style={{ width: 500 }} 
            form={form} 
            name="dynamic_form_nest_item" 
            onFinish={onFinish} autoComplete="off">
            <Form.Item name="area" label="Area" rules={[{ required: true, message: 'Missing area' }]}>
                <Select options={areas} onChange={handleChange} />
            </Form.Item>
            <Form.List name="sights">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(field => (
                            <Space key={field.key} align="baseline">
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, curValues) =>
                                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                    }
                                >
                                    {() => (
                                        <Form.Item
                                            {...field}
                                            label="区域"
                                            name={[field.name, 'sight']}
                                            rules={[{ required: true, message: '请选择区域' }]}
                                        >
                                            <Select disabled={!form.getFieldValue('area')} style={{ width: 130 }}>
                                                {(sights[form.getFieldValue('area') as SightsKeys] || []).map(item => (
                                                    <Option key={item} value={item}>
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label="价格"
                                    name={[field.name, 'price']}
                                    rules={[{ required: true, message: '请输入价格' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}

                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                新增表单
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    提交表单
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AntAddForm