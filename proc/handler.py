import pandas as pd
from datetime import datetime
import numpy as np

np.random.seed(101)


def calc_data(when):
    from proc.helper import acc_status, displ_status, strn_status

    date_rng = pd.date_range(start='1/1/2018', end='1/12/2021', freq='H')
    df = pd.DataFrame(date_rng, columns=['date'])
    df["Acceleration"] = np.random.default_rng().uniform(0.1, 1.0, len(date_rng))
    df["Displacement"] = np.random.default_rng().uniform(1.0, 5.0, len(date_rng))
    df["Strain"] = np.random.default_rng().uniform(0.01, 0.1, len(date_rng))

    df["acc_status"] = df[['Acceleration']].apply(lambda x: acc_status(x[0]), axis=1)
    df["displ_status"] = df[['Displacement']].apply(lambda x: displ_status(x[0]), axis=1)
    df["strn_status"] = df[['Strain']].apply(lambda x: strn_status(x[0]), axis=1)

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

    else:
        print("Proses data dilakukan diluar waktu yang diperlukan.")
