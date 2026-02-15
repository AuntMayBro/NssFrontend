
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className, id, ...props }) => {
    return (
        <section
            id={id}
            className={cn("section-padding relative overflow-hidden", className)}
            {...props}
        >
            <div className="container mx-auto container-padding">
                {children}
            </div>
        </section>
    );
};

export default Section;
