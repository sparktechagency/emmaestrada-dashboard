import { Button, Divider, Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { imageUrl } from "../../../redux/base/baseAPI";
import toast from "react-hot-toast";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../redux/features/categoryApi";

type TProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: any;
  setSelectedCategory: (editData: any) => void;
  refetch: () => void;
};

const AddcategoryModal = ({
  open,
  setOpen,
  editData,
  setSelectedCategory,
  refetch,
}: TProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [imgURL, setImgURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [updateCategory] = useUpdateCategoryMutation();
  const [addCategory] = useAddCategoryMutation();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData]);

  const handleAddCategory = async (values: any) => {
    try {
      if (editData) {
        const formData = new FormData();
        formData.append("title", values?.title);
        // @ts-ignore
        formData.append("image", imageFile);

        setLoading(true);

        const res = await updateCategory({ id: editData?._id, formData });
        if (res?.data) {
          refetch();
          form.resetFields();
          setImgURL(null);
          setImageFile(null);

          toast.success(res?.data?.message);
          setOpen(false);
          setLoading(false);
        }
      } else {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", values?.title);
        // @ts-ignore
        formData.append("image", imageFile);

        const res = await addCategory(formData);
        if (res?.data) {
          refetch();
          setImgURL(null);
          setImageFile(null);
          setSelectedCategory(null);
          toast.success(res?.data?.message);
          form.resetFields();
          setOpen(false);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleClose = () => {
    setImgURL(null);
    setImageFile(null);
    setOpen(false);
    setSelectedCategory(null);
    form.resetFields();
  };

  return (
    <Modal
      title={
        <p className="text-2xl pt-2.5 pb-1 leading-0 font-semibold text-primary">
          {editData ? "Edit" : "Add"} Category
        </p>
      }
      open={open}
      onCancel={handleClose}
      footer={false}
      centered
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddCategory}
        style={{ marginTop: 10 }}
      >
        <Form.Item
          name="image"
          rules={[
            {
              required: false,
              message: "Please upload an image",
            },
          ]}
        >
          <div className="flex justify-center items-center gap-10 mb-10">
            <div className="h-32 w-full flex items-center justify-center bg-gray-300 rounded-lg relative">
              <div className="p-4">
                {imgURL || editData?.image ? (
                  <>
                    {imgURL ? (
                      <img
                        src={imgURL}
                        alt="preview"
                        className="h-32 w-44 object-cover rounded-md p-2"
                      />
                    ) : (
                      <img
                        src={
                          editData?.image?.startsWith("http")
                            ? editData?.image
                            : editData?.image
                            ? `${imageUrl}${editData?.image}`
                            : "/default-avatar.jpg"
                        }
                        alt={`preview-`}
                        className="h-32 w-44 rounded-lg object-cover z-[99] p-2"
                      />
                    )}
                  </>
                ) : (
                  <CiImageOn className="text-5xl text-[#121212] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>

              <input
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  if (file) {
                    // @ts-ignore
                    setImgURL(URL?.createObjectURL(file));
                    setImageFile(file);
                  }
                }}
                type="file"
                id="img"
                name="image"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
              />
            </div>
          </div>
        </Form.Item>

        <FormItem
          label={<p className="text-gray font-bold">Category Name</p>}
          name="title"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input
            placeholder="Enter category name"
            style={{ height: 48, color: "black" }}
          />
        </FormItem>

        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            style={{ width: "100%", background: "#8B4E2E", marginTop: 30 }}
            loading={loading}
          >
            {editData ? "Edit" : "Add"} Category
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddcategoryModal;
