import { Button, Form, Input } from "antd";
import React, { useState } from 'react';
import { ListType } from "../../Entities/ListType";

const DEFAULT_VALUE = {
    listId: 0,
    title: ''
}

interface ListFormProps {
    addList: (list: ListType) => void;
}

const ListForm: React.FC<ListFormProps> = ({ addList }) => {

    const [list, setList] = React.useState(DEFAULT_VALUE);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setList({ ...list, title: event.target.value });
    }

    const onClick = () => {
        addList(list);
        setList(DEFAULT_VALUE);
    }

    return (
        <div className='list-form'>
            <Form
                name="basic"
                layout="inline"
                onFinish={onClick}
            >
                <Form.Item
                    name='title'
                    rules={[
                        { required: true, message: 'Please input title!' },
                        { max: 10, message: 'Title should be less than 10 character' }
                    ]}
                >
                    <Input
                        name="title-input"
                        value={list.title}
                        placeholder="Enter List Title"
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ListForm;