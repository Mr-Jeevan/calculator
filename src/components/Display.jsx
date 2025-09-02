import React from 'react';

const Display = ({ input, result }) => (
  <div className="min-h-[3.5rem] text-2xl mb-2 bg-gray-800 border-2 border-gray-700 rounded-md p-1.5 text-right overflow-x-auto shadow-inner-lg font-mono break-words flex flex-col justify-end text-white">
    <div className="text-sm text-gray-400 min-h-4">{input}</div>
    <div className="font-bold text-green-400">
      {result !== "" ? `= ${result}` : ""}
    </div>
  </div>
);

export default Display;