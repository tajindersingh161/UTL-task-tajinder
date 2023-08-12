# UTL-task-tajinder

Please see screenshots [here](https://github.com/tajindersingh161/UTL-task-tajinder/blob/69ec1cf40dc78640074afba63dd2e4f973b4e4e3/Output%20Screenshots-%20Interactive%20Book%20Search%20Part1-2%20plus%20documentation.pdf)

### Part-1: Database Setup

1.	I have used local MySQL installation and created the database using phpMyAdmin.
Query used to create the database:

```sql
CREATE DATABASE interactivebooksearch;
```

2.	Created a table “books” in the same database using the below schema.
```sql
CREATE TABLE books (
    ISBN VARCHAR(15),
    TITLE VARCHAR(100),
    AUTHOR_FIRST_NAME VARCHAR(50),
    AUTHOR_LAST_NAME VARCHAR(50),
    GENRE VARCHAR(50),
    PUBLISHED_DATE DATE
);
```

### Part-2: Data Injection and SQL Queries

##### Option 1	
Wrote the below python script to import the data from the CSV file to the “books” table on the local server. The name of my local script is “script_new.py” and I installed python to run this script. 
    Note: If you want to run the below script in python you have to change the csv_file_path “H:\\books.csv” according to your system. Also update “user” and       
    “password” according to your localhost.

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
```

##### Option 2
MySQL Query to insert data into table from local file
NOTE: you have to change the path of the CSV file according to your system- like I have kept the file in the "H:\\books.csv"

```sql
LOAD DATA INFILE 'H:\\books.csv'
INTO TABLE books
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

#### 1. Find the oldest book for each author 
```sql
SELECT AUTHOR_FIRST_NAME, AUTHOR_LAST_NAME, MIN(PUBLISHED_DATE) AS oldest_book_date
FROM books GROUP BY AUTHOR_FIRST_NAME, AUTHOR_LAST_NAME;
```

#### 2. Find the authors who have written the most books in each genre
```sql
SELECT genre_stats.GENRE, genre_stats.AUTHOR_FIRST_NAME, genre_stats.AUTHOR_LAST_NAME, genre_stats.book_count
FROM (
    SELECT b.GENRE, b.AUTHOR_FIRST_NAME, b.AUTHOR_LAST_NAME, COUNT(distinct ISBN) AS book_count,
           RANK() OVER (PARTITION BY b.GENRE ORDER BY COUNT(*) DESC) AS rank
    FROM books b
    GROUP BY b.GENRE, b.AUTHOR_FIRST_NAME, b.AUTHOR_LAST_NAME
) genre_stats WHERE genre_stats.rank = 1;
```

#### 3. Calculate the total number of books published each year and display the results by year
```sql
SELECT YEAR(PUBLISHED_DATE) AS publication_year, COUNT(distinct ISBN) AS book_count
FROM books
GROUP BY YEAR(PUBLISHED_DATE)
ORDER BY publication_year;
```

### Part-3: User-Friendly Book Search Interface
I have used option 2 (Open Library API) to display the data in the application. Unzip the "UTL-Task3" folder and run the index file.

