# KYR - Know Your Rights

A full-stack web application that helps users understand their legal rights by processing natural language queries and matching them with applicable Pakistani laws. Users can describe their situation in plain language, and the system will identify relevant laws, provide legal information, and connect them with relevant lawyers.

## 🎯 Quick Start

If you're in a hurry, here's the minimal setup:

```bash
# 1. Backend setup
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('averaged_perceptron_tagger'); nltk.download('wordnet')"
python setup_database.py

# 2. Frontend setup
npm install

# 3. Run (in two separate terminals)
# Terminal 1:
python app.py

# Terminal 2:
npm run dev

# 4. Open http://localhost:3000 in your browser
```

For detailed instructions, see the [Installation & Setup](#-installation--setup) section below.

## 🚀 Features

- **Natural Language Processing**: Describe your situation in plain language (English or Urdu)
- **Law Matching**: Automatically identifies applicable laws from Pakistani legal system
- **Topic Classification**: Categorizes cases into relevant legal topics (Rape, Sexual Abuse, Gender Discrimination, Marriage, Education)
- **Case Sharing**: Users can share their cases anonymously or with their identity
- **Community Support**: View and interact with other users' cases
- **Lawyer Directory**: Find relevant lawyers based on case topics
- **User Authentication**: Secure login and registration system
- **Comments & Engagement**: Like, comment, and engage with community posts

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Python** (3.8 or higher) - [Download](https://www.python.org/downloads/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning the repository)

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Final-Year-Project-KYR
```

### Step 2: Backend Setup

#### 2.1 Create Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### 2.2 Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### 2.3 Download NLTK Data

The application uses Natural Language Processing (NLTK) for text processing. Download required NLTK data:

```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('averaged_perceptron_tagger'); nltk.download('wordnet')"
```

#### 2.4 Initialize Database

Create the database tables:

```bash
python setup_database.py
```

This will create the SQLite database (`databaseoflaws.db`) with all necessary tables. You only need to run this once.

### Step 3: Frontend Setup

#### 3.1 Install Node.js Dependencies

```bash
npm install
```

This will install all required packages including React, TypeScript, Vite, and other dependencies.

## 🚀 Running the Application

The application requires both backend and frontend servers to be running simultaneously.

### Terminal 1: Start Backend Server

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Start Flask server
python app.py
```

The backend will start on **http://localhost:5001**

You should see:
```
 * Running on http://127.0.0.1:5001
 * Debugger is active!
```

### Terminal 2: Start Frontend Server

```bash
npm run dev
```

The frontend will start on **http://localhost:3000**

You should see:
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:3000/
```

### Step 4: Access the Application

Open your web browser and navigate to:

**http://localhost:3000**

The frontend will automatically proxy API requests to the backend running on port 5001.

## 📁 Project Structure

```
Final-Year-Project-KYR/
├── src/                          # Frontend React application
│   ├── components/              # React components
│   │   ├── styles/              # Component-specific CSS files
│   │   ├── Login.tsx            # Login component
│   │   ├── Signup.tsx           # Registration component
│   │   ├── PromptInput.tsx     # Main input for legal queries
│   │   ├── PromptOutput.tsx    # Display applicable laws
│   │   └── ...                  # Other components
│   ├── config/
│   │   └── api.ts              # API configuration and endpoints
│   ├── App.tsx                 # Main app component with routing
│   ├── HomePage.tsx            # Home page component
│   └── main.tsx                # Application entry point
│
├── app.py                      # Flask backend API server
├── newbackendFYP.py           # NLP processing and law matching logic
├── databases.py                # Database operations and queries
├── setup_database.py          # Database initialization script
│
├── *.csv                      # Legal data files (rape, sexualharrasment, etc.)
├── databaseoflaws.db          # SQLite database (created after setup)
│
├── package.json               # Node.js dependencies
├── requirements.txt           # Python dependencies
├── vite.config.ts             # Vite configuration with proxy setup
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🔌 API Endpoints

The backend provides the following REST API endpoints:

### Authentication
- `POST /login` - User login
- `POST /signup` - User registration

### Legal Query Processing
- `POST /` - Process natural language prompt and return applicable laws

### Posts & Cases
- `GET /highlighted` - Get top/highlighted cases
- `GET /all-posts` - Get all user posts
- `POST /user-posts` - Get posts by specific user
- `POST /post-about-this` - Create a new post/case

### User Management
- `POST /first-name` - Get user's first name
- `POST /change-password` - Update user password

### Interactions
- `POST /post-liked` - Like a post
- `POST /post-disliked` - Unlike a post
- `POST /check-likes` - Check if user has liked a post
- `POST /comment-on-post` - Add a comment to a post
- `POST /fetch-comment-posts` - Get comments for a post
- `POST /can-delete` - Check if user can delete a post/comment
- `POST /delete-comment` - Delete a comment
- `POST /delete-post` - Delete a post

### Lawyers
- `POST /lawyers` - Get relevant lawyers based on topic

### Contact
- `POST /contact-form` - Submit contact form

## 🗄️ Database

The application uses **SQLite** database (`databaseoflaws.db`) with the following main tables:

- **USER** - User accounts and authentication
- **AllTweets** - User posts/cases
- **COMMENTS** - Comments on posts
- **Lawyers** - Lawyer directory
- **Contact** - Contact form submissions
- **Likes** - Post likes tracking
- Topic-specific tables (rapeTable, sexualAbuseTable, etc.)

## 📊 Legal Data Files

The application uses CSV files containing Pakistani legal information:

- `rape.csv` - Laws related to rape cases
- `sexualharrasment.csv` - Laws related to sexual harassment
- `genderdiscrimination.csv` - Gender discrimination laws
- `marriage.csv` - Marriage and family laws
- `education.csv` - Education-related laws

Each CSV file follows the format:
```csv
SR. No.,Law
1,"Law description..."
2,"Another law..."
```

## ⚙️ Configuration

### Backend Port

The Flask backend runs on **port 5001** (instead of the default 5000) to avoid conflicts with macOS AirPlay Receiver. This is configured in `app.py`.

### Frontend Port

The Vite development server runs on **port 3000** and automatically proxies API requests to the backend.

### API Configuration

API endpoints are centrally configured in `src/config/api.ts`. This makes it easy to:
- Change the API base URL
- Update endpoint paths
- Switch between development and production environments

## 🐛 Troubleshooting

### Backend Issues

**Port 5001 already in use:**
```bash
# Find and kill the process using port 5001
lsof -ti:5001 | xargs kill -9
```

**NLTK data not found:**
```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('averaged_perceptron_tagger'); nltk.download('wordnet')"
```

**Database errors:**
```bash
# Reinitialize the database
python setup_database.py
```

### Frontend Issues

**Port 3000 already in use:**
- Vite will automatically try the next available port
- Or change the port in `vite.config.ts`

**Module not found errors:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Proxy errors:**
- Ensure backend is running on port 5001
- Check `vite.config.ts` proxy configuration
- Restart both servers

### Common Issues

**404 errors on frontend routes:**
- Make sure you're accessing `http://localhost:3000` (not 5001)
- Frontend routes are handled by React Router

**API calls failing:**
- Verify backend is running: `curl http://localhost:5001/highlighted`
- Check browser console for errors
- Verify API endpoints in `src/config/api.ts`

## 🧪 Development

### Building for Production

```bash
# Build frontend
npm run build

# The built files will be in the `dist/` directory
```

### Code Structure

- **Frontend**: React with TypeScript, using Vite as build tool
- **Backend**: Flask (Python) with SQLite database
- **NLP Processing**: NLTK for text processing and law matching
- **Styling**: Bootstrap + custom CSS

### Adding New Features

1. **New API Endpoint:**
   - Add route in `app.py`
   - Add endpoint constant in `src/config/api.ts`
   - Update components to use the new endpoint

2. **New Component:**
   - Create component in `src/components/`
   - Add route in `src/App.tsx` if needed
   - Import and use in parent components

3. **New Legal Topic:**
   - Create CSV file with laws
   - Add topic in `newbackendFYP.py` using `makeTopic()`
   - Ensure CSV file is in root directory

## 📝 Notes

- The application processes text in both English and Urdu (Urdu is automatically translated)
- All legal information is specific to Pakistani law
- User passwords are stored in plain text (consider hashing for production)
- The database is SQLite (consider PostgreSQL/MySQL for production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of a Final Year Project. Please refer to the project documentation for licensing information.

## 👥 Authors

- Project Team Members

## 🙏 Acknowledgments

- Pakistani Legal System references
- NLTK for natural language processing
- React and Flask communities

---

**Need Help?** Check the troubleshooting section above or open an issue in the repository.
