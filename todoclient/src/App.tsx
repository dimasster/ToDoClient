import React from 'react';
import './App.css';
import ListView from './Views/ListView';
import NoteView from './Views/NoteView';

export const backEndUrl: string = 'https://localhost:7217/';

function App() {

    const [curListId, setCurListId] = React.useState(-1);

    return (
        <div className="App">
            <ListView curListId={curListId} setCurListId={setCurListId}></ListView>
            <NoteView curListId={curListId}></NoteView>
        </div>
    );
}

export default App;
