import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import React from 'react';
import { NoteType } from "../../Entities/NoteType";

const { Option } = Select;

const DEFAULT_VALUE = {
    noteId: 0,
    listId: 0,
    title: '',
    noteValue: 1,
    noteUnitType: 'unit',
    isDone: false
}

interface NoteFormProps {
    addNote: (note: NoteType) => void;
    curListId: number;
}

const NoteForm: React.FC<NoteFormProps> = ({ addNote, curListId }) => {

    const [note, setNote] = React.useState(DEFAULT_VALUE);

    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNote({ ...note, title: event.target.value });
    }

    const onValueChange = (value: number | string | null) => {
        setNote({ ...note, noteValue: Number(value) });
    }

    const onUnitChange = (value: string) => {
        setNote({ ...note, noteUnitType: value });
    }

    const onDoneChange = (value: boolean) => {
        setNote({ ...note, isDone: value })
    }

    const onClick = () => {
        note.listId = curListId;
        addNote(note);
        setNote(DEFAULT_VALUE);
    }

    const selectUnit = (
        <Select
            defaultValue="kg"
            onChange={onUnitChange}
            style={{ width: 60 }}
            value={note.noteUnitType}
        >
            <Option value="unit">unit</Option>
            <Option value="kg">kg</Option>
            <Option value="g">g</Option>
            <Option value="l">l</Option>
            <Option value="ml">ml</Option>
        </Select>
    );

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    return (
        <div className='note-form'>
            <Form
                name="basic"
                layout="inline"
                disabled={curListId == -1}
                onFinish={onClick}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name='title'
                    rules={[
                        { required: true, message: 'Please input title!' },
                        { max: 10, message: 'Title should be less than 10 character' }
                    ]}
                >
                    <Input
                        value={note.title}
                        placeholder="Note Title"
                        onChange={onTitleChange}
                    />
                </Form.Item>
                <Form.Item
                    name='number'
                    rules={[
                        { required: true, message: 'Please enter value' },
                        { type: 'number', min: 1, max: 999}
                    ]}
                >
                    <InputNumber
                        value={note.noteValue}
                        addonAfter={selectUnit}
                        onChange={onValueChange}
                    />
                </Form.Item>
                <Form.Item label="Is Done">
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={onDoneChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Add Note</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default NoteForm;