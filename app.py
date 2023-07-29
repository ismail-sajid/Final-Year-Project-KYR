from flask import Flask, jsonify, request, json, Response
from flask_cors import CORS  # Import CORS from flask_cors module
from flask_sqlalchemy import SQLAlchemy
from newbackendFYP import process_prompt, get_applicable_topics
from sqlalchemy import text
from databases import set_tweet, get_top_tweets, get_all_tweets, get_user_tweets, get_user_first_name, change_password, delete_post, increment_likes, decrement_likes, get_applicable_lawyers, contact_message_submission, check_like, add_comments, get_post_comments, check_can_delete, delete_comment
import sqlite3


app = Flask(__name__)


CORS(app)  # Enable CORS for the Flask app
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///databaseoflaws.db"
db = SQLAlchemy(app)


@app.route("/", methods=["POST"])
def process_prompt_route():

    if request.method == "POST":

        jdata = request.data.decode("utf-8")
        data = json.loads(jdata)
        prompt = data.get("prompt")

        # if prompt is None:
        #     return jsonify({"error": "No prompt provided"}), 400
        applicablelaws = process_prompt(prompt)
        applicabletopic = get_applicable_topics(prompt)

        # topic_data = json.dumps({"Topic": Topic})
        combined_data = {
            "applicablelaws": applicablelaws,
            "applicabletopic": applicabletopic
        }

        json_data = json.dumps(combined_data)

        return Response(json_data, content_type="application/json")
    else:
        return jsonify({"error": "Method not allowed"}), 405


@app.route("/login", methods=["POST"])
def login():

    email = request.json.get("email")
    password = request.json.get("password")

    c = sqlite3.connect("databaseoflaws.db")
    cursor = c.cursor()
    # Retrieve the user data from the database
    select_query = "SELECT * FROM USER WHERE Email = ? AND Password = ?"
    cursor.execute(select_query, (email, password))
    user_data = cursor.fetchone()

    # Close the database connection
    cursor.close()
    c.close()
    if user_data:

        return jsonify({"Email": email})
    else:

        return jsonify({"Email": ""})


@app.route("/signup", methods=["POST"])
def signup():
    # Retrieve the data from the request
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    email = request.json.get("email")
    date_of_birth = request.json.get("date_of_birth")
    password = request.json.get("password")

    # Create a connection to the SQLite database
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()

    c.execute(f"""SELECT UserID FROM USER WHERE Email='{email}'""")
    user_id = c.fetchone()

    if user_id is None:
        # Insert the user data into the existing table
        insert_query = "INSERT INTO USER (First_Name, Last_Name, Email, Date_of_Birth, Password) VALUES (?, ?, ?, ?, ?)"
        c.execute(insert_query, (first_name, last_name,
                  email, date_of_birth, password))
        conn.commit()
        return jsonify({"canSignup": "Yes"})
    else:
        return jsonify({"canSignup": "No"})

    # Close the database connection
    c.close()
    conn.close()


@app.route("/highlighted", methods=["GET"])
def highlighted_cases():
    Top_Posts = get_top_tweets()

    return jsonify({"Top_Posts": Top_Posts})


@app.route("/all-posts", methods=["GET"])
def all_posts():
    All_Posts = get_all_tweets()

    return jsonify({"All_Posts": All_Posts})


@app.route("/user-posts", methods=["POST"])
def user_posts():
    email = request.json.get("email")
    User_Posts = get_user_tweets(email)

    return jsonify({"User_Posts": User_Posts})


@app.route("/post-about-this", methods=["POST"])
def post_about_this():

    email = request.json.get("email")
    laws = request.json.get("laws")
    prompt = request.json.get("prompt")
    topics = request.json.get("topics")
    time = request.json.get("time")
    anon = request.json.get("anon")

    set_tweet(email, laws, prompt, topics, time, anon)

    return jsonify({"message": "Successful"})


@app.route("/first-name", methods=["POST"])
def first_name():
    email = request.json.get("email")
    First_Name = get_user_first_name(email)
    return jsonify({"First_Name": First_Name})


@app.route("/change-password", methods=["POST"])
def change_Password_of_user():
    email = request.json.get("email")
    password = request.json.get("password")
    if len(password) > 0:
        change_password(email, password)
        return jsonify({"Message": "Success"})
    else:
        return jsonify({"Message": "Fail"})


@app.route("/delete-post", methods=["POST"])
def delete():
    postID = request.json.get("postId")
    deletedpost = delete_post(postID)
    return jsonify({"Deleted": deletedpost})


@app.route("/post-liked", methods=["POST"])
def likes():

    postID = request.json.get("postId")
    # Likes= request.json.get("likes")
    email = request.json.get("email")
    incrementlikes = increment_likes(postID, email)

    return jsonify({"likes": incrementlikes})


@app.route("/post-disliked", methods=["POST"])
def dislikes():

    postID = request.json.get("postId")
   # Likes= request.json.get("likes")
    email = request.json.get("email")
    decrementlikes = decrement_likes(postID, email)

    return jsonify({"likes": decrementlikes})


@app.route("/lawyers", methods=["POST"])
def lawyers():

    topic = request.json.get("applicabletopic")

    get_lawyer = get_applicable_lawyers(topic)

    return jsonify({"applicablelawyers": get_lawyer})


@app.route("/contact-form", methods=["POST"])
def sending_email():

    sender_email = request.json.get("email")
    number = request.json.get("number")
    name = request.json.get("name")
    message = request.json.get("message")

    contact = contact_message_submission(sender_email, number, name, message)

    return jsonify({"Contact": contact})


@app.route("/check-likes", methods=["POST"])
def checking_likes():

    postId = request.json.get('id')
    email = request.json.get('email')
    status = check_like(postId, email)

    return jsonify({"value": status})


@app.route("/comment-on-post", methods=["POST"])
def commenting():

    comment = request.json.get('comment')
    postid = request.json.get('postId')
    useremail = request.json.get('email')

    ad_comment = add_comments(postid, useremail, comment)

    return jsonify({"comment_count": ad_comment})


@app.route("/fetch-comment-posts", methods=["POST"])
def get_comments():
    postid = request.json.get('postId')
    post_comments = get_post_comments(postid)
    return jsonify({"post_comments": post_comments})


@app.route("/can-delete", methods=["POST"])
def check_delete():
    userID = request.json.get("UserID")
    promptID = request.json.get("promptID")
    email = request.json.get("email")
    value = check_can_delete(userID, promptID, email)
    return jsonify({"value": value})


@app.route("/delete-comment", methods=["POST"])
def delete_a_comment():
    commentID = request.json.get("commentID")

    value = delete_comment(commentID)

    return jsonify({"value": value})


if __name__ == "__main__":
    app.run()
