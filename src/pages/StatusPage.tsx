import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { api, type ProcessingStatus } from '../services/api';

export function StatusPage() {
    const { fileId } = useParams<{ fileId: string }>();
    const navigate = useNavigate();
    const [status, setStatus] = useState<ProcessingStatus['status']>('UPLOADED');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!fileId) return;

        const pollStatus = async () => {
            try {
                const data = await api.getStatus(fileId);
                setStatus(data.status);

                if (data.status === 'COMPLETED') {
                    navigate(`/result/${fileId}`);
                } else if (data.status === 'FAILED') {
                    setError('Processing failed. Please try again.');
                }
            } catch (err) {
                setError('Failed to fetch status.');
            }
        };

        // Poll every 2 seconds
        const interval = setInterval(pollStatus, 2000);

        // Initial check
        pollStatus();

        return () => clearInterval(interval);
    }, [fileId, navigate]);

    const getStatusIcon = () => {
        switch (status) {
            case 'UPLOADED':
            case 'PROCESSING':
                return <Loader2 className="h-12 w-12 animate-spin text-primary-600" />;
            case 'COMPLETED':
                return <CheckCircle className="h-12 w-12 text-green-500" />;
            case 'FAILED':
                return <XCircle className="h-12 w-12 text-red-500" />;
            default:
                // Fallback to loading state for unknown statuses to prevent jarring transitions
                return <Loader2 className="h-12 w-12 animate-spin text-primary-600" />;
        }
    };

    const getStatusMessage = () => {
        switch (status) {
            case 'UPLOADED':
                return 'Initiating AI analysis...';
            case 'PROCESSING':
                return 'Extracting insights...';
            case 'COMPLETED':
                return 'Processing complete! Redirecting...';
            case 'FAILED':
                return 'Processing failed.';
            default:
                return 'Processing...';
        }
    };

    return (
        <div className="container mx-auto flex max-w-lg flex-col items-center px-4 py-20">
            <Card className="w-full text-center">
                <CardHeader>
                    <CardTitle>Processing Status</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6 py-8">
                    <div className="rounded-full bg-slate-50 p-6">
                        {getStatusIcon()}
                    </div>

                    <div className="space-y-2 animate-in fade-in duration-500">
                        <h3 className="text-xl font-semibold text-slate-900">
                            {getStatusMessage()}
                        </h3>
                        <p className="text-sm text-slate-500">
                            File ID: <span className="font-mono">{fileId}</span>
                        </p>
                    </div>

                    <Badge
                        variant={
                            status === 'COMPLETED' ? 'success' :
                                status === 'FAILED' ? 'destructive' :
                                    'default'
                        }
                        className="text-sm px-3 py-1"
                    >
                        {status}
                    </Badge>

                    {error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
