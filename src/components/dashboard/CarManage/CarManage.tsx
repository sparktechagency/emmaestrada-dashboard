import { ArrowLeftOutlined } from "@ant-design/icons";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import SharedModal from "../../shared/SharedModal";
import CarAddForm from "./CarAddForm";
import CarDetails from "./CarDetails";
import CartList from "./CartList";

const CarManage = () => {
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
  const [searchText, setSearchText] = useState("");

  const updateSearchParams = useUpdateSearchParams();
  const {searchTerm} = getSearchParams();
  
  
  useEffect(()=>{
setSearchText(searchTerm)
  },[searchTerm]);

  const handleSearch = (e: any) => {
    const search = e.target.value;
    setSearchText(search);
    updateSearchParams({searchTerm: search})
  };

  return (
    <div>
      {open ? <p onClick={()=>setOpen(false)} className="mb-5 cursor-pointer text-slate-300"><ArrowLeftOutlined size={20}/> Back</p> :
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl text-primary font-semibold">Property List</h1>
        <div className="flex gap-5">
          <Button
            onClick={()=>setOpenForm(true)}
            variant="contained"
            startIcon={<AddOutlinedIcon fontSize="medium" />}
            sx={{ background: "var(--color-cardBg)" }}
          >
            Add More
          </Button>

          <TextField
            placeholder="Search by name, email or service..."
            value={searchText}
            onChange={handleSearch}
            style={{ width: "325px", }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch color="var(--color-black-200)"/>
                </InputAdornment>
              ),
              style: {
                borderRadius: "16px",
                border: "1px solid var(--color-black-200)",
                color: 'var(--color-textColor)',
                //   @ts-ignore
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                },
              },
            }}
          />
        </div>
      </div>}

     {!open ?  <div className=" h-full shadow">
        <CartList  open={open} setOpen={setOpen}/>
      </div> 
      :
      <div className="">
        <CarDetails items={itemData}/>
      </div>}
      <SharedModal width={700} height={1000} title="Add Car" open={openForm} handleClose={()=>setOpenForm(!openForm)}>
        <CarAddForm />
      </SharedModal>
    </div>
  );
};

export default CarManage;

export const itemData = [
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    title: "Bike",
    author: "@southside_customs",
  },
];