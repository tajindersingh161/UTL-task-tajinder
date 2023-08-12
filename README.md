# UTL-task-tajinder

**Part-1 (Database Setup)**

1.	Created the database using MySQL on my local database server (phpMyAdmin).
Query used to create the database:

“CREATE DATABASE interactivebooksearch”

3.	Created a table “books” in the same database using the below schema.
CREATE TABLE books (
    ISBN VARCHAR(15),
    TITLE VARCHAR(100),
    AUTHOR_FIRST_NAME VARCHAR(50),
    AUTHOR_LAST_NAME VARCHAR(50),
    GENRE VARCHAR(50),
    PUBLISHED_DATE DATE
);

**Part-2 (Data Injection and SQL Queries)**
1.	Wrote the below python script to import the data from the csv file to the “books” table on the local server. The name of my local script is “script_new.py” and     I installed python to run this script. 
    Note: If you want to run the below script in python you have to change the csv_file_path “H:\\books.csv” according to your system. Also update “user” and       
    “password” according to your localhost.

**Python Script**
----------------------------------------------------------------------------------------------------------------------------------

```python
import pandas as pd
import mysql.connector

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "interactivebooksearch"
}

csv_file_path = "H:\\books.csv"
csv_data = pd.read_csv(csv_file_path)
connection = mysql.connector.connect(**db_config)
cursor = connection.cursor()
for index, row in csv_data.iterrows():
    query = "INSERT INTO books (ISBN, TITLE, AUTHOR_FIRST_NAME, AUTHOR_LAST_NAME, GENRE, PUBLISHED_DATE) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (row['ISBN'], row['TITLE'], row['AUTHOR FIRST NAME'], row['AUTHOR LAST NAME'], row['GENRE'], row['PUBLISHED DATE'])
    
    cursor.execute(query, values)
    connection.commit()
cursor.close()
connection.close()

print("CSV data imported into 'books' table successfully!")

---------------------------------------------------------------------------------------------------------------------------------------------------------

**2.	 (Find the oldest book for each author)** – 

SELECT AUTHOR_FIRST_NAME, AUTHOR_LAST_NAME, MIN(PUBLISHED_DATE) AS oldest_book_date
FROM books GROUP BY AUTHOR_FIRST_NAME, AUTHOR_LAST_NAME; 

**3. Find the authors who have written the most books in each genre.**

SELECT genre_stats.GENRE, genre_stats.AUTHOR_FIRST_NAME, genre_stats.AUTHOR_LAST_NAME, genre_stats.book_count
FROM (
    SELECT b.GENRE, b.AUTHOR_FIRST_NAME, b.AUTHOR_LAST_NAME, COUNT(distinct ISBN) AS book_count,
           RANK() OVER (PARTITION BY b.GENRE ORDER BY COUNT(*) DESC) AS rank
    FROM books b
    GROUP BY b.GENRE, b.AUTHOR_FIRST_NAME, b.AUTHOR_LAST_NAME
) genre_stats WHERE genre_stats.rank = 1;

**4. Calculate the total number of books published each year and display the results by year**

SELECT YEAR(PUBLISHED_DATE) AS publication_year, COUNT(distinct ISBN) AS book_count
FROM books
GROUP BY YEAR(PUBLISHED_DATE)
ORDER BY publication_year;

------------------------------------------------------------------------------------------------------------------------------

**Part - 3 ( I have used option 2 (Open Library API) to display the data in the application. Unzip the "UTL-Task3" folder and run the index file**.


