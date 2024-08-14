import React from "react";

const DisplayImage = ({ imgurl, onClose }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-85 ">
      <div className="flex justify-center items-center p-4 ">
        <img src={imgurl} alt="" className="max-w-[80vw] max-h-[80vh]" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-lg font-bold h-10 w-40 rounded-full bg-red-500 hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DisplayImage;
