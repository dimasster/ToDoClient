import { Button, List, Tooltip } from "antd";
import React from "react";
import { ListType } from "../../Entities/ListType";
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import Modal from "antd/lib/modal/Modal";
import ListEditWindow from "../Windows/ListEditWindow";

interface ListItemProps {
    listData: ListType;
    curListId: number;
    setCurListId: Function;
    removeList: Function;
}

const ListItem: React.FC<ListItemProps> = ({ listData, curListId, setCurListId, removeList }) => {

    const [visible, setVisible] = React.useState(false);

    const onClick = () => {
        setCurListId(listData.listId);
    }

    const removeListItem = () => {
        if (listData.listId === curListId) {
            setCurListId(-1);
        }
        removeList(listData.listId);
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
            <div onClick={onClick} className='list-btn'>
                <List.Item.Meta
                    title={<p>{listData.title}</p>}
                />
            </div>
            <Tooltip className="edit-btn" title="edit">
                <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={showEdit} />
            </Tooltip>
            <Tooltip className="remove-btn" title="delete">
                <Button type="primary" shape="circle" icon={<CloseOutlined />} onClick={removeListItem} />
            </Tooltip>
            <Modal title="Edit List" visible={visible} onOk={hideEdit} onCancel={hideEdit} footer={[]}>
                <ListEditWindow list={listData} onExit={hideEdit} />
            </Modal>
        </List.Item>
    )
}

export default ListItem;