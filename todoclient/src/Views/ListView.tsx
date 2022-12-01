import { Divider, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { backEndUrl } from '../App';
import ListContent from '../Components/Contents/ListContent'
import ListForm from '../Components/Forms/ListForm'
import { ListType } from '../Entities/ListType';

interface ListFormProps {
    curListId: number;
    setCurListId: Function;
}

const ListView: React.FC<ListFormProps> = ({ curListId, setCurListId }) => {

    const [lists, setLists] = React.useState<ListType[]>([]);

    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        fetchLists()
    }, [lists]);

    async function fetchLists() {
        try {
            if (loading) {
                return;
            }
            setLoading(true);
            await axios.get(backEndUrl+'api/todo').then((response) => {
                setLists(response.data);
            });
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }

    const addList = (list: ListType) => {
        axios.post(backEndUrl + 'api/todo', list );
    }

    const removeList = (list_id: ListType['listId']) => {
        if (lists.find(obj => obj.listId === list_id) !== undefined) {
            axios.delete(backEndUrl + 'api/todo/' + list_id.toString());
        }
        else
            console.log("wrong data");
    }

    return (
        <div
            className="list-view"
            id="scrollableLists"
            style={{
                overflow: 'auto',
            }}
        >
            <span className="ant-form-text">Lists</span>

            <ListForm addList={addList} />

            <InfiniteScroll
                dataLength={lists.length}
                next={fetchLists}
                hasMore={lists.length < 50}
                loader={<></>}
                endMessage={<></>}
                scrollableTarget="scrollableLists"
            >
                <ListContent
                    curListId={curListId}
                    setCurListId={setCurListId}
                    lists={lists}
                    removeList={removeList}
                />
            </InfiniteScroll>
        </div>
    )
}

export default ListView;