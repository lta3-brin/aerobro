import pandas as pd
from dask import dataframe as dd


class ConvertService:
    @staticmethod
    def get_displacement(payloads, freq):
        df = pd.DataFrame(
            data=payloads,
            columns=[
                'id', 'station', 'logdate', 'logtime', 'intv', 'pwr', 'memory', 'logdt', 'ai22_1', 'refvoltage',
                'shuntresistor', 'offsettrd', 'slopetrd', 'sensor_dist', 'receiveddt', 'ai22_2', 'shuntresistor2',
                'offsettrd2', 'slopetrd2', 'sensor_dist2', 'ai22_3', 'shuntresistor3', 'offsettrd3', 'slopetrd3',
                'sensor_dist3', 'ai22_4', 'shuntresistor4', 'offsettrd4', 'slopetrd4', 'sensor_dist4', 'pwr2',
                'refvoltage2', 'straing_1', 'straing_2', 'straing_3', 'straing_4', 'an_5', 'acc_x', 'acc_y', 'acc_z'
            ]
        )

        df = dd.from_pandas(df, npartitions=3)

        df['i1'] = df[['ai22_1', 'refvoltage', 'shuntresistor']].apply(
            lambda row: row[0] / (2 ** 17) * row[1] / row[2] * 100 * 1000,
            axis=1,
            meta=(None, 'float64')
        )

        df['delta1'] = df[['i1', 'offsettrd']].apply(
            lambda row: row[0] - row[1],
            axis=1,
            meta=(None, 'float64')
        )

        df['displ1'] = df[['delta1', 'slopetrd']].apply(
            lambda row: row[0] * row[1] / 1000 / 100,
            axis=1,
            meta=(None, 'float64')
        )

        df['i2'] = df[['ai22_2', 'refvoltage', 'shuntresistor2']].apply(
            lambda row: row[0] / (2 ** 17) * row[1] / row[2] * 100 * 1000,
            axis=1,
            meta=(None, 'float64')
        )

        df['delta2'] = df[['i2', 'offsettrd2']].apply(
            lambda row: row[0] - row[1],
            axis=1,
            meta=(None, 'float64')
        )

        df['displ2'] = df[['delta2', 'slopetrd2']].apply(
            lambda row: row[0] * row[1] / 1000 / 100,
            axis=1,
            meta=(None, 'float64')
        )

        df = df[['logdt', 'displ1', 'displ2']]
        df = df.set_index('logdt')
        df = df.resample(freq).max().compute()
        df = df.reset_index()

        return df.to_json(orient='records', date_format='iso')
