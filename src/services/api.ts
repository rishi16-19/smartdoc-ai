
import { authService } from "./auth";

// Types
export interface UploadResponse {
    fileId: string;
    uploadUrl: string;
}

export interface ProcessingStatus {
    status: 'UPLOADED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
}

export interface AnalysisResult {
    summary: string;
    entities: string[];
    keyPhrases: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = await authService.getToken();


export const api = {
    /**
     * Uploads a file to the backend.
     * 1. Calls POST /upload-url to get a presigned URL.
     * 2. Uploads the file directly to S3 using the presigned URL.
     */

    uploadFile: async (file: File): Promise<UploadResponse> => {
        // Step 1: Get presigned URL
        const initResponse = await fetch(`${API_BASE_URL}/upload-url`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fileName: file.name,
                contentType: file.type
            })
        });

        if (!initResponse.ok) {
            throw new Error(`Failed to initiate upload: ${initResponse.statusText}`);
        }

        const data = await initResponse.json();
        const { fileId, uploadUrl } = data;

        // Step 2: Upload to S3
        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type || "application/pdf"
            },
            body: file,
        });

        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload file to S3: ${uploadResponse.statusText}`);
        }

        return { fileId, uploadUrl };
    },

    getStatus: async (fileId: string): Promise<ProcessingStatus> => {
        const response = await fetch(`${API_BASE_URL}/status/${fileId}`, {
            headers: {
                Authorization: token!
            }
        });


        if (!response.ok) {
            throw new Error(`Failed to fetch status: ${response.statusText}`);
        }

        return response.json();
    },

    getResult: async (fileId: string): Promise<AnalysisResult> => {
        const response = await fetch(`${API_BASE_URL}/result/${fileId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch result: ${response.statusText}`);
        }

        return response.json();
    }
};
