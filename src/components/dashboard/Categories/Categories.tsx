import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table, Tooltip } from "antd";
import { useState } from "react";
import AddcategoryModal from "./AddcategoryModal";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../../redux/features/categoryApi";
import { imageUrl } from "../../../redux/base/baseAPI";
import ConfirmModel from "../../UI/ConfirmModel";
import toast from "react-hot-toast";

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const {data: categoryData, refetch} = useGetCategoriesQuery(undefined);
  const [deleteCategory] = useDeleteCategoryMutation();

   const pageSize = categoryData?.pagination?.limit ?? 10;

  const columns = [
    {
      title: "SL No",
      dataIndex: "slNo",
      key: "slNo",
      render: (_ :any, __ :any, index :any) => index + 1,
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (_:any, record:any)=> 
      <div className="flex items-center gap-3">
        <Image src={`${imageUrl}${record?.image}`} width={70} height={70} alt="Logo" className="rounded-full" />

        <span className="font-bold">{record?.title}</span>
      </div>,
      width: "85%"
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              size={20}
              style={{ color: "orange", cursor: "pointer" }}
              onClick={() => {
                setSelectedCategory(record);
                setOpen(true)
                console.log("Edit category:", record);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              size={20}
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => {setSelectedCategory(record); setOpenConfirm(true)}}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];


    // --------------- Action --------------
  const handleDeleteCategory = async () => {    
    try {
      const res = await deleteCategory((selectedCategory as any)?._id);
      
      if (res?.data) {
        toast.success("Delete FAQ Successfully");
        setOpenConfirm(false);
        setSelectedCategory(null)
        refetch();
      }
    } catch (error) {
      console.log("toast error", error),
       toast.error("Some thing wrong")
      }
  };



  return (
    <div className="bg-white rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-primary font-semibold">Category Management</h1>
        <Button onClick={()=>setOpen(true)} type="primary" size="large">Add Category</Button>
      </div>

      <Table
        dataSource={categoryData?.data}
        columns={columns}
        bordered
        pagination={{
          pageSize,
          total: categoryData?.pagination?.total,
          current: currentPage,
          onChange: (page)=>setCurrentPage(page)
        }}
      />

      <AddcategoryModal  
      open={open}   
      setOpen={setOpen}           
      editData={selectedCategory}   
      setSelectedCategory={setSelectedCategory}
      refetch={refetch}   
      />

      <ConfirmModel
        open={openConfirm}
        title="Delete Category?"
        content={`Are you sure you want to delete "${(selectedCategory as any)?.title} category"?`}
        okText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteCategory}
        onCancel={() => {
          setOpenConfirm(false);
          setSelectedCategory(null);
        }}
      />

    </div>
  );
};

export default Categories;
