import React, { useState } from "react";
import { Select, Input, Form, Button, Row, Col, Cascader, InputNumber, AutoComplete, Checkbox } from "antd";
const { Option } = Select

interface Residences {
    value: string
    label: string
    children?: Residences[]
}
const residences: Residences[] = [
    {
        value: 'zhejiang',
        label: '浙江',
        children: [
            {
                value: 'hangzhou',
                label: '杭州',
                children: [
                    {
                        value: 'xihu',
                        label: '西湖',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: '江苏',
        children: [
            {
                value: 'nanjing',
                label: '南京',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: '中华门',
                    },
                ],
            },
        ],
    },
];


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const prefixSelector = (
    <Form.Item name='prefix' noStyle>
        <Select style={{ width: 80 }}>
            <Option value="86" >+86</Option>
            <Option value="87" >+87</Option>
        </Select>
    </Form.Item>
)

const suffixSelector = (
    <Form.Item name="suffix" noStyle>
        <Select style={{ width: 80 }}>
            <Option value="USD">$</Option>
            <Option value="CNY">¥</Option>
        </Select>
    </Form.Item>
)


const onFinish = (values: any) => {
    console.log(values);
}



const RegistryForm: React.FC = () => {
    const [form] = Form.useForm()
    const [autoComplete, setAutoComplete] = useState<string[]>([])

    const onWebsiteChange = (value: string) => {
        console.log('website change', value);
        if (!value) {
            setAutoComplete([]);
        } else {
            setAutoComplete(
                ['.com', '.cn', '.net'].map(v => `${value}${v}`)
            )
        }
    }
    console.log(autoComplete, 'autoComplete');
    const websiteOptions = autoComplete.map(v => ({
        label: v,
        value: v
    }))

    return (
        <Form
            {...formItemLayout}
            name="register"
            form={form}
            style={{ width: 800 }}
            onFinish={onFinish}
            initialValues={{
                prefix: '+86',
                suffix: '￥'
            }}
            scrollToFirstError
        >
            <Form.Item
                name='email'
                label='邮箱'
                rules={[
                    {
                        type: 'email',
                        message: '请输入正确邮箱'
                    },
                    {
                        required: true,
                        message: '邮箱是必填项'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='password'
                label="密码"
                rules={[
                    { required: true, message: '请输入密码' }
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name='confirmPassword'
                label='确认密码'
                dependencies={['password']}
                rules={[
                    { required: true, message: '请确认密码' },
                    ({ getFieldValue }) => ({
                        validator(rule, value, callback) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error('两次输入密码不一致'))
                        }
                    })
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="nickName"
                label="用户名"
                tooltip='请填写自己的真实名字'
                rules={[
                    { required: true, message: '请输入用户名', whitespace: true }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='residence'
                label="区域"
                rules={[
                    {
                        type: 'array',
                        required: true,
                        message: '请选择你的区域'
                    }
                ]}
            >
                <Cascader options={residences} />
            </Form.Item>
            <Form.Item
                name="phone"
                label="手机号码"
                rules={[{ required: true, message: '请输入你的电话号码' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name="donation"
                label="捐款"
                rules={[{ required: true, message: '请输入捐款钱数!' }]}
            >
                <InputNumber addonAfter={suffixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name='website'
                label='网站地址'
                rules={[
                    { required: true, message: '请填写网站地址' }
                ]}
            >
                <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
                    <Input />
                </AutoComplete>
            </Form.Item>

            <Form.Item
                name="intro"
                label="自我介绍"
                rules={[{ required: true, message: '请自我介绍' }]}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
                name="gender"
                label="性别"
                rules={[{ required: true, message: '请选择性别!' }]}
            >
                <Select placeholder="性别">
                    <Option value="male">雄性</Option>
                    <Option value="female">雌性</Option>
                    <Option value="other">雌雄同体</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="验证码"
                extra="我们必须确保你是人类"
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            name='captcha'
                            noStyle
                            rules={[
                                { required: true, message: '请输入验证码' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Button>获取验证码</Button>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item
                name='agreement'
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('是否同意协议'))
                    }
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    我已经阅读并同意协议 <a href="" onClick={e=>e.preventDefault()}>《告客户协议书》</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    )
}

export default RegistryForm