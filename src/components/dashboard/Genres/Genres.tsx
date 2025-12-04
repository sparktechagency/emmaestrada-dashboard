import { Button } from '@mui/material'
import React, { useState } from 'react'
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import GenresList from './GenresList';
import SharedModal from '../../shared/SharedModal';
import AddGenre from './AddGenre';

const Genres = () => {
    const [open, setOpen] = useState(false);

    
    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl text-primary font-semibold">Content Library</h1>
                <Button
                    variant="contained"
                    size='medium'
                    startIcon={<AddOutlinedIcon fontSize="medium" />}
                    sx={{ background: "#CF9702" }}
                    onClick={() => setOpen(true)}
                >
                    Add Genre
                </Button>
            </div>

            <GenresList data={genreData} />
            {open && 
            <SharedModal width={600}  title="Add New Genre" open={open} handleClose={() => setOpen(!open)}>
            <AddGenre />
            </SharedModal>}
        </div>
    )
}

export default Genres


const genreData = [
    { id: 1, name: "Romantic", count: 3 },
    { id: 2, name: "Action", count: 8 },
    { id: 3, name: "Comedy", count: 5 },
    { id: 4, name: "Thriller", count: 6 },
    { id: 5, name: "Horror", count: 4 },
    { id: 6, name: "Sci-Fi", count: 7 },
    { id: 7, name: "Drama", count: 10 },
    { id: 8, name: "Adventure", count: 9 },
    { id: 9, name: "Fantasy", count: 5 },
    { id: 10, name: "Documentary", count: 2 }
];
