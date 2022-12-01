import axios from 'axios';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { backEndUrl } from '../App';
import NoteContent from '../Components/Contents/NoteContent'
import NoteForm from '../Components/Forms/NoteForm'
import { NoteType } from '../Entities/NoteType';

interface NoteViewProps {
    curListId: number
}

const NoteView: React.FC<NoteViewProps> = ({ curListId }) => {

    const [notes, setNotes] = React.useState<NoteType[]>([]);

    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        fetchNotes();
    }, [notes]);

    async function fetchNotes() {
        try {
            if (loading) {
                return;
            }
            setLoading(true);
            await axios.get<NoteType[]>(backEndUrl + 'api/todo/note').then((response) => {
                setNotes(response.data.filter(item => item.listId === curListId));
            });
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }

    const addNote = (note: NoteType) => {
        axios.post(backEndUrl + 'api/todo/note', note);
    }

    const removeNote = (note_id: NoteType['noteId']) => {
        if (notes.find(obj => obj.noteId === note_id) !== undefined) {
            axios.delete(backEndUrl + 'api/todo/note/' + note_id.toString());
        }
        else
            console.log("wrong data");
    }

    return (
        <div
            className="note-view"
            id="scrollableNotes"
            style={{
                overflow: 'auto',
            }}
        >
            <span className="ant-form-text">Notes</span>

            <NoteForm
                addNote={addNote}
                curListId={curListId}
            />

            <InfiniteScroll
                dataLength={notes.length}
                next={fetchNotes}
                hasMore={notes.length < 50}
                loader={<></>}
                endMessage={<></>}
                scrollableTarget="scrollableNotes"
            >
                <NoteContent
                    notes={notes}
                    removeNote={removeNote}
                />
            </InfiniteScroll>
        </div>
    )
}

export default NoteView;