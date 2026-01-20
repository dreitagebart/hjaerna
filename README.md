# **🧠 AI-Powered Second Brain**

A self-hosted, sovereign knowledge management system that turns messy inputs (Slack, YouTube, Web links) into a structured, searchable Obsidian vault using Node.js, TypeScript, Gemini AI, and Vector Search.

## **🌟 Key Features**

* **Multi-Modal Input:** "Dump" ideas, tasks, or YouTube links directly via Slack.
* **AI Librarian (Gemini Pro):** Automatically categorizes inputs, summarizes transcripts, and asks follow-up questions if metadata (like deadlines) is missing.
* **Obsidian Compatibility:** All data is stored as local Markdown files on your VPS.
* **Semantic Search:** Hybrid storage approach using **ChromaDB** for vector-based similarity search (finding notes by meaning, not just keywords).
* **Self-Hosted & Private:** Full control over your data with Docker and encrypted backups to Google Drive via Rclone.
* **E2E Sync:** Real-time synchronization between your VPS, Desktop, and Mobile via Syncthing.

## **🏗️ Architecture**

1. **Input Layer:** Slack Bot (Socket Mode) receives messages and links.
2. **Processing Layer:** Node.js service extracts content from URLs (YouTube transcripts/Web scraping) and interacts with the **Gemini API**.
3. **Storage Layer:** \- **Markdown:** Physical files stored in an Obsidian-ready folder structure.
   * **Vector DB:** ChromaDB stores embeddings for the Next.js web interface.
4. **Sync & Backup:** \- **Syncthing:** Encrypted peer-to-peer sync.
   * **Rclone:** Daily encrypted backups to offsite cloud storage.

## **🤖 Detailed Slack Bot Setup (Socket Mode)**

To set up the bot for this project, follow these steps in the [Slack App Dashboard](https://api.slack.com/apps):

1. **Create App:**
   * Click **"Create New App"** \-\> **"From Scratch"**.
   * Name: Second Brain | Workspace: Your desired workspace.
2. **Enable Socket Mode:**
   * Navigate to **"Settings" \> "Socket Mode"** in the left sidebar.
   * Switch **"Enable Socket Mode"** to **ON**.
   * Slack will ask for an "App-Level Token". Give it a name (e.g., brain-token) and click **"Generate"**.
   * **IMPORTANT:** Copy this token (xapp-...). This is your SLACK\_APP\_TOKEN for the .env file.
3. **Set Permissions (OAuth & Permissions):**
   * Sidebar: **"Features" \> "OAuth & Permissions"**.
   * Scroll to **"Scopes" \> "Bot Token Scopes"** and add the following:
     * chat:write (Allows the bot to send messages)
     * im:history (Allows the bot to read direct message history)
     * im:read
     * im:write
   * Scroll up and click **"Install to Workspace"** \-\> Allow.
   * **IMPORTANT:** Copy the **"Bot User OAuth Token"** (xoxb-...). This is your SLACK\_BOT\_TOKEN for the .env file.
4. **Subscribe to Events (Event Subscriptions):**
   * Sidebar: **"Features" \> "Event Subscriptions"**.
   * Switch **"Enable Events"** to **ON**.
   * Expand **"Subscribe to bot events"** and add:
     * message.im (Allows the bot to hear when you send it a DM).
   * Click **"Save Changes"** at the bottom.
5. **Add App in Slack Client:**
   * Open Slack. In your workspace, find the **"Apps"** section in the bottom left.
   * Click the \+, search for Second Brain, and add the bot. You can now start messaging it\!

## **🚀 Getting Started**

### **Prerequisites**

* Docker & Docker Compose
* Slack App (with Tokens from steps above)
* Google Gemini API Key

### **Installation**

1. **Clone the repository:**
   git clone \[https://github.com/your-username/second-brain-ai.git\](https://github.com/your-username/second-brain-ai.git)
   cd second-brain-ai

2. **Configure Environment:**
   Create a .env file in the root directory:
   SLACK\_BOT\_TOKEN=xoxb-...
   SLACK\_APP\_TOKEN=xapp-...
   GEMINI\_API\_KEY=your\_key
   CHROMA\_URL=http://chroma:8000

3. **Deploy with Docker:**
   docker-compose up \-d \--build

## **🛠️ Technology Stack**

* **Runtime:** Node.js (TypeScript)
* **AI Brain:** Google Gemini 2.5 Flash / Pro
* **Vector DB:** ChromaDB
* **Frontend:** Next.js (Tailwind CSS)
* **Sync:** Syncthing
* **Infrastructure:** Docker Compose on VPS

## **📂 Project Structure**

* /bot: TypeScript logic for Slack events and AI processing.
* /webapp: Next.js application for browsing and semantic search.
* /data: Local folder containing the Markdown vault (synced via Syncthing).
* /chroma-data: Persistent storage for the vector database.

## **🛡️ Data Privacy & Backups**

Your data belongs to you.

* All processing happens on your own VPS.
* Markdown files are human-readable and not locked into a proprietary format.
* Use the integrated rclone setup (optional) to schedule encrypted backups to your preferred cloud provider.

*Built with ❤️ for digital sovereignty*
