import { List } from "antd";
import React from 'react';
import { NoteType } from '../../Entities/NoteType';
import NoteItem from '../Items/NoteItem';

interface NoteContentProps {
    notes: NoteType[];
    removeNote: Function;
}

const ListContent: React.FC<NoteContentProps> = ({ notes, removeNote }) => {

    return (
        <div
            className="note-content"
        >
            <List
                dataSource={notes}
                itemLayout="horizontal"
                bordered={true}
                renderItem={(note) => (
                    <NoteItem
                        key={note.noteId}
                        noteData={note}
                        removeNote={removeNote}
                    />
                )}
            />
        </div>
    )
}

export default ListContent