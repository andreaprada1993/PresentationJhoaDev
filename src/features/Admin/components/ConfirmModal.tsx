import { AlertCircle, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-bg-primary border border-glass-border w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
                <div className="flex justify-between items-center p-5 border-b border-glass-border bg-bg-secondary/50">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="text-red-400" size={20} />
                        <h2 className="text-lg font-heading font-semibold text-text-primary">
                            {title}
                        </h2>
                    </div>
                    <button onClick={onCancel} className="text-text-secondary hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                        <X size={18} />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-text-secondary text-[0.95rem]">{message}</p>
                    <div className="pt-6 flex justify-end gap-3 mt-2">
                        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg font-medium text-text-secondary hover:bg-white/5 hover:text-white transition-colors">
                            Cancelar
                        </button>
                        <button type="button" onClick={onConfirm} className="btn bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2 py-2">
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
