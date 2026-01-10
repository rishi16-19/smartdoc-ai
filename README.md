📄 SmartDoc AI — Serverless Intelligent Document Processing Platform

SmartDoc AI is an end-to-end serverless document understanding system that allows users to upload PDFs and images, extract text using AWS Textract, enrich insights using AWS Comprehend and foundation models, and retrieve structured results through secure APIs.

This project is designed with scalability, cost control, and production-grade architecture in mind.

🚀 Features

🔐 Secure Authentication

AWS Cognito User Pool (Signup, Login, Email verification)

📤 File Upload

PDFs, JPEG, PNG supported

Pre-signed S3 upload URLs

File size & MIME validation

📄 Text Extraction

AWS Textract (asynchronous, scalable)

🧠 Intelligent Enrichment

AWS Comprehend for:

Key Phrases

Named Entities

Foundation-model ready (Bedrock-compatible design)

🔄 Orchestration

AWS Step Functions with retry, wait, poll-count & failure guards

📦 Persistence

DynamoDB for document status & AI results

🌐 Frontend

CloudFront + S3 static hosting

💰 Cost Controls

File size limits

Poll limits in Step Functions

Conditional AI execution

Serverless-first design

🧱 Architecture Overview
Frontend (CloudFront + S3)
        |
        v
API Gateway (Cognito Authorizer)
        |
        v
Lambda (Upload URL Generator)
        |
        v
S3 (Input Bucket)
        |
        v
Step Functions
   ├── MarkProcessing
   ├── Textract (Start + Poll)
   ├── Normalize Text
   ├── Comprehend Extraction
   ├── (Optional) LLM Summary
   └── Store Results (DynamoDB)
        |
        v
API Gateway (/result/{fileId})

🧠 State Machine Design (Highlights)

No infinite loops

Poll count guard with max retries

Graceful failure handling

FAILED state persisted to DynamoDB

Event-driven

Triggered automatically on S3 upload

Cost-aware

Early exits for small / low-value text

📊 DynamoDB Data Model
Attribute	Type	Description
fileId	PK	Unique document ID
status	S	UPLOADED / PROCESSING / COMPLETED / FAILED
summary	S	Extracted summary
keyPhrases	L	List of key phrases
entities	L	List of detected entities
🔐 Security

Cognito-based JWT authentication

API Gateway authorizers

Private S3 buckets

Least-privilege IAM roles per Lambda

CORS configured correctly across APIs

💰 Cost Optimization Techniques Used

Max file size restriction (5 MB)

Step Function poll limits

Conditional AI invocation

Async Textract (not sync)

Serverless components only (no EC2)

🛠 Tech Stack

Frontend: React, Vite, CloudFront, S3

Backend: AWS Lambda, API Gateway

AI & NLP: Textract, Comprehend, Bedrock-ready

Orchestration: AWS Step Functions

Auth: AWS Cognito

Storage: S3, DynamoDB

IaC (partial): AWS Console + policies

📌 Future Enhancements

Vector embeddings & semantic search

RAG-based question answering

Multi-document comparison

Webhook-based processing status

UI for extracted entities & highlights

🏁 Status

✅ Production-grade MVP completed
📦 Fully serverless
💸 Cost-safe
🔒 Secure
📈 Scalable