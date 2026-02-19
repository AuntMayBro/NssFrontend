
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-nss-navy p-6 text-center">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg border border-red-100">
                        <h1 className="text-3xl font-bold text-nss-red mb-4">Something went wrong</h1>
                        <p className="text-gray-600 mb-6">We're sorry, but the application encountered an unexpected error.</p>

                        {this.state.error && (
                            <div className="bg-gray-100 p-4 rounded text-left overflow-auto max-h-40 text-sm font-mono text-red-600 mb-6">
                                {this.state.error.toString()}
                            </div>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-nss-navy text-white rounded-lg hover:bg-nss-navy-light transition-colors font-medium"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
