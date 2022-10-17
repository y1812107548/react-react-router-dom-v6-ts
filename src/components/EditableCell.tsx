import { InputNumber, Input, Form } from 'antd';
import React from 'react'
import { EditableCellProps } from '../types/common';

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
    // console.log(editing,dataIndex,title,inputType);
    return (
        <td {...restProps}>
            {
                editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{margin:0}}
                        rules={[
                            {
                                required:true,
                                message:`请输入${title}`
                            }
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : children
            }
        </td>
    )
}

export default EditableCell