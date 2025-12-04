import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { imageUrl } from "../../../redux/base/baseAPI";
import { useGetProfileQuery } from "../../../redux/features/auth/authApi";
import { useEditProfileMutation } from "../../../redux/features/user/userApi";
import SharedInput from "../../shared/SharedInput";

const PersonalInformation = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [editProfile, { isLoading: editing }] = useEditProfileMutation();
  const { data: profileData, refetch } = useGetProfileQuery(undefined);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  // Prefill form
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData?.name || "",
        email: profileData?.email || "",
        mobile: profileData?.mobile || "",
      });
    }
  }, [profileData]);

      // Handle input changes
    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

  // Submit general profile info
  const onSubmit = async () => {
    try {
      const res = await editProfile(formData).unwrap();
      refetch();
      toast.success("Profile updated");
    } catch (error) {
      console.log(error);
    }
  };

  // Submit image upload
  const handleImageUpload = async () => {
    if (!imageFile) return toast.error("No file selected");

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      const res = await editProfile(formData).unwrap();
      toast.success("Profile image updated");
      setImageFile(null);
      setImgURL(null);
      setFileList([]);
      refetch();
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h6" fontWeight={600} color="primary" mb={4}>
        Profile Information
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 2fr" },
          gap: 3,
        }}
      >
        {/* Profile Photo */}
        <Card
          sx={{
            height: "100%",
            background: 'var(--color-cardBg)'
          }}
        >
          <CardHeader
            title={
              <Typography color="var(--color-secondary)" fontWeight={600}>
                Profile Photo
              </Typography>
            }
          />

          <CardContent>
            <Box sx={{ textAlign: "center", pb: 2 }}>
              <img
                src={
                  imgURL ??
                  (profileData?.profileImage
                    ? `${imageUrl}${profileData.profileImage}`
                    : "/placeholder.png")
                }
                alt="Profile"
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />

              {/* Hidden File Input */}
              <input
                type="file"
                id="upload-img"
                hidden
                accept="image/*"
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setImgURL(URL.createObjectURL(file));
                  }
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                  size="large"
                  htmlFor="upload-img"
                >
                  Change Photo
                </Button>

                {imgURL && imageFile && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    size="large"
                    onClick={handleImageUpload}
                    disabled={editing}
                  >
                    {editing && <CircularProgress size={20} sx={{ mr: 1 }} />}
                    Save New Photo
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card sx={{ p: 3, maxWidth: 600, background: 'var(--color-cardBg)' }} >
          <Typography variant="h6" fontWeight={600} color="var(--color-secondary)" mb={3}>
            Profile Information
          </Typography>

          <Box sx={{ display: "grid", gap: 3 }}>
            <SharedInput
              label="Name"
              placeholder="Name"
              value={formData.name}
              onChange={(e: any) => handleChange("name", e.target.value)}
            />
            <SharedInput
              label="Email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e: any) => handleChange("email", e.target.value)}
            />
            <SharedInput
              label="Mobile"
              placeholder="Enter mobile"
              value={formData.mobile}
              onChange={(e: any) => handleChange("mobile", e.target.value)}
            />
           
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onSubmit}
            >
              Save Changes
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default PersonalInformation;
