import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File as FileIcon, X, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { api } from '../services/api';
import { cn } from '../lib/utils';

export function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const validateFile = (file: File) => {
        const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            setError('Invalid file type. Please upload PDF, PNG, or JPG.');
            return false;
        }

        const fileSizeMB = file.size / 1024 / 1024;

        if (fileSizeMB > 10) {
            setError('File size exceeds 10MB limit.');
            return false;
        }

        if (fileSizeMB > 5) {
            setWarning('File exceeds 5MB. AI processing might be slower or less accurate.');
        } else {
            setWarning(null);
        }

        setError(null);
        return true;
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && validateFile(droppedFile)) {
            setFile(droppedFile);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && validateFile(selectedFile)) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        try {
            const response = await api.uploadFile(file);
            navigate(`/status/${response.fileId}`);
        } catch (err) {
            setError('Upload failed. Please try again.');
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto flex max-w-2xl flex-col items-center px-4 py-20">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Upload Document</CardTitle>
                </CardHeader>
                <CardContent>
                    {!file ? (
                        <div
                            className={cn(
                                'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-16 transition-colors hover:bg-slate-100',
                                isDragging && 'border-primary-500 bg-primary-50'
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UploadCloud className="mb-4 h-12 w-12 text-slate-400" />
                            <p className="mb-2 text-lg font-medium text-slate-700">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-slate-500">PDF, PNG, JPG (max 10MB)</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={handleFileSelect}
                            />
                        </div>
                    ) : (
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary-100 p-2 text-primary-600">
                                        <FileIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">{file.name}</p>
                                        <p className="text-xs text-slate-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setFile(null)}
                                    className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {warning && (
                        <div className="mt-4 flex items-center gap-2 rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
                            <AlertCircle className="h-4 w-4" />
                            {warning}
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={handleUpload}
                            disabled={!file || isUploading}
                            isLoading={isUploading}
                            className="w-full sm:w-auto"
                        >
                            {isUploading ? 'Uploading...' : 'Start Processing'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
