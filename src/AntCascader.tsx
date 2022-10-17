import React, { useState } from 'react';
import { Cascader } from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
interface Option {
  value: string | number
  label: string
  children?: Option[]
  disabled?: boolean,
  isLeaf?: boolean;
  loading?: boolean;
}

const optionsList: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf:false,
    // children: [
    //   {
    //     value: 'hangzhou',
    //     label: 'Hangzhou',
    //     isLeaf:false,
    //     children: [
    //       {
    //         value: 'xihu',
    //         label: 'West Lake',
    //         isLeaf:false,
    //       },
    //       {
    //         value: 'xiasha',
    //         label: 'Xia Sha',
    //         disabled: true,
    //         isLeaf:false,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf:false,
    // children: [
    //   {
    //     value: 'nanjing',
    //     label: 'Nanjing',
    //     isLeaf:false,
    //     children: [
    //       {
    //         value: 'zhonghuamen',
    //         label: 'Zhong Hua men',
    //         isLeaf:false,
    //       },
    //     ],
    //   },
    // ],
  },
];


const AntCascader: React.FC = () => {
  const onChange = (value:any,options:any)=>{
    console.log(value,options);
  }

  const [options,setOptions] = useState<Option[]>(optionsList)
  
  const loadData = (selectedOptions:any[])=>{
    console.log(selectedOptions);
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true
    setTimeout(() => {
      targetOption.loading = false
      targetOption.children = [
        {
          label:`${targetOption.label} part 1`,
          value:'part1'
        },
        {
          label:`${targetOption.label} part 2`,
          value:'part2'
        }
      ]
      setOptions([...options])
    }, 1000);
  }

  const filter = (inputValue: any, path: DefaultOptionType[])=>{
    path.some(
      option => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  }
  return (
    <>
      <Cascader
        options={options}
        loadData={loadData}
        onChange={onChange}
        changeOnSelect 
        // dropdownRender={dropdownRender}
        // showSearch={{filter}}
      />
    </>
  );
};

export default AntCascader;