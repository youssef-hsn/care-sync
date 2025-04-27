import React, { ReactNode } from "react";

interface CenterDisplayProps {
    children: ReactNode;
}

const CenterDisplay: React.FC<CenterDisplayProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            {children}
        </div>
    );
};

export default CenterDisplay;