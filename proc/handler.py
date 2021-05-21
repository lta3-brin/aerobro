def calc_data(when):
    from proc.helper import (
        acc_status,
        displ_status,
        strn_status,
        connect_pg,
        pg_to_df
    )

    conn = connect_pg()
    df = pg_to_df(conn, "SELECT * FROM sensor", ["id", "date", "acceleration", "displacement", "strain"])
    df = df.set_index("id")

    df["acc_status"] = df[['acceleration']].apply(lambda x: acc_status(x[0]), axis=1)
    df["displ_status"] = df[['displacement']].apply(lambda x: displ_status(x[0]), axis=1)
    df["strn_status"] = df[['strain']].apply(lambda x: strn_status(x[0]), axis=1)

    if when == "daily":
        df_acc = df.groupby([
            df["date"].dt.to_period("D"),
            df["acc_status"]
        ]).size().reset_index(name="count")
        print(df_acc)

        df_displ = df.groupby([
            df["date"].dt.to_period("D"),
            df["displ_status"]
        ]).size().reset_index(name="count")
        print(df_displ)

        df_strn = df.groupby([
            df["date"].dt.to_period("D"),
            df["strn_status"]
        ]).size().reset_index(name="count")
        print(df_strn)

    elif when == "weekly":
        df_acc = df.groupby([
            df["date"].dt.to_period("W"),
            df["acc_status"]
        ]).size().reset_index(name="count")
        print(df_acc)

        df_displ = df.groupby([
            df["date"].dt.to_period("W"),
            df["displ_status"]
        ]).size().reset_index(name="count")
        print(df_displ)

        df_strn = df.groupby([
            df["date"].dt.to_period("W"),
            df["strn_status"]
        ]).size().reset_index(name="count")
        print(df_strn)

    elif when == "monthly":
        df_acc = df.groupby([
            df["date"].dt.to_period("M"),
            df["acc_status"]
        ]).size().reset_index(name="count")
        print(df_acc)

        df_displ = df.groupby([
            df["date"].dt.to_period("M"),
            df["displ_status"]
        ]).size().reset_index(name="count")
        print(df_displ)

        df_strn = df.groupby([
            df["date"].dt.to_period("M"),
            df["strn_status"]
        ]).size().reset_index(name="count")
        print(df_strn)

    elif when == "yearly":
        df_acc = df.groupby([
            df["date"].dt.to_period("Y"),
            df["acc_status"]
        ]).size().reset_index(name="count")
        print(df_acc)

        df_displ = df.groupby([
            df["date"].dt.to_period("Y"),
            df["displ_status"]
        ]).size().reset_index(name="count")
        print(df_displ)

        df_strn = df.groupby([
            df["date"].dt.to_period("Y"),
            df["strn_status"]
        ]).size().reset_index(name="count")
        print(df_strn)

    else:
        print("Proses data dilakukan diluar waktu yang diperlukan.")
