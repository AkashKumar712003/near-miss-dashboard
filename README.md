# SafeGuard: Near Miss Analytics Dashboard

An interactive, production-grade dashboard designed to visualize and analyze safety incident ("Near Miss") data. This application transforms raw JSON logs into actionable insights using interactive charts, real-time filtering, and a **zero-configuration AI data assistant**.

##  Key Features

* **Interactive Analytics:**
  * **5 Distinct Charts:** Monthly Trends (Area), Top Categories (Bar), Severity Distribution (Donut), Act vs. Condition (Pie), and Top Locations (Horizontal Bar).
  * **Dynamic Filtering:** Filter all charts, KPIs, and tables simultaneously by **Location** and **Severity Level**.


* **Local AI Assistant:**
  * Built-in "Data Assistant" that answers questions about the dataset using a **custom rule-based NLP engine**.
  * **No API Keys Required:** Runs entirely in the browser for instant, offline analysis.
  * Capable of calculating specific counts, identifying high-risk areas, and summarizing trends based on natural language input.


* **Detailed Incident Log:**
  * Paginated data table with status badges and sorting.
  * Search functionality for filtering by category or description.


* **Modern UI/UX:**
  * Fully responsive sidebar layout.
  * **Dark Mode** support (system-wide toggle).
  * Glassmorphism effects and smooth transitions.



## Tech Stack

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Visualization:** Recharts
* **Icons:** Lucide React
* **Logic:** Custom JavaScript Data Aggregation

## Getting Started

### 1. Prerequisites

Ensure you have **Node.js** (v16+) installed.

### 2. Installation

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone <repository-url>

# Navigate to project folder
cd near-miss-dashboard

# Install dependencies
npm install

```

### 3. Data Setup (Crucial)

The application requires your dataset to run.

1. Locate your `near_miss_data.json` file.
2. Move it into the `src/` folder so the path matches `src/near_miss_data.json`.
*(The app is pre-configured to import from this specific path).*

### 4. Run the Application

Start the development server:

```bash
npm run dev

```

Open your browser to `http://localhost:5173`.

---

## Project Structure

The project follows a modular architecture for scalability and maintainability:

```text
src/
├── components/
│   ├── shared/          # Reusable UI components (Badge, StatCard, etc.)
│   └── views/           # Page-level components
│       ├── DashboardView.jsx   # Main charts view (5 Interactive Charts)
│       ├── IncidentsView.jsx   # Paginated data table
│       ├── AIChatView.jsx      # AI Assistant Interface
│       ├── TeamView.jsx        # Team management UI
│       └── SettingsView.jsx    # Application settings
├── utils/
│   ├── dataProcessor.js # Aggregation logic for charts
│   └── aiLogic.js       # Local NLP rule engine for the Chatbot
├── App.jsx              # Main Layout & State Management
└── near_miss_data.json  # Source Data

```

## How the AI Assistant Works

The "AI Assistant" tab uses a **local logic engine** (`src/utils/aiLogic.js`) instead of an external API. This ensures the project is fully runnable offline and requires no setup.

**Supported Query Types:**

* **Location Analysis:** *"How many incidents in Zone A?"*, *"Show me Area 42 stats"*
* **Risk Assessment:** *"What are the critical risks?"*, *"Show severity level 3 count"*
* **Category Insights:** *"What is the most common category?"*
* **Summaries:** *"Give me an overview"*, *"Total records"*

*The engine parses these queries using regex patterns and computes the answer dynamically from the filtered dataset in real-time.*

##  Assumptions

* **Data Format:** The app assumes the JSON file contains an array of objects with fields: `incident_date`, `primary_category`, `severity_level`, and `location`.
* **Performance:** Client-side processing is optimized for datasets up to ~10,000 records.

##  License

This project is submitted as part of an assignment evaluation.
