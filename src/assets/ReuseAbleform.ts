/*

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SharedInput from "../../shared/SharedInput";
import { RxCross2 } from "react-icons/rx";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CarAddForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    carName: "",
    price: "",
    location: "",
    carType: "",
    seats: "",
    transmission: "",
    fuelType: "",
    mileage: "",
    description: "",
  });
  const [files, setFiles] = useState([]);

  // Handle input changes
  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(files);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value)
    );
    images.forEach((img) => payload.append("images", img));

    console.log("🚗 Car Add FormData:", Object.fromEntries(payload));
  };

  const handleRemove = (index:number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  return (
    <div className="p-6 rounded-xl">      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>          
          <Grid size={6}>
            <SharedInput
              label="Car Name"
              placeholder="Enter car name"
              value={formData.carName}
              onChange={(e: any) => handleChange("carName", e.target.value)}
            />
          </Grid>

          
          <Grid size={6}>
            <SharedInput
              label="Price (e.g. $250/PW)"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e: any) => handleChange("price", e.target.value)}
            />
          </Grid>

          
          <Grid size={6}>
            <SharedInput
              label="Location"
              placeholder="Enter location"
              value={formData.location}
              onChange={(e: any) => handleChange("location", e.target.value)}
            />
          </Grid>

          <Grid size={6}>
            <SharedInput
              label="Car Type"
              placeholder="Enter car type"
              value={formData.carType}
              onChange={(e: any) => handleChange("carType", e.target.value)}
            />
          </Grid>

          
          <Grid size={6}>
            <SharedInput
              label="Seats"
              placeholder="Enter seats"
              value={formData.seats}
              onChange={(e: any) => handleChange("seats", e.target.value)}
            />
          </Grid>

          
          <Grid size={6}>
            <SharedInput
              label="Transmission"
              placeholder="Auto / Manual"
              value={formData.transmission}
              onChange={(e: any) =>
                handleChange("transmission", e.target.value)
              }
            />
          </Grid>

          
          <Grid size={6}>
            <SharedInput
              label="Fuel Type"
              placeholder="Enter fuel type"
              value={formData.fuelType}
              onChange={(e: any) => handleChange("fuelType", e.target.value)}
            />
          </Grid>

          
          <Grid size={6}>
            <SharedInput
              label="Mileage"
              placeholder="Enter mileage"
              value={formData.mileage}
              onChange={(e: any) => handleChange("mileage", e.target.value)}
            />
          </Grid>
          
          <Grid size={12}>
            <SharedInput
              label="Description"
              placeholder="Write description"
              value={formData.description}
              onChange={(e: any) => handleChange("description", e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "auto !important",
                  color: "var(--color-black-200)",
                },
              }}
              multiline
              rows={4}
            />
          </Grid>

          
           <Grid size={12}>
      <Typography variant="h6" className="mb-2 font-semibold text-black-200 pb-4">
        Upload Images
      </Typography>

      
      <label
        htmlFor="car-images"
        className="border-2 border-dashed border-black-200 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700/20"
      >
        <IconButton color="primary">
          <AddPhotoAlternateIcon fontSize="large" />
        </IconButton>

        <p className="text-gray-600">
          Click or drag images to upload (max 5)
        </p>

        <input
          id="car-images"
          type="file"
          multiple
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>

      
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {images.map((file, i) => (
            <div
              key={i}
              className="relative w-28 h-28"
            >
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-full object-cover rounded-lg border"
              />

              
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemove(i)}
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  background: "white",
                  "&:hover": { background: "#fee" },
                }}
              >
                <RxCross2 size={15}/>
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </Grid>

          
          <Grid size={12}>
            <Button
              variant="outlined"
              className="block w-full"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              Upload files
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={(event) => {
                  if (event.target.files) {
                    const newFiles = Array.from(event.target.files);
                    // @ts-ignore
                    setFiles((prev: File[]) => [...prev, ...newFiles]);
                  }
                }}
              />
            </Button>
          </Grid>

          
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Car
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CarAddForm;
*/