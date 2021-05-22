def calc_data(when):
    from proc.helper import (
        acc_status,
        displ_status,
        strn_status,
        connect_pg,
        pg_to_df,
        df_to_pg
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
        df_to_pg(conn, df_acc, "acc_daily")

        df_displ = df.groupby([
            df["date"].dt.to_period("D"),
            df["displ_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_displ, "displ_daily")

        df_strn = df.groupby([
            df["date"].dt.to_period("D"),
            df["strn_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_strn, "strn_daily")

    elif when == "weekly":
        df_acc = df.groupby([
            df["date"].dt.to_period("W"),
            df["acc_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_acc, "acc_weekly")

        df_displ = df.groupby([
            df["date"].dt.to_period("W"),
            df["displ_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_displ, "displ_weekly")

        df_strn = df.groupby([
            df["date"].dt.to_period("W"),
            df["strn_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_strn, "strn_weekly")

    elif when == "monthly":
        df_acc = df.groupby([
            df["date"].dt.to_period("M"),
            df["acc_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_acc, "acc_monthly")

        df_displ = df.groupby([
            df["date"].dt.to_period("M"),
            df["displ_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_displ, "displ_monthly")

        df_strn = df.groupby([
            df["date"].dt.to_period("M"),
            df["strn_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_strn, "strn_monthly")

    elif when == "yearly":
        df_acc = df.groupby([
            df["date"].dt.to_period("Y"),
            df["acc_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_acc, "acc_yearly")

        df_displ = df.groupby([
            df["date"].dt.to_period("Y"),
            df["displ_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_displ, "displ_yearly")

        df_strn = df.groupby([
            df["date"].dt.to_period("Y"),
            df["strn_status"]
        ]).size().reset_index(name="count")
        df_to_pg(conn, df_strn, "strn_yearly")

    else:
        print("Proses data dilakukan diluar waktu yang diperlukan.")
