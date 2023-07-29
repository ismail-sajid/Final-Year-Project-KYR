from translate import Translator
from langdetect import detect
import time
import re
import csv
import sqlite3
import nltk
from nltk.tokenize import word_tokenize
from nltk.tokenize import blankline_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer, PorterStemmer
from nltk.corpus import wordnet
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')


def initializeGlobal():
    global Topics, allTables, allDictionaries, Tables, c, conn

    Topics = []
    allTables = []
    allDictionaries = []
    Tables = {}
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()


initializeGlobal()


def get_wordnet_pos(word):
    # Map POS tag to first character used by WordNetLemmatizer
    tag = nltk.pos_tag([word])[0][1][0].upper()
    if tag == "J":
        if word.endswith("ing"):
            tag = wordnet.VERB
        else:
            tag = wordnet.ADJ
    elif tag == "N":
        tag = wordnet.NOUN
    elif tag == "V":
        tag = wordnet.VERB
    elif tag == "R":
        tag = wordnet.ADV
    else:
        tag = wordnet.NOUN  # default to noun
    return tag


# Function to find synonyms of words
def get_synonyms(word):
    synonyms = []
    for synset in wordnet.synsets(word):
        for lemma in synset.lemmas():

            synonyms.append(lemma.name().replace("_", " "))
    return list(set(synonyms))


def token_punctutation_stopwords_stem_lemmatize_synonyms(text):
    """Lemmatize text by performing both stemming and lemmatization, removing punctuation, and adding synonyms"""
    # Tokenize the text
    tokens = nltk.word_tokenize(text.lower())

    # Remove punctuation
    punctuation = re.compile(r"[-.?!,:;()|0-9]")
    tokens = [punctuation.sub("", word) for word in tokens if len(word) > 0]

    # Remove stop words
    stop_words = set(stopwords.words("english"))
    filtered_tokens = [token for token in tokens if token not in stop_words]

    # Perform stemming and lemmatization
    stemmer = PorterStemmer()
    lemmatizer = WordNetLemmatizer()
    stemmed_tokens = [stemmer.stem(token) for token in filtered_tokens]
    lemmatized_tokens = [
        lemmatizer.lemmatize(token, get_wordnet_pos(token)) for token in filtered_tokens
    ]

    # Get synonyms
    synonyms = []
    for word in filtered_tokens:
        word_synonyms = get_synonyms(word)
        if word_synonyms:
            synonyms.extend(word_synonyms)
    synonyms = list(set(synonyms))

    processed_tokens = [stemmer.stem(token) for token in synonyms]
    # Combine stemmed tokens, lemmatized tokens, and synonyms
    tokens = set(stemmed_tokens + lemmatized_tokens + processed_tokens)

    # Join the tokens into a single string
    processed_text = " ".join(tokens)

    return processed_text


def csv_open(file_name):
    try:
        with open(file_name, "r") as csv_file:
            csv_reader = csv.reader(csv_file)
            next(csv_reader)  # Skip header row
            data = [row for row in csv_reader]
            return data
    except FileNotFoundError:
        raise FileNotFoundError(f"File '{file_name}' not found.")
    except IOError:
        raise IOError(f"Error reading file '{file_name}'.")


class Topic:
    def __init__(self, name, keywords):
        self.name = name
        self.keywords = keywords

        self.dic = {}
        allDictionaries.append(self.dic)
        self.tablename = ""

    # make table function
    # make dictionary function

    def refresh_dictionary(self):
        allDictionaries.remove(self.dic)
        self.dic = {}
        allDictionaries.append(self.dic)

    def add_keywords(self, words):
        for word in words.split(" "):
            if word not in self.keywords:
                self.keywords = self.keywords + " " + word

    def make_table(self, table_name, path):
        c.execute(f"DROP TABLE IF EXISTS {table_name}")
        c.execute(
            f"""CREATE TABLE {table_name}
             (column1 serial_no, column2 Laws)"""
        )
        for row in csv_open(path):
            c.execute(f"INSERT INTO {table_name}  VALUES (?,?)", row)
        conn.commit()  # Commit the changes to the database
        allTables.append(table_name)
        self.tablename = table_name

    def getTable(self):
        return self.tablename


def makeTopic(name, keywords, tablename, path):
    thisTopic = Topic(name, keywords)
    if thisTopic not in Topics:
        thisTopic.make_table(tablename, path)
        Topics.append(thisTopic)


makeTopic('Rape', 'blackmail forceful martial marriage force forced sexual sex violent harassment harassed harass consensual sexual assault violence consent survivor trauma victim assault support rape crisis prosecution safety abuse fear trust pain hurt assault', 'rapeTable', 'rape.csv')
makeTopic('Gender Discrimination', 'inheritance paid male female colleagues blackmail forced discrimination inequality bias equal rights workplace pay gap salary money glass ceiling promotion job opportunity violence harassment protection equal equality education women girl boy woman sister mother empowerment feminism policies challenge societal norms societal society pressure gender stereotype man', 'genderDiscriminationTable', 'genderdiscrimination.csv')
makeTopic('Sexual Abuse', 'black mail blackmail forceful domestic forced force sex sexual violent violence consensual harassed harass abuse molestation harassment consent survivor trauma victim grooming assault boundaries assault evidence safety protection trust', 'sexualAbuseTable', 'sexualharrasment.csv')
makeTopic('Marriage', 'black mail blackmail forceful marriage laws marital rights divorce dowry domestic violence violent consent marriage age marital rape consent consensual property alimony legal obligation dowry registration annulment divorce custody haq mehar haqmehar family culture practice expectation', 'marriageTable', 'marriage.csv')
makeTopic('Education', 'forced education rights access equality opportunity school college university scholarship discrimination gender bias enrollment curriculum training empowerment career skill student teacher parent parents family girl boy father mother brother husband resource challenge aspiration dream knowledge', 'educationTable', 'education.csv')

conn.commit()


def processOneTable(tablename):
    proc = "processed"
    processedTable = []
    table = tablename
    tableRows = c.execute(f"SELECT * from  {table} ")
    rows = c.fetchall()
    processedTableName = proc + table

    for row in rows:

        serial_no = row[0]
        law = row[1]
        processed_law = token_punctutation_stopwords_stem_lemmatize_synonyms(
            law)
        processed_row = (serial_no, processed_law)
        processedTable.append(processed_row)
        c.execute(f"DROP TABLE IF EXISTS {processedTableName}")
        c.execute(f'''CREATE TABLE {processedTableName}
                    (column1 serial_no, column2 ProcessedLaws)''')
        for row in processedTable:
            c.execute(f"INSERT INTO {processedTableName} VALUES (?, ?)", row)

    Tables[table] = processedTableName


def add_laws(csv_file):
    with open(csv_file, "r") as f:
        reader = csv.reader(f)
        topicEffected = []
        x = 1

        # loop over rows in csv
        for row in reader:
            tablename = row[0]
            law = row[1]

            # check if topic table exists
            c.execute(
                f"SELECT name FROM sqlite_master WHERE type='table' AND name='{tablename}'"
            )
            result = c.fetchone()

            # create topic table if it doesn't exist
            if not result:
                c.execute(
                    f"CREATE TABLE {tablename} (id INTEGER PRIMARY KEY, law TEXT)"
                )

            # check if law already exists in topic table
            c.execute(
                f"SELECT EXISTS(SELECT 1 FROM {tablename} WHERE column2 = ?)", (law,)
            )
            result = c.fetchone()[0]

            # insert law into topic table if it doesn't exist
            if not result:
                num_rows = (
                    c.execute(
                        f"SELECT COUNT(*) FROM {tablename}").fetchone()[0] + 1
                )
                c.execute(
                    f"INSERT INTO {tablename} VALUES (?,?)", (num_rows, law))
                if tablename not in topicEffected:
                    topicEffected.append(tablename)
            x = x + 1

        if len(topicEffected) > 0:
            print("out of %d rows %d table were effected" %
                  (x, len(topicEffected)))
            for topic in Topics:
                if topic.getTable() in topicEffected:
                    topic.refresh_dictionary()
                    processOneTable(topic.getTable())

    conn.commit()  # commit changes and close connection


def processTables():
    for topic in Topics:
        proc = "processed"
        processedTable = []
        table = topic.getTable()
        tableRows = c.execute(f"SELECT * from  {table} ")
        rows = c.fetchall()
        processedTableName = proc + table

        for row in rows:
            serial_no = row[0]
            law = row[1]
            processed_law = token_punctutation_stopwords_stem_lemmatize_synonyms(
                law)
            processed_row = (serial_no, processed_law)
            processedTable.append(processed_row)
            c.execute(f"DROP TABLE IF EXISTS {processedTableName}")
            c.execute(
                f"""CREATE TABLE {processedTableName}
                    (column1 serial_no, column2 ProcessedLaws)"""
            )
            for row in processedTable:
                c.execute(
                    f"INSERT INTO {processedTableName} VALUES (?, ?)", row)

        Tables[table] = processedTableName
    conn.commit()  # Commit the changes to the database


processTables()


def matchKeywords(prompt):
    applicableTables = []
    applicableDictionaries = []
    topicnames = []
    anyTableFound = 0
    prompt_words = set(prompt.split(" "))

    for topic in Topics:

        keywords = set(topic.keywords.split(" "))

        common_words = prompt_words.intersection(keywords)
        common_percentage = (len(common_words) / len(prompt_words)) * 100

        if (common_percentage > 0):

            topicnames.append(topic.name)
            tablename = topic.getTable()
            dictionaryname = topic.dic
            applicableTables.append(tablename)
            applicableDictionaries.append(dictionaryname)
            applicableItems = [topicnames,
                               applicableTables, applicableDictionaries]
            anyTableFound = 1
            # worse case left

    if (anyTableFound == 0):
        topicnames = ["..."]
        applicableItems = [topicnames, allTables, allDictionaries]
    return applicableItems


def matchLaws(prompt):
    applicable_laws = []
    to_sort_laws = []
    laws_with_percentage = []
    applicableItems = matchKeywords(prompt)
    applicableTopics = applicableItems[0]
    applicableTables = applicableItems[1]
    processed_law_matched = []
    found_first_case = 0
    first_case = []
    found_second_case = 0
    second_case = []
    found_third_case = 0
    third_case = []
    found_fourth_case = 0
    fourth_case = []
    found_fifth_case = 0
    fith_case = []
    applicableDictionaries = applicableItems[2]
    dont_go = False
    prompt_words = set(prompt.split(" "))
    lawfound = 0
    conn = sqlite3.connect("databaseoflaws.db")
    c = conn.cursor()

    for dic in applicableDictionaries:
        if len(dic) > 0:
            for existingprompt in dic:

                existingprompt_words = set(existingprompt.split(" "))
                common_words = prompt_words.intersection(existingprompt_words)
                common_percentage = (len(common_words) /
                                     len(prompt_words)) * 100
                if (existingprompt_words == prompt_words and dic[existingprompt] is not None):

                    applicable_laws = dic[prompt]
                    lawfound = 1
                    break

    if (lawfound == 0 and applicableTopics[0] != "..."):
        dont_go = True
        for table_name in applicableTables:
            processedTable = Tables[table_name]

            c.execute(f"SELECT * FROM {processedTable} ")
            rowss = c.fetchall()

            for row in rowss:

                serial_no = row[0]
                processed_law = row[1]

                law_words = set(processed_law.split(" "))

                common_words = prompt_words.intersection(law_words)

                common_percentage = (len(common_words) /
                                     len(prompt_words)) * 100

                if (common_percentage >= 30 and processed_law not in processed_law_matched):

                    c.execute(
                        f"SELECT column2 from {table_name} WHERE column1 =?", (serial_no,))
                    law = c.fetchone()[0]

                    processed_law_matched.append(processed_law)
                    first_case.append((law, common_percentage))
                    found_first_case = found_first_case+1

                elif (common_percentage < 30 and common_percentage >= 20 and processed_law not in processed_law_matched):

                    c.execute(
                        f"SELECT column2 from {table_name} WHERE column1 =?", (serial_no,))
                    law = c.fetchone()[0]

                    processed_law_matched.append(processed_law)
                    second_case.append((law, common_percentage))
                    found_second_case = found_second_case+1

                elif (common_percentage < 20 and common_percentage >= 10 and processed_law not in processed_law_matched):

                    c.execute(
                        f"SELECT column2 from {table_name} WHERE column1 =?", (serial_no,))
                    law = c.fetchone()[0]

                    processed_law_matched.append(processed_law)
                    third_case.append((law, common_percentage))
                    found_third_case = found_second_case+1

                elif (common_percentage < 10 and common_percentage >= 1 and processed_law not in processed_law_matched):

                    c.execute(
                        f"SELECT column2 from {table_name} WHERE column1 =?", (serial_no,))
                    law = c.fetchone()[0]

                    processed_law_matched.append(processed_law)
                    fourth_case.append((law, common_percentage))
                    found_fourth_case = found_fourth_case+1

            if (found_first_case >= 2):

                laws_with_percentage = first_case

            elif (found_second_case > 0 and found_first_case < 2):

                second_case.sort(key=lambda x: x[1], reverse=True)
                laws_with_percentage = first_case + second_case

            elif (found_third_case > 0 and found_first_case < 2 and found_second_case < 2):

                third_case.sort(key=lambda x: x[1], reverse=True)
                laws_with_percentage = first_case + second_case + third_case

            elif (found_fourth_case > 0 and len(laws_with_percentage) == 0):
                fourth_case.sort(key=lambda x: x[1], reverse=True)
                laws_with_percentage = first_case + second_case + third_case + fourth_case

            laws_with_percentage.sort(key=lambda x: x[1], reverse=True)

            applicable_laws = [law for law, _ in laws_with_percentage]
            if len(applicable_laws) > 0:
                for topic in Topics:
                    if topic.getTable() == table_name:
                        dic = topic.dic
                        dic[prompt] = applicable_laws

    elif (dont_go == False and lawfound == 0 and applicableTopics[0] == "..."):

        for table_name in applicableTables:
            processedTable = Tables[table_name]

            c.execute(f"SELECT * FROM {processedTable} ")
            rowss = c.fetchall()

            for row in rowss:

                serial_no = row[0]
                processed_law = row[1]

                law_words = set(processed_law.split(" "))
                common_words = prompt_words.intersection(law_words)

                common_percentage = (len(common_words) /
                                     len(prompt_words)) * 100

                if (common_percentage >= 50 and processed_law not in processed_law_matched):

                    c.execute(
                        f"SELECT column2 from {table_name} WHERE column1 =?", (serial_no,))
                    law = c.fetchone()[0]

                    processed_law_matched.append(processed_law)
                    first_case.append((law, common_percentage))
                    found_first_case = found_first_case+1

                elif (common_percentage < 50 and common_percentage >= 40 and processed_law not in processed_law_matched):

                    c.execute(
                        f"SELECT column2 from {table_name} WHERE column1 =?", (serial_no,))
                    law = c.fetchone()[0]

                    processed_law_matched.append(processed_law)
                    second_case.append((law, common_percentage))
                    found_second_case = found_second_case+1

                elif (common_percentage < 40 and common_percentage >= 30 and processed_law not in processed_law_matched):

                    c.execute(
                        f"SELECT column2 from {table_name} WHERE column1 =?", (serial_no,))
                    law = c.fetchone()[0]

                    processed_law_matched.append(processed_law)
                    third_case.append((law, common_percentage))
                    found_third_case = found_second_case+1

                elif (common_percentage < 30 and common_percentage >= 5 and processed_law not in processed_law_matched):

                    c.execute(
                        f"SELECT column2 from {table_name} WHERE column1 =?", (serial_no,))
                    law = c.fetchone()[0]

                    processed_law_matched.append(processed_law)
                    fourth_case.append((law, common_percentage))
                    found_fourth_case = found_fourth_case+1

            if (found_first_case >= 2):

                laws_with_percentage = first_case

            elif (found_second_case > 0 and found_first_case < 2):

                second_case.sort(key=lambda x: x[1], reverse=True)
                laws_with_percentage = first_case + second_case

            elif (found_third_case > 0 and found_first_case < 2 and found_second_case < 2):

                third_case.sort(key=lambda x: x[1], reverse=True)
                laws_with_percentage = first_case + second_case + third_case

            elif (found_fourth_case > 0 and len(laws_with_percentage) == 0):
                fourth_case.sort(key=lambda x: x[1], reverse=True)
                laws_with_percentage = first_case + second_case + third_case + fourth_case

            laws_with_percentage.sort(key=lambda x: x[1], reverse=True)

            applicable_laws = [law for law, _ in laws_with_percentage]
            if len(applicable_laws) > 0:
                for topic in Topics:
                    if topic.getTable() == table_name:
                        dic = topic.dic
                        dic[prompt] = applicable_laws

    return (applicable_laws)


def detect_language(text):
    try:
        language = detect(text)
        return language
    except:
        return None


def translate_words(original_lan, wanted_lan, text):
    translator = Translator(from_lang=original_lan, to_lang=wanted_lan)
    translation = translator.translate(text)

    return translation


def sort_laws(prompt, applicablelaws):
    sorted_laws = []
    prompt_words = set(prompt.split(" "))
    punctuation = re.compile(r'[-.?!,:;()|0-9]')
    prompt_words = [punctuation.sub("", word)
                    for word in prompt_words if len(word) > 0]
    stop_words = set(stopwords.words('english'))
    prompt_words = [token for token in prompt_words if token not in stop_words]
    prompt_words = set(prompt_words)

    for law in applicablelaws:
        law_words = set(law.split(" "))
        law_words = [punctuation.sub("", word)
                     for word in law_words if len(word) > 0]
        law_words = set(law_words)
        law_words = [token for token in law_words if token not in stop_words]
        law_words = set(law_words)
        common_words = prompt_words.intersection(law_words)
        common_percentage = (len(common_words) / len(prompt_words)) * 100

        sorted_laws.append((law, common_percentage))

    sorted_laws.sort(key=lambda x: x[1], reverse=True)

    sorted_applicable_laws = [law for law, _ in sorted_laws]

    return (sorted_applicable_laws)


def get_applicable_topics(prompt):
    lan = detect_language(prompt)

    if lan == "ur":
        prompt = translate_words(lan, "en", prompt)

    if len(prompt) > 0:
        processedprompt = token_punctutation_stopwords_stem_lemmatize_synonyms(
            prompt)
        applicableItems = matchKeywords(processedprompt)
        applicableTopics = set(applicableItems[0])

        applicableTopicsString = "-".join(applicableTopics)

        return applicableTopicsString
    else:
        return "Prompt Length was too short to determine"


def process_prompt(prompt):
    if len(prompt) > 1:
        lan = detect_language(prompt)
        start = time.time()
        if lan == "ur":
            prompt = translate_words(lan, "en", prompt)

        processedprompt = token_punctutation_stopwords_stem_lemmatize_synonyms(
            prompt)

        applicablelaws = matchLaws(processedprompt)
        if len(applicablelaws) > 3:
            laws = sort_laws(prompt, applicablelaws)
        else:
            laws = applicablelaws
        end = time.time()

        if len(laws) > 0:
            return (laws)
        else:
            return ["No Laws Found, maybe try again?"]

    else:
        return ["Input prompt too short, maybe try again?"]


def refresh_dictionaries():

    for topic in Topics:
        topic.refresh_dictionary()
