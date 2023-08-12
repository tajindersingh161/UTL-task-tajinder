import pandas as pd
import mysql.connector

# MySQL database connection settings
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "interactivebooksearch"
}

# CSV file path
csv_file_path = "H:\\books.csv"

# Read CSV data using pandas
csv_data = pd.read_csv(csv_file_path)

# Establish MySQL database connection
connection = mysql.connector.connect(**db_config)
cursor = connection.cursor()

# Iterate through the CSV data and insert into the 'books' table
for index, row in csv_data.iterrows():
    query = "INSERT INTO books (ISBN, TITLE, AUTHOR_FIRST_NAME, AUTHOR_LAST_NAME, GENRE, PUBLISHED_DATE) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (row['ISBN'], row['TITLE'], row['AUTHOR FIRST NAME'], row['AUTHOR LAST NAME'], row['GENRE'], row['PUBLISHED DATE'])
    
    cursor.execute(query, values)
    connection.commit()

# Close the database connection
cursor.close()
connection.close()

print("CSV data imported into 'books' table successfully!")
