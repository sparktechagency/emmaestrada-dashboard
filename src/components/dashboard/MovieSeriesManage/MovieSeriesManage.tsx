import { ArrowLeftOutlined } from "@ant-design/icons";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "sonner";
import ConfirmModal from "../../UI/ConfirmModel";
import AddContent from "./AddContent";
import MovieSeriesTable from "./MovieSeriesTable";


const MovieSeriesManage = () => {
  const [searchText, setSearchText] = useState("");
  const [openDetails, setOpenDetails] = useState(false);
  const [openAddForm, setOpenAddModal] = useState(false)
  const [selectedContent, setSelectedContent] = useState(null)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchText(search);
  };


    const handleDeleteAdmin = async () => {      
      try {
        // const res = await deleteUser(selectedUser._id).unwrap();
  
        // console.log("delete", res);
        toast.success("Admin deleted successfully");
        // refetch();
        setSelectedContent(null);
        setOpenConfirmModal(false);
      } catch (error: any) {
        console.log("delete error", error);
        toast.error(error?.data?.message || "Failed to delete admin");
      }
    };

  return (
    <div>
      {/* Header */}
      {openAddForm ? <p
        onClick={() => setOpenAddModal(false)}
        className="mb-5 cursor-pointer text-slate-300 flex items-center gap-2"
      >
        <ArrowLeftOutlined /> Back
      </p> :
        <div className="">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-3xl text-primary font-semibold">Content Library</h1>


            <div className="flex gap-5">             
              <Button
                onClick={() => setOpenAddModal(true)}
                variant="contained"
                startIcon={<AddOutlinedIcon fontSize="medium" />}
                sx={{ background: "#CF9702" }}
              >
                Add New Content
              </Button>


              <TextField
                placeholder="Search movies and series..."
                value={searchText}
                onChange={handleSearch}
                style={{ width: "300px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch color="var(--color-black-200)" />
                    </InputAdornment>
                  ),
                  style: {
                    borderRadius: "14px",
                    border: "1px solid var(--color-black-200)",
                    color: "var(--color-textColor)",
                  },
                }}
              />
            </div>
          </div>
          <div className="shadow">
            <MovieSeriesTable search={searchText} setOpenConfirmModal={setOpenConfirmModal} setSelectedContent={setSelectedContent} setOpenDetails={setOpenDetails} />
          </div>
        </div>

      }


      {/* Table Section */}
      {/* {!openDetails ? (
        <div className="shadow">
          <MovieSeriesTable search={searchText} setOpenDetails={setOpenDetails} />
        </div>
      ) : (
        <div className="text-white">Movie/Series details page…</div>
      )} */}

     <ConfirmModal
            open={openConfirmModal}
            title={`Delete ${selectedContent?.contentType}"`}
            content={`Are you sure you want to delete "${selectedContent?.title}" ${selectedContent?.contentType}?`}
            okText="Yes, Delete"
            cancelText="Cancel"
            onConfirm={handleDeleteAdmin}
            onCancel={() => {
              setOpenConfirmModal(false);
              setSelectedContent(null);
            }}
          />
      {/* <AddContent /> */}
      {openAddForm && <AddContent />}
      {/* {openAddForm && <AddNewContentApp />} */}
    </div>
  );
};

export default MovieSeriesManage;
