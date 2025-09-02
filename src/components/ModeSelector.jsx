import React from 'react';
import { MODES } from '../constants/modes';

const ModeSelector = ({ currentMode, setMode }) => (
    <div className="flex justify-center p-2 mb-3 bg-gray-200 rounded-lg shadow-inner">
        <select
            value={currentMode}
            onChange={(e) => setMode(e.target.value)}
            className="p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-purple-500"
        >
            {Object.values(MODES).map(mode => (
                <option key={mode} value={mode}>{mode}</option>
            ))}
        </select>
    </div>
);

export default ModeSelector;