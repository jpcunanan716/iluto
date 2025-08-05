import React from "react";
import { X } from "lucide-react";

const IngredientTag = ({ ingredient, onRemove }) => (
    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
        {ingredient}
        <button onClick={onRemove} className="text-blue-600 hover:text-blue-800">
            <X className="w-3 h-3" />
        </button>
    </span>
);

export default IngredientTag;