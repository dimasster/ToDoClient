import { List } from "antd";
import React from 'react';
import { ListType } from '../../Entities/ListType';
import ListItem from '../Items/ListItem';

interface ListContentProps {
    lists: ListType[];
    curListId: number;
    setCurListId: Function;
    removeList: Function;
}

const ListContent: React.FC<ListContentProps> = ({ lists, curListId, setCurListId, removeList }) => {

    return (
        <div
            className="list-content"
        >
            <List
                dataSource={lists}
                itemLayout="horizontal"
                bordered={true}
                renderItem={(list) => (
                    <ListItem
                        key={list.listId}
                        listData={list}
                        curListId={curListId}
                        setCurListId={setCurListId}
                        removeList={removeList}
                    />
                )}
            />
        </div>
    )
}

export default ListContent