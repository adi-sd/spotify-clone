import React from "react";

interface TemplateProps {
    children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default Template;
