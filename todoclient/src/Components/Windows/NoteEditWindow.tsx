import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { backEndUrl } from "../../App";
import { NoteType } from "../../Entities/NoteType";

interface NoteEditWindowProps {
    note: NoteType;
    onExit: () => void;
}

const NoteEditWindow: React.FC<NoteEditWindowProps> = ({ note, onExit }) => {

    const [form] = Form.useForm();

    const [editedNote, setEditedNote] = React.useState(note);

    const onValueChange = (value: number | string | null) => {
        editedNote.noteValue = Number(value);
    }

    const onUnitChange = (value: string) => {
        editedNote.noteUnitType = value;
    }

    const onDoneChange = (value: boolean) => {
        editedNote.isDone = value;
    }

    const selectUnit = (
        <Select
            defaultValue="kg"
            onChange={onUnitChange}
            style={{ width: 60 }}
            value={editedNote.noteUnitType}
            options={[
                {
                    value: 'unit',
                    label: 'unit',
                },
                {
                    value: 'kg',
                    label: 'kg',
                }, {
                    value: 'g',
                    label: 'g',
                }, {
                    value: 'l',
                    label: 'l',
                }, {
                    value: 'ml',
                    label: 'ml',
                }
            ]}
        />
    );

    const onEdit = () => {
        try {
            note.title = editedNote.title;
            note.noteValue = editedNote.noteValue;
            note.noteUnitType = editedNote.noteUnitType;
            note.isDone = editedNote.isDone;
            axios.put(backEndUrl + 'api/todo/note', note);
        } catch (e) {
            console.log(e);
        }
        onExit();
    }

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
                form={form}
                name="basic"
                layout="inline"
                onFinish={() => onEdit()}
                onFinishFailed={() => setEditedNote(note)}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label='Title'
                    name='title'
                    rules={[
                        { required: true, message: 'Please input title!' },
                        { max: 10, message: 'Title should be less than 10 character' }
                    ]}
                >
                    <Input
                        value={editedNote.title}
                        placeholder="Note Title"
                        onChange={s => { editedNote.title = s.target.value }}
                    />
                </Form.Item>
                <Form.Item
                    label="Value"
                    name='number'
                    rules={[
                        { required: true, message: 'Please enter value' },
                        { type: 'number', min: 1, max: 999 }
                    ]}
                >
                    <InputNumber
                        value={editedNote.noteValue}
                        addonAfter={selectUnit}
                        onChange={onValueChange}
                    />
                </Form.Item>
                <Form.Item label="Is Done">
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        checked={editedNote.isDone}
                        onChange={onDoneChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='edit-btn'
                    >Edit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default NoteEditWindow;