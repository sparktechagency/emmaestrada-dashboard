import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { getSearchParams } from "../../../utils/getSearchParams";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import HostDetails from "./HostDetails";
import HostsList from "./HostsList";




const HostsManage = () => {
    const [open, setOpen] = useState(false);    
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
        <h1 className="text-3xl text-primary font-semibold">Host List</h1>
        <div className="flex gap-5">
          {/* <Button            
            variant="contained"
            startIcon={<AddOutlinedIcon fontSize="medium" />}
            sx={{ background: "var(--color-black)" }}
          >
            Add More
          </Button> */}

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

     {!open ?  <div className="bg-white h-full shadow">
        <HostsList  open={open} setOpen={setOpen}/>
      </div> 
      :
      <div className="">
        <HostDetails />
      </div>}      
    </div>
  );
};

export default HostsManage;