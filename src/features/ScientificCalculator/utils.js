// Helper for factorial calculation
export const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
};

// Helper function to prepare the input string for evaluation
export const replaceMathFunctions = (expression, isDegrees) => {
    return expression
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
};