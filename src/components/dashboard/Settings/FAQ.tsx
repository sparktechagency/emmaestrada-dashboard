import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import SharedModal from "../../shared/SharedModal";
import SharedInput from "../../shared/SharedInput";

const FAQ = () => {
  const [open, setOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<any>(null);

  // ------------------ Demo FAQ List ------------------
  const [faqList, setFaqList] = useState([
    {
      id: 1,
      question: "What is your return policy?",
      answer: "You can return items within 7 days.",
    },
    {
      id: 2,
      question: "How do I track my order?",
      answer: "Go to orders page and enter your tracking ID.",
    },
    {
      id: 3,
      question: "Do you offer international shipping?",
      answer: "Yes, shipping charges will apply.",
    },
    {
      id: 4,
      question: "How do I reset my password?",
      answer: "Use the forgot password option on login page.",
    },
    {
      id: 5,
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, cancellations can be done anytime.",
    },
  ]);

  const handleEdit = (faq: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFAQ(faq);
    setOpen(true);
  };

  const handleDelete = (faqId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFaqList(faqList.filter((f) => f.id !== faqId));
  };

  return (
    <Box sx={{ maxWidth: 1000 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          onClick={() => {
            setSelectedFAQ(null);
            setOpen(true);
          }}
          variant="contained"
          size="large"
        >
          Add FAQ
        </Button>
      </Box>

      {/* ------------------ FAQ Accordion List ------------------ */}
      {faqList.map((faq) => (
        <Accordion key={faq.id} defaultExpanded sx={{ mb: 2, background: 'var(--color-cardBg)', }}>
          <AccordionSummary
            expandIcon={<FaArrowDown />}
            aria-controls={`panel-${faq.id}`}
            id={`panel-${faq.id}-header`}
          >
            <div className="flex items-center justify-between w-full pr-5">
              <Typography component="span" sx={{ fontWeight: 600, color: "white" }}>
                {faq.question}
              </Typography>

              <div className="flex items-center gap-2">
                <button onClick={(e) => handleEdit(faq, e)}>
                  <FiEdit className="cursor-pointer" color="blue" size={20} />
                </button>

                <button onClick={(e) => handleDelete(faq.id, e)}>
                  <RiDeleteBinLine
                    className="cursor-pointer"
                    color="#ff0000"
                    size={20}
                  />
                </button>
              </div>
            </div>
          </AccordionSummary>

          <AccordionDetails className="text-slate-700 font-semibold">{faq.answer}</AccordionDetails>
        </Accordion>
      ))}

      {/* ------------------ Modal ------------------ */}
      {open && (
        <SharedModal
          width={700}
          title={selectedFAQ ? "Edit FAQ" : "Add FAQ"}
          open={open}
          handleClose={() => setOpen(false)}
        >
          <FAQForm faq={selectedFAQ} setOpen={setOpen}/>
        </SharedModal>
      )}
    </Box>
  );
};

export default FAQ;

// ------------------ FAQ FORM ------------------
const FAQForm = ({ faq, setOpen }: any) => {

   const [values, setValues] = useState({
    question: "",
    answer: "",    
  });

  useEffect(() => {
    if (faq) {
      setValues({
        question: faq.question,
        answer: faq.answer,
      });
    }
  }, [faq]);

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();    
    console.log("Form submitted:", values);
    setOpen(false)
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Grid container spacing={4}>

            <SharedInput
            label="Question"
            placeholder="Question"
            value={values.question}
            onChange={(e: any) => handleChange("question", e.target.value)}
          />
          
            <SharedInput
            label="Answer"
            placeholder="Answer"
            value={values.question}
            onChange={(e: any) => handleChange("question", e.target.value)}
          />
        </Grid>
        <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 3, width: '100%', display: 'block' }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};
