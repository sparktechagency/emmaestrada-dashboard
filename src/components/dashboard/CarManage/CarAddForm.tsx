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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    console.log(files)
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value)
    );
    images.forEach((img) => payload.append("images", img));

    console.log("🚗 Car Add FormData:", Object.fromEntries(payload));
  };

    return (
    <div className="p-6 rounded-xl">
      {/* Form Fields */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Two-column fields */}
          <Grid size={6}>
            <TextField
              name="carName"
              label="Car Name"
              fullWidth
              value={formData.carName}
              onChange={handleChange}
              InputProps={{ style: { height: 45 } }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              name="price"
              label="Price (e.g. $250/PW)"
              fullWidth
              value={formData.price}
              onChange={handleChange}
              InputProps={{ style: { height: 45 } }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              name="location"
              label="Location"
              fullWidth
              value={formData.location}
              onChange={handleChange}
              InputProps={{ style: { height: 45 } }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              name="carType"
              label="Car Type"
              fullWidth
              value={formData.carType}
              onChange={handleChange}
              InputProps={{ style: { height: 45 } }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              name="seats"
              label="Seats"
              fullWidth
              value={formData.seats}
              onChange={handleChange}
              InputProps={{ style: { height: 45 } }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              name="transmission"
              label="Transmission"
              fullWidth
              value={formData.transmission}
              onChange={handleChange}
              InputProps={{ style: { height: 45 } }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              name="fuelType"
              label="Fuel Type"
              fullWidth
              value={formData.fuelType}
              onChange={handleChange}
              InputProps={{ style: { height: 45 } }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              name="mileage"
              label="Mileage"
              fullWidth
              value={formData.mileage}
              onChange={handleChange}
              InputProps={{ style: { height: 45 } }}
            />
          </Grid>

          {/* Full-row Description */}
          <Grid size={12}>
            <TextField
              name="description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          {/* Full-row Image Upload */}
          <Grid size={12}>
            <Typography variant="h6" className="mb-2 font-semibold">
              Upload Images
            </Typography>

            <label
              htmlFor="car-images"
              className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
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

            {/* Preview */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {images.map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-28 h-28 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </Grid>

          <Grid size={12}>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              className="block w-full"
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
          {/* Submit Button */}
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
