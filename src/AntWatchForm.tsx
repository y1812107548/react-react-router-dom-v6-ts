import React,{useEffect} from "react";
import { Form, InputNumber, Input, Typography } from "antd";

const { Text } = Typography
const AntWatchForm:React.FC = () => {
    const [form] = Form.useForm()
    const newName = Form.useWatch('name', form)
    const newSex = Form.useWatch('sex',form)
    useEffect(()=>{
        console.log('触发更新');
        form.validateFields(['name']);
        return ()=>{
            console.log('销毁effect');
        }
    },[newName,form])
    return (
        <>
            <Form form={form} layout="vertical" autoComplete="off">
                <Form.Item name="name" label="姓名">
                    <Input />
                </Form.Item>
                <Form.Item name="age" label="年龄">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="sex" label="性别">
                    <Input />
                </Form.Item>
            </Form>
            <Typography>
                <pre>Name Value: {newName}</pre>
            </Typography>
        </>
    )
}

export default AntWatchForm