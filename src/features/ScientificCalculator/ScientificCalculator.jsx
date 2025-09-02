import React, { useState, useEffect, useCallback } from "react";
import { factorial, replaceMathFunctions } from './utils'; // <-- IMPORT HELPERS
import Display from '../../components/Display'; // <-- IMPORT DISPLAY

// Button layouts (can also be moved to a constants file)
const mainButtons = [
    ["C", "(", ")", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
];
const scientificButtons = [
    "sin", "cos", "tan", "asin", "acos", "atan", "log", "log10", "sqrt", "^",
    "exp", "abs", "PI", "E", "floor", "ceil", "round", "!", "Mod", "Deg/Rad"
];

function ScientificCalculator() { // <-- RENAMED
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [isDegrees, setIsDegrees] = useState(false);

    // The rest of your state and logic remains largely the same...
    const mathScope = {
        Math,
        factorial,
        degToRad: (degrees) => degrees * (Math.PI / 180),
        radToDeg: (radians) => radians * (180 / Math.PI)
    };

    const handleClick = useCallback((value) => {
        if (value === "C") {
            setInput("");
            setResult("");
        } else if (value === "Deg/Rad") {
            setIsDegrees(prev => !prev);
        } else if (value === "=") {
            try {
                let expression = replaceMathFunctions(input, isDegrees);
                const functionBody = `with (this) { return ${expression}; }`;
                const calculate = new Function(functionBody);
                const evalResult = calculate.call(mathScope);
                setResult(evalResult);
            } catch (error) {
                setResult("Error");
            }
        } else if (["sin", "cos", "tan", "log", "log10", "sqrt", "asin", "acos", "atan", "exp", "abs", "floor", "ceil", "round"].includes(value)) {
            setInput((prev) => prev + value + "(");
        } else {
            setInput((prev) => prev + value);
        }
    }, [input, isDegrees]);

    // Keyboard handling useEffect remains the same...
    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;
            if (key === 'Enter') { handleClick('='); }
            // ... (keep the rest of your key handler logic)
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleClick]);

    return (
        <div className="flex flex-col"> {/* <-- Main wrapper */}
            <div className="flex justify-end items-center mb-2">
                <span className="text-xs font-semibold text-gray-700">
                    Mode: <span className="font-extrabold text-blue-700">{isDegrees ? "DEG" : "RAD"}</span>
                </span>
            </div>

            <Display input={input} result={result} /> {/* <-- USE THE DISPLAY COMPONENT */}

            <div className="grid grid-cols-5 gap-1 mb-1.5">
                {scientificButtons.map((btn) => (
                    <button
                        key={btn}
                        className={`p-1.5 text-xs rounded-md border-2 bg-gradient-to-br from-teal-400 to-teal-600 text-white font-semibold hover:from-teal-500 hover:to-teal-700 active:from-teal-600 active:to-teal-800 transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-300 ${btn === "Deg/Rad" ? "bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700" : ""}`}
                        onClick={() => handleClick(btn)}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-4 gap-1">
                {mainButtons.flat().map((btn) => (
                    <button
                        key={btn}
                        className={`p-2 text-lg font-bold rounded-md shadow-sm transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 ${["C"].includes(btn) ? "bg-red-500 text-white col-span-1 hover:bg-red-600 focus:ring-red-300" : ["/", "*", "-", "+"].includes(btn) ? "bg-blue-600 text-white col-span-1 hover:bg-blue-700 focus:ring-blue-300" : btn === "=" ? "bg-indigo-600 text-white col-span-2 hover:bg-indigo-700 focus:ring-indigo-300" : btn === "0" ? "bg-gray-100 text-gray-800 col-span-2 hover:bg-gray-200 focus:ring-gray-300" : "bg-gray-100 text-gray-800 col-span-1 hover:bg-gray-200 focus:ring-gray-300"}`}
                        onClick={() => handleClick(btn)}
                    >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ScientificCalculator;