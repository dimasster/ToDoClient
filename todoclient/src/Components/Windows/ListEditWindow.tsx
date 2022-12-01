import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { backEndUrl } from "../../App";
import { ListType } from "../../Entities/ListType";

interface ListEditWindowProps {
    list: ListType;
    onExit: () => void;
}

const ListEditWindow: React.FC<ListEditWindowProps> = ({ list, onExit }) => {

    const [form] = Form.useForm();

    const [editedTitle, setEditedTitle] = useState<string>();

    const onEdit = () => {
        try {
            list.title = editedTitle === undefined ? "Edited" : editedTitle;
            axios.put(backEndUrl + 'api/todo', list);
        } catch (e) {
            console.log(e);
        }
        onExit();
    }

    const onFinish = (e: Event) => {
        setEditedTitle(list.title);
        onExit();
    }

    return (
        <div>
            <Form
                form={form}
                name="basic"
                layout="inline"
                onFinish={e => { onFinish(e) }}
            >
                <Form.Item label="Title">
                    <Input
                        id="title"
                        name="title"
                        value={editedTitle}
                        onChange={s => setEditedTitle(s.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='edit-btn'
                        onClick={onEdit}
                    >Edit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ListEditWindow;