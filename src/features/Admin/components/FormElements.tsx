import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const AdminInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-1">
                    {label}
                </label>
                <input
                    ref={ref}
                    className={`w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${error ? 'border-red-500' : ''
                        } ${className}`}
                    {...props}
                />
                {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
            </div>
        );
    }
);

AdminInput.displayName = 'AdminInput';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export const AdminTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-1">
                    {label}
                </label>
                <textarea
                    ref={ref}
                    className={`w-full bg-bg-secondary border border-glass-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-accent-primary transition-colors min-h-[100px] resize-y ${error ? 'border-red-500' : ''
                        } ${className}`}
                    {...props}
                />
                {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
            </div>
        );
    }
);

AdminTextarea.displayName = 'AdminTextarea';
