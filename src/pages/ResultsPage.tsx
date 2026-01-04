import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Tag, Hash, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { api, type AnalysisResult } from '../services/api';

export function ResultsPage() {
    const { fileId } = useParams<{ fileId: string }>();
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!fileId) return;

        const fetchResult = async () => {
            try {
                const data = await api.getResult(fileId);
                setResult(data);
            } catch (err) {
                setError('Failed to load results. They might not be ready yet.');
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [fileId]);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading results...</p>
                </div>
            </div>
        );
    }

    if (error || !result) {
        return (
            <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Oops!</h2>
                <p className="mb-8 text-slate-600">{error || 'Something went wrong.'}</p>
                <Link to="/upload">
                    <Button>Try Again</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/upload">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> Upload New
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Analysis Results</h1>
                </div>
                <Badge variant="outline" className="font-mono">ID: {fileId}</Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Summary Card */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center gap-2 border-b border-slate-100 bg-slate-50/50 pb-4">
                        <FileText className="h-5 w-5 text-primary-600" />
                        <CardTitle className="text-lg">Document Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p className="leading-relaxed text-slate-700">{result.summary}</p>
                    </CardContent>
                </Card>

                {/* Entities Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2 border-b border-slate-100 bg-slate-50/50 pb-4">
                        <Tag className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-lg">Detected Entities</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap gap-2">
                            {result.entities.map((entity, i) => (
                                <Badge key={i} variant="secondary" className="px-3 py-1 text-sm">
                                    {entity}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Key Phrases Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2 border-b border-slate-100 bg-slate-50/50 pb-4">
                        <Hash className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-lg">Key Phrases</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap gap-2">
                            {result.keyPhrases.map((phrase, i) => (
                                <span
                                    key={i}
                                    className="rounded-md bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 border border-purple-100"
                                >
                                    {phrase}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
