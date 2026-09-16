# CV Website & AI-Powered Chatbot

An interactive, modern portfolio and CV web interface integrated with a custom RAG (Retrieval-Augmented Generation) AI assistant. This project allows recruiters and visitors to dynamically query professional history, university modules, and academic background through a custom chatbot interface.

## 🚀 Features
* **Interactive Chat Interface:** Clean, modern modal chat widget embedded directly into the CV design.
* **RAG-Powered AI Assistant:** Utilizes an n8n workflow paired with Google Gemini and a Vector Store to accurately retrieve and answer questions using personal documentation (e.g., resumes, transcripts).
* **Automated Data Ingestion:** Automatically reads and embeds documents from Google Drive into vector memory.
* **Custom Frontend Styling:** Responsive HTML/CSS UI with custom layouts and buttons.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS fetch API)
* **Backend & Automation:** n8n Cloud
* **AI & Embeddings:** Google Gemini API
* **Knowledge Base / Vector Database:** Built-in n8n Vector Store with Google Drive integration

## ⚙️ Workflow Architecture
1. **Ingestion Phase:** Pulls documents from Google Drive, splits and embeds the text using Gemini, and stores it in the vector database.
2. **Inference Phase:** Handles live user messages sent from the website webhook, queries the vector database for context, and generates precise answers via the AI Agent.