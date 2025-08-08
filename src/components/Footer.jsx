import React from "react";
import { ChefHat, Github, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="text-gray-500 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <ChefHat className="w-6 h-6" />
                        <span className="text-xl font-bold">iLuto - AI Powered Recipe Generator</span>
                    </div>
                    <p className="text-gray-400 mb-4">Powered by Groq AI • Making cooking easier, one recipe at a time</p>

                    <div className="flex items-center justify-center gap-4">
                        <span className="text-gray-400">Made by: JP Cunanan</span>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/jpcunanan716/iluto "
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                                aria-label="GitHub Profile"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/jp-cunanan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;