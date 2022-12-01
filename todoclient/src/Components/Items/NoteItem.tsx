import { Button, List, Tooltip, Switch, Modal } from "antd";
import React from "react";
import { NoteType } from "../../Entities/NoteType";
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import NoteEditWindow from "../Windows/NoteEditWindow";
import axios from "axios";
import { backEndUrl } from "../../App";

interface NoteItemProps {
    noteData: NoteType;
    removeNote: Function;
}

const NoteItem: React.FC<NoteItemProps> = ({ noteData, removeNote }) => {

    const [visible, setVisible] = React.useState(false);

    const changeStat = (value: boolean) => {
        noteData.isDone = value;
        axios.put(backEndUrl + 'api/todo/note', noteData);
    }
    const removeNoteItem = () => {
        removeNote(noteData.noteId);
    }

    const showEdit = () => {
        setVisible(true);
    }

    const hideEdit = () => {
        setVisible(false);
    }

    return (
        <List.Item
            className="list-item"
        >
            <div className='note-btn'>
                <List.Item.Meta
                    title={
                        <p
                            style={{ color: noteData.isDone ? "green" : "red" }}
                        >
                            {noteData.title}
                        </p>}
                    description={<p>{noteData.noteValue + noteData.noteUnitType}</p>}
                />
            </div>
            <Switch
                className="is-done-switch"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={noteData.isDone}
                onChange={changeStat}
            />
            <Tooltip className="edit-btn" title="edit">
                <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={showEdit} />
            </Tooltip>
            <Tooltip className="remove-btn" title="delete">
                <Button type="primary" shape="circle" icon={<CloseOutlined />} onClick={removeNoteItem} />
            </Tooltip>
            <Modal title="Edit List" visible={visible} onOk={hideEdit} onCancel={hideEdit} footer={[]}>
                <NoteEditWindow note={noteData} onExit={hideEdit} />
            </Modal>
        </List.Item>
    )
}

export default NoteItem;