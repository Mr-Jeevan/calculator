import React, { useState, useEffect, useCallback } from "react";

// Standard calculator buttons
const mainButtons = [
    ["C", "(", ")", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
];

// Scientific calculator buttons (flattened for grid layout)
// We've already flattened this in the previous iteration, now it's explicit for clarity
const scientificButtons = [
    "sin", "cos", "tan", "asin", "acos",
    "atan", "log", "log10", "sqrt", "^",
    "exp", "abs", "PI", "E", "floor",
    "ceil", "round", "!", "Mod", "Deg/Rad"
];

// Helper for factorial calculation
const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
};

// Helper function to prepare the input string for evaluation
const replaceMathFunctions = (expression, isDegrees) => {
    let processed = expression
        .replace(/sin\(/g, isDegrees ? "Math.sin(degToRad(" : "Math.sin(")
        .replace(/cos\(/g, isDegrees ? "Math.cos(degToRad(" : "Math.cos(")
        .replace(/tan\(/g, isDegrees ? "Math.tan(degToRad(" : "Math.tan(")
        .replace(/asin\(/g, isDegrees ? "radToDeg(Math.asin(" : "Math.asin(")
        .replace(/acos\(/g, isDegrees ? "radToDeg(Math.acos(" : "Math.acos(")
        .replace(/atan\(/g, isDegrees ? "radToDeg(Math.atan(" : "Math.atan(")
        .replace(/log\(/g, "Math.log(")
        .replace(/log10\(/g, "Math.log10(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/exp\(/g, "Math.exp(")
        .replace(/abs\(/g, "Math.abs(")
        .replace(/floor\(/g, "Math.floor(")
        .replace(/ceil\(/g, "Math.ceil(")
        .replace(/round\(/g, "Math.round(")
        .replace(/Mod/g, "%")
        .replace(/PI/g, "Math.PI")
        .replace(/E/g, "Math.E")
        .replace(/(\d+)!/g, "factorial($1)")
        .replace(/\^/g, "**");

    return processed;
};

function Calci() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [showScientific, setShowScientific] = useState(false);
    const [isDegrees, setIsDegrees] = useState(false);

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
                let expression = input;
                expression = replaceMathFunctions(expression, isDegrees);

                const functionBody = `
                    with (this) {
                        return ${expression};
                    }
                `;

                // eslint-disable-next-line no-new-func
                const calculate = new Function(functionBody);
                const evalResult = calculate.call(mathScope);

                setResult(evalResult);
            } catch (error) {
                setResult("Error");
                console.error("Calculation error:", error);
            }
        } else if (["sin", "cos", "tan", "log", "log10", "sqrt", "asin", "acos", "atan", "exp", "abs", "floor", "ceil", "round"].includes(value)) {
            setInput((prev) => prev + value + "(");
            setResult("");
        } else if (value === "PI" || value === "E") {
            setInput((prev) => prev + value);
            setResult("");
        } else {
            setInput((prev) => prev + value);
            setResult("");
        }
    }, [input, isDegrees]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;

            const keyMap = {
                '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
                '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
                '+': '+', '-': '-', '*': '*', '/': '/',
                '.': '.', '(': '(', ')': ')',
                '=': '=', 'Enter': '=',
                'Backspace': 'backspace',
                'Escape': 'clear',
                '^': '^',
                '%': 'Mod'
            };

            const mappedValue = keyMap[key];

            if (mappedValue) {
                event.preventDefault();

                if (mappedValue === 'backspace') {
                    setInput((prev) => prev.slice(0, -1));
                    setResult("");
                } else if (mappedValue === 'clear') {
                    handleClick("C");
                } else {
                    handleClick(mappedValue);
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleClick]);

    return (
        <div className="
            max-w-xs mx-auto my-3 p-3 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg font-sans
            flex flex-col overflow-hidden
        ">
            <h1 className="text-xl font-extrabold mb-2 text-center text-gray-900 drop-shadow-sm tracking-tight">
                Pro Calc
            </h1>

            <div className="flex justify-between items-center mb-2">
                <button
                    className="
                        px-2 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white
                        rounded-full font-bold text-xs shadow-sm hover:from-purple-700 hover:to-indigo-700
                        transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300
                    "
                    onClick={() => setShowScientific((prev) => !prev)}
                >
                    {showScientific ? "Hide Sci" : "Show Sci"} {/* Shortened text */}
                </button>
                {showScientific && (
                    <span className="text-xs font-semibold text-gray-700">
                        Mode: <span className="font-extrabold text-blue-700">{isDegrees ? "DEG" : "RAD"}</span>
                    </span>
                )}
            </div>

            <div className="
                min-h-[3.5rem] text-2xl mb-2 bg-gray-800 border-2 border-gray-700 rounded-md p-1.5 text-right
                overflow-x-auto shadow-inner-lg font-mono break-words flex flex-col justify-end text-white
            ">
                <div className="text-sm text-gray-400 min-h-4">{input}</div>
                <div className="font-bold text-green-400">{result !== "" ? `= ${result}` : ""}</div>
            </div>

            {/* Scientific Buttons Grid (appears only when showScientific is true) */}
            {showScientific && (
                <div className="grid grid-cols-5 gap-1 mb-1.5"> {/* 5 columns for landscape feel */}
                    {scientificButtons.map((btn) => (
                        <button
                            key={btn}
                            className={`
                                p-1.5 text-xs rounded-md border-2
                                bg-gradient-to-br from-teal-400 to-teal-600 text-white font-semibold
                                hover:from-teal-500 hover:to-teal-700 active:from-teal-600 active:to-teal-800
                                transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-300
                                ${btn === "Deg/Rad" ? "bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700" : ""}
                            `}
                            onClick={() => handleClick(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            )}

            {/* Main Numpad Grid */}
            <div className="grid grid-cols-4 gap-1"> {/* Standard 4 columns for numbers */}
                {mainButtons.flat().map((btn) => (
                    <button
                        key={btn}
                        className={`
                            p-2 text-lg font-bold rounded-md shadow-sm
                            transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2
                            ${["C"].includes(btn)
                                ? "bg-red-500 text-white col-span-1 hover:bg-red-600 active:bg-red-700 focus:ring-red-300"
                                : ["/", "*", "-", "+"].includes(btn)
                                ? "bg-blue-600 text-white col-span-1 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-300"
                                : btn === "="
                                ? "bg-indigo-600 text-white col-span-2 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-300"
                                : btn === "0"
                                ? "bg-gray-100 text-gray-800 col-span-2 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-300"
                                : "bg-gray-100 text-gray-800 col-span-1 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-300"
                            }
                        `}
                        onClick={() => handleClick(btn)}
                    >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Calci;