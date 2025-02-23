import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.paper",
    border: "1px solid ",
    boxShadow: 24,
    borderRadius: "5px",
    p: 4,
};

const Booking = () => {
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const today = new Date();

    console.log(selectedDates);

    const handleSelect = (dates) => {
        setSelectedDates(dates || []);
    };

    const handleOpenModal1 = () => setOpenModal1(true);
    const handleCloseModal1 = () => setOpenModal1(false);

    const handleOpenModal2 = () => setOpenModal2(true);
    const handleCloseModal2 = () => setOpenModal2(false);

    return (
        <>
            <div className="rounded-xl mt-20 min-h-[500px] shadow-md shadow-black">
                <div className="px-5 py-5">
                    <h1 className="font-semibold">From 999 INR/person</h1>
                    <div className="flex gap-2 mt-5">
                        <button
                            onClick={handleOpenModal1}
                            className="w-[50%] border py-4 rounded-md"
                        >
                            Select Date <i className="fa-solid fa-angles-down"></i>
                        </button>
                        <button
                            onClick={handleOpenModal2}
                            className="w-[50%] border py-4 rounded-md"
                        >
                            Select guests <i className="fa-solid fa-angles-down"></i>
                        </button>
                    </div>

                    <div className="flex justify-between items-center mt-10 pb-10 border-b border-black">
                        <div>
                            <h3>Sun, 23 Feb</h3>
                            <h4>999 Inr</h4>
                        </div>
                        <div>
                            <button className="py-2 px-6 bg-blue-500 rounded-xl text-white hover:bg-blue-600">Book</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-10 pb-10 border-b border-black">
                        <div>
                            <h3>Sun, 23 Feb</h3>
                            <h4>999 Inr</h4>
                        </div>
                        <div>
                            <button className="py-2 px-6 bg-blue-500 rounded-xl text-white hover:bg-blue-600">Book</button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-10 pb-10 border-b border-black">
                        <div>
                            <h3>Sun, 23 Feb</h3>
                            <h4>999 Inr</h4>
                        </div>
                        <div>
                            <button className="py-2 px-6 bg-blue-500 rounded-xl text-white hover:bg-blue-600">Book</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal-1 */}
            <Modal open={openModal1} onClose={handleCloseModal1}>
                <Box sx={style}>
                    <Typography variant="h6">Add Dates</Typography>
                    {/* FIX: Use a div instead of wrapping in Typography */}
                    <div className="text-center p-5">
                        <DayPicker
                            mode="multiple"
                            selected={selectedDates}
                            onSelect={handleSelect}
                            disabled={{ before: today }}
                            modifiersClassNames={{
                                selected: "bg-black text-white rounded-full",
                                disabled:
                                    "text-gray-400 line-through pointer-events-none opacity-50",
                            }}
                        />
                    </div>
                    <Button onClick={handleCloseModal1} sx={{ mt: 2 }} variant="outlined">
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* Modal-2 */}
            <Modal open={openModal2} onClose={handleCloseModal2}>
                <Box sx={style}>
                    <Typography variant="h6" className="text-center">Number of Guestes</Typography>
                    <Typography component="div">
                        <div className="flex justify-between items-center my-8">
                            <div>
                                <h3>Adults</h3>
                                <p>Age 18+</p>
                            </div>
                            <div className="flex justify-between items-center ">
                                <button className="px-4 py-2 rounded-full border-black bg-gray-200 hover:bg-gray-100 ">-</button>
                                <p className="mx-5">1</p>
                                <button className="px-4 py-2 rounded-full border-black bg-gray-200  hover:bg-gray-100" >+</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3>Childrens</h3>
                                <p>Age 4+</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="px-4 py-2 rounded-full border-black bg-gray-200  hover:bg-gray-100">-</button>
                                <p className="mx-5">0</p>
                                <button className="px-4 py-2 rounded-full border-black bg-gray-200  hover:bg-gray-100" >+</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3>Infants</h3>
                                <p>Under 4</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <button className="px-4 py-2 rounded-full border-black bg-gray-200  hover:bg-gray-100">-</button>
                                <p className="mx-5">0</p>
                                <button className="px-4 py-2 rounded-full border-black bg-gray-200  hover:bg-gray-100" >+</button>
                            </div>
                        </div>
                    </Typography>
                    <Button onClick={handleCloseModal2} sx={{ mt: 2 }} variant="outlined">
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Booking;
