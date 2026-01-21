import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SharedInput from "../../shared/SharedInput";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  onSubmit: (values: any) => void;
  editData?: any;
}

const SliderModal: React.FC<Props> = ({
  open,
  setOpen,
  onSubmit,
  editData,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [values, setValues] = useState({
    name: "",
    link: "",
  });

  // Populate form when editing existing slider
  useEffect(() => {
    if (editData) {
      setValues({
        name: editData.name || "",
        link: editData.link || "",
      });

      // Show existing image if available
      if (editData.imageUrl || editData.image) {
        setPreviewUrl(editData.imageUrl || editData.image);
      }
    }
  }, [editData]);

  const handleClose = () => {
    setOpen(false);
    setValues({ name: "", link: "" });
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering file input
    setImageFile(null);
    setPreviewUrl(null);
  };

  const triggerFileInput = () => {
    document.getElementById("slider-image-upload")?.click();
  };

  const handleSubmit = () => {
    if (!imageFile) return;

    onSubmit({
      ...values,
      imageFile, // File | null — new image if uploaded
      // You can also include: existingImageUrl: previewUrl (if no new file)
    });

    // Reset local state
    setImageFile(null);
    setPreviewUrl(null);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: "#121212",
          color: "white",
          borderRadius: 3,
          border: "1px solid rgba(207,151,2,0.6)",
        },
      }}
    >
      <DialogTitle fontWeight={600}>
        {editData ? "Edit Slider" : "Add Slider"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* === Clickable Image Upload / Preview Area === */}
          <Box
            onClick={triggerFileInput}
            sx={{
              width: "100%",
              position: "relative",
              mb: 3,
              cursor: "pointer",
              borderRadius: 3,
              overflow: "hidden",
              transition: "all 0.2s ease",
              "&:hover": {
                opacity: 0.92,
                boxShadow: previewUrl
                  ? "0 0 0 3px rgba(207,151,2,0.3)"
                  : "0 0 0 3px rgba(207,151,2,0.5)",
              },
            }}
          >
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Slider preview"
                  style={{
                    width: "100%",
                    height: 240,
                    objectFit: "cover",
                    display: "block",
                    borderRadius: 12,
                  }}
                />
                {/* Remove button */}
                <IconButton
                  onClick={handleRemoveImage}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(220,0,0,0.9)",
                    },
                    zIndex: 10,
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>

                {/* Hover overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.25s",
                    pointerEvents: "none",
                    borderRadius: 3,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Click to change image
                  </Typography>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: 240,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "2px dashed rgba(207,151,2,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.6)",
                  transition: "all 0.25s",
                  "&:hover": {
                    borderColor: "rgba(207,151,2,0.9)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Click to upload slider image
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Recommended: 1200 × 400px or wider
                </Typography>
              </Box>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              id="slider-image-upload"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Box>        
          <Grid size={12}>
            <SharedInput
              label="Link"
              value={values.link}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValues({ ...values, link: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!imageFile}
        >
          {editData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SliderModal;