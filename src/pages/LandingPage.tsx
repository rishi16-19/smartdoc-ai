
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LandingPage() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full bg-gradient-to-b from-white/50 to-transparent py-20 text-center lg:py-32">
                <div className="container mx-auto px-4">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
                        Upload documents. <br className="hidden sm:block" />
                        <span className="text-brand-muted">Extract insights.</span> Powered by AI.
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-brand-dark/80">
                        SmartDoc AI automatically processes your PDFs and images to extract key information, summaries, and entities in seconds.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/upload">
                            <Button size="lg" className="gap-2 bg-brand-dark hover:bg-brand-dark/90">
                                Upload Document <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="border-brand-dark text-brand-dark hover:bg-brand-dark/10">
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
                            <div className="mb-4 rounded-full bg-white/50 p-4 text-brand-dark">
                                <Zap className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-brand-dark">Lightning Fast</h3>
                            <p className="text-brand-dark/70">
                                Get results in seconds. Our advanced AI pipeline processes documents in real-time.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-white/50 p-4 text-brand-dark">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-brand-dark">Accurate Extraction</h3>
                            <p className="text-brand-dark/70">
                                State-of-the-art OCR and NLP models ensure high accuracy for text and entity extraction.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 rounded-full bg-white/50 p-4 text-brand-dark">
                                <Shield className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-brand-dark">Secure & Private</h3>
                            <p className="text-brand-dark/70">
                                Your documents are encrypted at rest and in transit. We prioritize your data privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
