
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LandingPage() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full bg-gradient-to-b from-white to-slate-50 py-20 text-center lg:py-32">
                <div className="container mx-auto px-4">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Upload documents. <br className="hidden sm:block" />
                        <span className="text-primary-600">Extract insights.</span> Powered by AI.
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
                        SmartDoc AI automatically processes your PDFs and images to extract key information, summaries, and entities in seconds.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/upload">
                            <Button size="lg" className="gap-2">
                                Upload Document <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg">
                            View Demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full py-20">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-primary-100 p-4 text-primary-600">
                                <Zap className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-slate-900">Lightning Fast</h3>
                            <p className="text-slate-600">
                                Get results in seconds. Our advanced AI pipeline processes documents in real-time.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-primary-100 p-4 text-primary-600">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-slate-900">Accurate Extraction</h3>
                            <p className="text-slate-600">
                                State-of-the-art OCR and NLP models ensure high accuracy for text and entity extraction.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-primary-100 p-4 text-primary-600">
                                <Shield className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-slate-900">Secure & Private</h3>
                            <p className="text-slate-600">
                                Your documents are encrypted at rest and in transit. We prioritize your data privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
