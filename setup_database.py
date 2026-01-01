"""
Database setup script - Run this once to initialize the database tables.
"""
import sqlite3
import os

# Check if database exists, if not create it
db_file = "databaseoflaws.db"
conn = sqlite3.connect(db_file)
c = conn.cursor()

print("Setting up database tables...")

# Create USER table
try:
    c.execute("""
    CREATE TABLE IF NOT EXISTS USER (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    First_Name TEXT,
    Last_Name TEXT,
    Email TEXT UNIQUE,
    Date_of_Birth TEXT,
    Password NVARCHAR(160) NOT NULL
    );
    """)
    print("✓ USER table created")
except Exception as e:
    print(f"Error creating USER table: {e}")

# Create AllTweets table
try:
    c.execute("""DROP TABLE IF EXISTS AllTweets""")
    c.execute("""
    CREATE TABLE AllTweets (
    promptID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER,
    userName TEXT,
    Topic TEXT,
    prompt TEXT,
    Like INTEGER,
    Laws TEXT,
    Time TIMESTAMP,
    No_of_comments INTEGER DEFAULT 0,
    Anonymous INTEGER DEFAULT 0,
    FOREIGN KEY (UserID) REFERENCES USER (UserID)
    );
    """)
    print("✓ AllTweets table created")
except Exception as e:
    print(f"Error creating AllTweets table: {e}")

# Create COMMENTS table
try:
    c.execute("DROP TABLE IF EXISTS COMMENTS")
    c.execute("""
    CREATE TABLE COMMENTS (
    CommentID INTEGER PRIMARY KEY AUTOINCREMENT,
    promptID INTEGER NOT NULL,
    UserID INTEGER,
    Name TEXT,
    Comments TEXT NOT NULL,
    FOREIGN KEY (promptID) REFERENCES AllTweets (promptID),
    FOREIGN KEY (UserID) REFERENCES USER (UserID)
    );
    """)
    print("✓ COMMENTS table created")
except Exception as e:
    print(f"Error creating COMMENTS table: {e}")

# Create Lawyers table
try:
    c.execute("""
    CREATE TABLE IF NOT EXISTS Lawyers (
    LawyerID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Specialization TEXT,
    Email TEXT,
    Rating NUMERIC,
    Price TEXT,
    W_Experience INTEGER
    );
    """)
    print("✓ Lawyers table created")
except Exception as e:
    print(f"Error creating Lawyers table: {e}")

# Create Contact table
try:
    c.execute("""
    CREATE TABLE IF NOT EXISTS Contact (
    MessageID INTEGER PRIMARY KEY AUTOINCREMENT,
    Full_Name TEXT,
    Contact_No TEXT,
    Email TEXT,
    Message TEXT
    );
    """)
    print("✓ Contact table created")
except Exception as e:
    print(f"Error creating Contact table: {e}")

# Create Likes table (if needed for tracking likes)
try:
    c.execute("""
    CREATE TABLE IF NOT EXISTS Likes (
    LikeID INTEGER PRIMARY KEY AUTOINCREMENT,
    promptID INTEGER,
    UserID INTEGER,
    FOREIGN KEY (promptID) REFERENCES AllTweets (promptID),
    FOREIGN KEY (UserID) REFERENCES USER (UserID),
    UNIQUE(promptID, UserID)
    );
    """)
    print("✓ Likes table created")
except Exception as e:
    print(f"Error creating Likes table: {e}")

conn.commit()
conn.close()

print("\n✓ Database setup complete!")
print(f"Database file: {os.path.abspath(db_file)}")

