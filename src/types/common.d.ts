// user table items
export interface Row {
    key: string;
    name: string;
    age: number;
    address: string;
}
// 编辑表格props
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Row;
    index: number;
    children: React.ReactNode;
}
