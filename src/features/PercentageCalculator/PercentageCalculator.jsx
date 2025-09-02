import React, { useState } from 'react';

const PercentageCalculator = () => {
    const [num, setNum] = useState('');
    const [percent, setPercent] = useState('');
    const [result, setResult] = useState('');

    const calculate = () => {
        const numValue = parseFloat(num);
        const percentValue = parseFloat(percent);

        if (!isNaN(numValue) && !isNaN(percentValue)) {
            const calculation = (percentValue / 100) * numValue;
            setResult(`${percentValue}% of ${numValue} is ${calculation}`);
        } else {
            setResult('Invalid Input');
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg flex flex-col gap-4">
            <h2 className="text-center font-bold text-lg text-gray-700">Percentage Calculator</h2>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                    placeholder="Enter %"
                    className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                />
                <span className="font-bold text-gray-600">of</span>
                <input
                    type="number"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="Enter number"
                    className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <button
                onClick={calculate}
                className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
                Calculate
            </button>
            {result && (
                <div className="text-center mt-2 p-3 bg-green-100 text-green-800 font-semibold rounded-lg">
                    {result}
                </div>
            )}
        </div>
    );
};

export default PercentageCalculator;