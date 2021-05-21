import sys
import psycopg2
import pandas as pd
from os import getenv
from io import StringIO


def acc_status(a_):
    acc_min = getenv("ACC_THRESHOLD_MIN")
    acc_max = getenv("ACC_THRESHOLD_MAX")

    if a_ <= float(acc_min):
        return 0
    elif float(acc_min) < a_ <= float(acc_max):
        return 1
    elif a_ > float(acc_max):
        return 2
    else:
        return -1


def displ_status(a_):
    displ_min = getenv("DISPL_THRESHOLD_MIN")
    displ_max = getenv("DISPL_THRESHOLD_MAX")

    if a_ <= float(displ_min):
        return 0
    elif float(displ_min) < a_ <= float(displ_max):
        return 1
    elif a_ > float(displ_max):
        return 2
    else:
        return -1


def strn_status(a_):
    strain_min = getenv("STRAIN_THRESHOLD_MIN")
    strain_max = getenv("STRAIN_THRESHOLD_MAX")

    if a_ <= float(strain_min):
        return 0
    elif float(strain_min) < a_ <= float(strain_max):
        return 1
    elif a_ > float(strain_max):
        return 2
    else:
        return -1


def connect_pg():
    try:
        print('Mencoba terhubung dengan database PostgreSQL...')

        conn = psycopg2.connect(
            host=getenv("DB_HOST"),
            port=getenv("DB_PORT"),
            database=getenv("DB_NAME"),
            user=getenv("DB_USER"),
            password=getenv("DB_PASSWORD")
        )

        print("Koneksi berhasil...")

        return conn
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        sys.exit(1)


def df_to_pg(conn, df, table):
    buffer = StringIO()
    df.to_csv(buffer, index_label='id', header=False)
    buffer.seek(0)
    cursor = conn.cursor()

    try:
        cursor.copy_from(buffer, table, sep=",")
        conn.commit()
        cursor.close()

        print("Konversi berhasil dilakukan.")
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error: %s" % error)
        conn.rollback()
        cursor.close()

        return 1


def pg_to_df(conn, select_query, column_names):
    cursor = conn.cursor()
    try:
        cursor.execute(select_query)
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error: %s" % error)
        cursor.close()
        return 1

    tupples = cursor.fetchall()
    cursor.close()

    df = pd.DataFrame(tupples, columns=column_names)
    return df
