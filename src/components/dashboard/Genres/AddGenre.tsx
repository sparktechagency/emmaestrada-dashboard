import { Button, Grid } from '@mui/material';
import React, { useState } from 'react'
import SharedInput from '../../shared/SharedInput';

const AddGenre = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    // Handle input changes
    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('handleChange', formData)
    };

    return (
        <div className='p-6 rounded-xl'>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Car Name */}
                    <Grid size={12}>
                        <SharedInput
                            label="Genre Name"
                            placeholder="Enter genre name"
                            value={formData.name}
                            onChange={(e: any) => handleChange("name", e.target.value)}
                        />
                    </Grid>

                    <Grid size={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 2, background: 'var(--color-primary)' }}
                        >
                            Add Genre
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </div>
    )
}

export default AddGenre