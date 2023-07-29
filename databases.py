import sqlite3

conn = sqlite3.connect("databaseoflaws.db")
c = conn.cursor()


def make_table_tweets():
    c.execute("""DROP TABLE IF EXISTS AllTweets""")
    create_table_query = """
    CREATE TABLE AllTweets (
    promptID INTEGER PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER,
    userName TEXT,
    Topic TEXT,
    prompt TEXT,
    Like INTEGER,
    Laws TEXT,
    Time TIMESTAMP,
    FOREIGN KEY (promptID) REFERENCES COMMENTS (promptID),
    FOREIGN KEY (UserID) REFERENCES USER (UserID)
    );
    """
    c.execute(create_table_query)


def User():
    create_user = """
    CREATE TABLE USER (
    UserID INTEGER PRIMARY KEY,
    First_Name TEXT,
    Last_Name TEXT,
    Email TEXT,
    Date_of_Birth TEXT,
    Password NVARCHAR(160) NOT NULL
    );
    """
    c.execute(create_user)


def Comment():
    create_comment_table = """
    
    CREATE TABLE COMMENTS (
    CommentID INTEGER PRIMARY KEY AUTOINCREMENT,
    promptID INTEGER NOT NULL,
    USerID INTEHER,
    Name TEXT,
    Comments TEXT NOT NULL,
    FOREIGN KEY (promptID) REFERENCES AllTweets (promptID)
    FOREIGN KEY (UserID) REFERENCES USERS (UserID)
    );
    """
    c.execute(create_comment_table)


def Lawyers():

    create_lawyer = """
    CREATE TABLE Lawyers (
    LawyerID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Specialization TEXT,
    Email TEXT,
    Rating NUMERIC,
    Price TEXT,
    W_Experience INTEGER
    );
    """
    c.execute(create_lawyer)


def Contact():
    create_contact = """
    CREATE TABLE Contact (
    MessageID INTEGER PRIMARY KEY AUTOINCREMENT,
    Full_Name TEXT,
    Contact_No TEXT,
    Email TEXT,
    Meaasge TEXT
    );
    """
    c.execute(create_contact)


# Execute the table creation functions

def set_tweet(email, laws, prompt, topics, time, anon):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f"""SELECT UserID FROM USER WHERE Email='{email}'""")
    user_id = c.fetchone()
    user_id = user_id[0]
    if (anon):
        user_name = "Anonymous"
    else:
        c.execute(f"""SELECT First_Name FROM USER WHERE UserID='{user_id}'""")
        user_name = c.fetchone()
        user_name = user_name[0]

    like = 0
    laws = ", ".join(laws)

    insert_query = "INSERT INTO AllTweets (UserID, userName, Topic, prompt, Like, Laws,Time,Likedby,No_of_comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    c.execute(insert_query, (user_id, user_name,
              topics, prompt, like, laws, time, '', 0))

    c.execute(f"""SELECT Laws FROM AllTweets WHERE UserID='{user_id}'""")
    laws_from_db = c.fetchone()
    laws_from_db = laws_from_db[0]

    conn.commit()


def get_all_tweets():
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute("""SELECT * FROM AllTweets ORDER BY Time DESC""")

    posts = c.fetchall()
    conn.close()
    return posts


def get_user_tweets(email):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f"""SELECT UserID FROM USER WHERE Email='{email}'""")
    user_id = c.fetchone()
    user_id = user_id[0]
    c.execute(
        f"""SELECT * FROM AllTweets WHERE UserID={user_id} ORDER BY Time DESC""")
    user_posts = c.fetchall()
    return user_posts


def get_top_tweets():
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute("""SELECT * FROM AllTweets ORDER BY Like DESC LIMIT 5""")
    top_tweets = c.fetchall()
    return top_tweets


def get_user_first_name(email):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f"""SELECT First_Name FROM USER WHERE Email='{email}'""")
    first_name = c.fetchone()
    name = first_name[0]
    return name


def change_password(email, password):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f""" 
    UPDATE USER
    SET Password = '{password}'
    WHERE Email = '{email}'""")
    conn.commit()


def delete_post(promptid):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f""" 
    DELETE FROM AllTweets
    WHERE promptID= {promptid};
    """)
    conn.commit()


def increment_likes(promptid, email):

    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()

    c.execute(f"SELECT Like FROM AllTweets WHERE promptID = '{promptid}'")
    fetched_likes = c.fetchone()
    likes = fetched_likes[0]

    newLikes = likes+1
    c.execute(f"""
    UPDATE AllTweets
    SET Like = ?
    WHERE promptID = ?
    """, (newLikes, promptid))
    c.execute(f"SELECT Likedby FROM AllTweets WHERE promptid= '{promptid}'")
    all_liked = c.fetchone()
    c.execute(f"SELECT UserID FROM USER WHERE Email='{email}'")
    userid_of_user = c.fetchone()

    if all_liked is not None and userid_of_user is not None:
        all_liked = all_liked[0]

        userid_of_user = userid_of_user[0]

        if str(userid_of_user) not in all_liked:

            all_liked = all_liked + " " + str(userid_of_user)
            c.execute(
                f"""UPDATE  AllTweets SET Likedby = ? WHERE promptID = ? """, (all_liked, promptid))

        conn.commit()
        return newLikes


def decrement_likes(promptid, email):

    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()

    c.execute(f"SELECT Like FROM AllTweets WHERE promptID = '{promptid}'")
    fetched_likes = c.fetchone()
    likes = fetched_likes[0]

    newLikes = likes-1
    c.execute(f"""
    UPDATE AllTweets
    SET Like = ?
    WHERE promptID = ?
    """, (newLikes, promptid))
    c.execute(f"SELECT Likedby FROM AllTweets WHERE promptid={promptid}")
    all_liked = c.fetchone()
    all_liked = all_liked[0]
    c.execute(f"SELECT UserID FROM USER WHERE Email='{email}'")
    userid_of_user = c.fetchone()
    userid_of_user = userid_of_user[0]

    all_liked = all_liked.replace(str(userid_of_user), '')
    c.execute(f"""UPDATE  AllTweets SET Likedby = ? WHERE promptID = ? """,
              (all_liked, promptid))
    conn.commit()
    return newLikes


def get_applicable_lawyers(applicabletopics):

    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    query = "SELECT * FROM Lawyers WHERE Specialization LIKE ?"
    topics = applicabletopics.split('-')
    topic_patterns = ['%' + topic + '%' for topic in topics]
    query = "SELECT * FROM Lawyers WHERE " + \
        " OR ".join(["Specialization LIKE ?" for _ in topics])
    c.execute(query, topic_patterns)
    lawyers = c.fetchall()

    return lawyers


def contact_message_submission(sender_email, number, name, message):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    insert_query = "INSERT INTO Contact (Full_Name, Contact_No, Email, Meaasge) VALUES (?, ?, ?, ?)"
    c.execute(insert_query, (name, number, sender_email, message))
    conn.commit()


def check_like(promptid, email):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f"SELECT UserID FROM USER WHERE Email='{email}'")
    userid_of_user = c.fetchone()
    c.execute(f"SELECT Likedby FROM AllTweets WHERE promptid='{promptid}'")
    all_liked = c.fetchone()

    if all_liked is not None and userid_of_user is not None:
        userid_of_user = userid_of_user[0]
        all_liked = all_liked[0]

        if str(userid_of_user) not in all_liked:
            return "NotLiked"
        else:
            return "Liked"
    else:
        return "NotLiked"


def add_comments(postid, useremail, comment):

    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f"SELECT UserID FROM USER WHERE Email='{useremail}'")
    userid_of_user = c.fetchone()
    userid_of_user = userid_of_user[0]

    c.execute(
        f"""SELECT First_Name FROM USER WHERE UserID='{userid_of_user}'""")
    user_name = c.fetchone()
    user_name = user_name[0]

    c.execute(
        f"""SELECT No_of_comments FROM AllTweets WHERE promptID='{postid}'""")
    count_comments = c.fetchone()
    count_comments = count_comments[0]

    count_comments = count_comments + 1
    c.execute(f"""
    UPDATE AllTweets
    SET No_of_comments = ?
    WHERE promptID = ?
    """, (count_comments, postid))

    insert_query = "INSERT INTO COMMENTS (promptID, UserID, Name, Comments) VALUES (?, ?, ?, ?)"
    c.execute(insert_query, (postid, userid_of_user, user_name, comment))
    conn.commit()
    return count_comments


def get_post_comments(postid):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f"SELECT * FROM COMMENTS WHERE promptID='{postid}'")
    post_comments = c.fetchall()

    return post_comments


def check_can_delete(userID, promptID, email):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f"SELECT UserID FROM USER WHERE Email='{email}'")
    active_uid = c.fetchone()
    active_uid = active_uid[0]

    c.execute(f"SELECT UserID FROM AllTweets WHERE promptID='{promptID}'")
    post_promptID = c.fetchone()
    post_promptID = post_promptID[0]

    if (active_uid == post_promptID or active_uid == userID):
        return "Yes"

    else:
        return "No"


def delete_comment(commentID):
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()
    c.execute(f"SELECT promptID FROM COMMENTS WHERE CommentID='{commentID}'")
    prompt_id = c.fetchone()
    prompt_id = prompt_id[0]

    c.execute(
        f"SELECT No_of_comments FROM AllTweets WHERE promptID='{prompt_id}'")
    count_comments = c.fetchone()
    count_comments = count_comments[0]

    c.execute(f""" 
    DELETE FROM COMMENTS
    WHERE CommentID= {commentID};
    """)
    count_comments = count_comments-1
    c.execute(f"""
    UPDATE AllTweets
    SET No_of_comments = ?
    WHERE promptID = ?
    """, (count_comments, prompt_id))

    conn.commit()
    return (count_comments)


c.execute("SELECT name FROM sqlite_master WHERE type='table';")

# Fetch all the table names from the result
table_names = c.fetchall()

# Get the count of tables
table_count = len(table_names)

# Print the table count
print("Number of tables in the database:", table_count)


# Commit the changes to the database and close the connection
conn.commit()
conn.close()
