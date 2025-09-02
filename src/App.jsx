import React, { useState } from 'react';
import './App.css'; // Keep your main styles
import { MODES } from './constants/modes';

// Import the components for each mode
import ScientificCalculator from './features/ScientificCalculator/ScientificCalculator.jsx';
import PercentageCalculator from './features/PercentageCalculator/PercentageCalculator.jsx';
import AlgebraSolver from './features/AlgebraSolver/AlgebraSolver.jsx';
import ModeSelector from './components/ModeSelector.jsx';

function App() {
    const [mode, setMode] = useState(MODES.SCIENTIFIC);

    const renderCalculatorMode = () => {
        switch (mode) {
            case MODES.SCIENTIFIC:
                return <ScientificCalculator />;
            case MODES.PERCENTAGE:
                return <PercentageCalculator />;
            case MODES.ALGEBRA:
                return <AlgebraSolver />;
            // You can add more modes like 'Simple Interest' here later
            default:
                return <ScientificCalculator />;
        }
    };

    return (
        <div className="max-w-xs mx-auto my-3 p-3 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg font-sans">
            <h1 className="text-xl font-extrabold mb-2 text-center text-gray-900 drop-shadow-sm tracking-tight">
                Pro Calc 🚀
            </h1>
            <ModeSelector currentMode={mode} setMode={setMode} />
            <div className="mt-4">
                {renderCalculatorMode()}
            </div>
        </div>
    );
}

export default App;