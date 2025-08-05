import React from "react";
import { ChefHat } from "lucide-react";

const Footer = () => {
    return (
        <footer className="text-gray-500 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <ChefHat className="w-6 h-6" />
                        <span className="text-xl font-bold">iLuto - AI Powered Recipe Finder</span>
                    </div>
                    <p className="text-gray-400">Powered by Groq AI • Making cooking easier, one recipe at a time</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 
