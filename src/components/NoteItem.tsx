import React from "react";

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface TNote {
    title: string,
    date: string,
    favourite: boolean
}

type TNoteItem = {
    notedata: TNote;
    deleteNote: (data: string) => void;
    setFavouriteNote: (data: TNote) => void;
}
const NoteItem: React.FC<TNoteItem> = ({ notedata, deleteNote, setFavouriteNote }) => {

    return (
        <div className="note-item-box">
            <div className="star-icon">
                <IconButton aria-label="delete" onClick={() => setFavouriteNote(notedata)}>
                    {
                        notedata.favourite
                            ? <StarIcon color="primary" />
                            : <StarBorderIcon />
                    }
                </IconButton>
            </div>
            <div className="note-content">
                <div className="note-title">{notedata?.title}</div>
                <div className="note-date">{notedata?.date}</div>
            </div>
            <div className="note-delete">
                <IconButton aria-label="delete" onClick={() => deleteNote(notedata.title)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default NoteItem;