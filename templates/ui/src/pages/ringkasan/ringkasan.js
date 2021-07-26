import Plotly from 'plotly.js-dist-min'
import { dataStats } from './data_stats'

export default {
  name: 'PageRingkasan',
  data () {
    return {
      config: {
        scrollZoom: false,
        displayModeBar: false,
        displaylogo: false,
        responsive: true
      },
      layout: {
        title: 'Statistik Harian',
        autosize: true,
        legend: { orientation: 'h', x: 0.8, y: -0.1 },
        xaxis: { type: 'date' }
      }
    }
  },
  mounted () {
    const DailyX = ['2018-01-01', '2018-01-02', '2018-01-03', '2018-01-04', '2018-01-05', '2018-01-06', '2018-01-07', '2018-01-08', '2018-01-09', '2018-01-10', '2018-01-11', '2018-01-12', '2018-01-13', '2018-01-14', '2018-01-15', '2018-01-16', '2018-01-17', '2018-01-18', '2018-01-19', '2018-01-20', '2018-01-21', '2018-01-22', '2018-01-23', '2018-01-24', '2018-01-25', '2018-01-26', '2018-01-27', '2018-01-28', '2018-01-29', '2018-01-30', '2018-01-31', '2018-02-01', '2018-02-02', '2018-02-03', '2018-02-04', '2018-02-05', '2018-02-06', '2018-02-07', '2018-02-08', '2018-02-09', '2018-02-10', '2018-02-11', '2018-02-12', '2018-02-13', '2018-02-14', '2018-02-15', '2018-02-16', '2018-02-17', '2018-02-18', '2018-02-19']
    const WeeklyX = ['2018-01-01/2018-01-07', '2018-01-08/2018-01-14', '2018-01-15/2018-01-21', '2018-01-22/2018-01-28', '2018-01-29/2018-02-04', '2018-02-05/2018-02-11', '2018-02-12/2018-02-18', '2018-02-19/2018-02-25', '2018-02-26/2018-03-04', '2018-03-05/2018-03-11', '2018-03-12/2018-03-18', '2018-03-19/2018-03-25', '2018-03-26/2018-04-01', '2018-04-02/2018-04-08', '2018-04-09/2018-04-15', '2018-04-16/2018-04-22', '2018-04-23/2018-04-29', '2018-04-30/2018-05-06', '2018-05-07/2018-05-13', '2018-05-14/2018-05-20', '2018-05-21/2018-05-27', '2018-05-28/2018-06-03', '2018-06-04/2018-06-10', '2018-06-11/2018-06-17', '2018-06-18/2018-06-24', '2018-06-25/2018-07-01', '2018-07-02/2018-07-08', '2018-07-09/2018-07-15', '2018-07-16/2018-07-22', '2018-07-23/2018-07-29', '2018-07-30/2018-08-05', '2018-08-06/2018-08-12', '2018-08-13/2018-08-19', '2018-08-20/2018-08-26', '2018-08-27/2018-09-02', '2018-09-03/2018-09-09', '2018-09-10/2018-09-16', '2018-09-17/2018-09-23', '2018-09-24/2018-09-30', '2018-10-01/2018-10-07', '2018-10-08/2018-10-14', '2018-10-15/2018-10-21', '2018-10-22/2018-10-28', '2018-10-29/2018-11-04', '2018-11-05/2018-11-11', '2018-11-12/2018-11-18', '2018-11-19/2018-11-25', '2018-11-26/2018-12-02', '2018-12-03/2018-12-09', '2018-12-10/2018-12-16']
    const MonthlyX = ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12', '2021-01']
    const YearlyX = ['2018', '2019', '2020', '2021']

    const accDailyRed = [5, 8, 8, 2, 11, 5, 7, 8, 10, 5, 5, 8, 11, 9, 10, 10, 11, 10, 7, 7, 11, 11, 8, 8, 7, 12, 5, 8, 9, 10, 12, 5, 11, 6, 9, 10, 10, 6, 4, 7, 5, 2, 8, 9, 10, 4, 5, 7, 10, 4]
    const accDailyOrange = [10, 10, 9, 12, 6, 10, 6, 7, 4, 12, 6, 7, 7, 8, 5, 4, 9, 5, 9, 9, 6, 6, 9, 11, 8, 6, 10, 5, 6, 5, 5, 10, 5, 8, 4, 8, 6, 11, 11, 14, 10, 16, 10, 9, 6, 9, 7, 11, 8, 5]
    const accDailyGreen = [9, 6, 7, 10, 7, 9, 11, 9, 10, 7, 13, 9, 6, 7, 9, 10, 4, 9, 8, 8, 7, 7, 7, 5, 9, 6, 9, 11, 9, 9, 7, 9, 8, 10, 11, 6, 8, 7, 9, 3, 9, 6, 6, 6, 8, 11, 12, 6, 6, 15]
    this.layout.title = 'Statistik Harian Akselerometer'
    Plotly.newPlot('plotharian', dataStats(DailyX, accDailyRed, accDailyOrange, accDailyGreen), this.layout, this.config)

    const accWeeklyRed = [59, 61, 55, 54, 63, 48, 55, 62, 47, 69, 50, 60, 52, 68, 48, 67, 70, 61, 43, 50, 62, 55, 54, 52, 55, 60, 52, 63, 60, 63, 64, 55, 54, 57, 52, 69, 50, 52, 57, 50, 62, 51, 51, 60, 55, 57, 55, 59, 66, 58]
    const accWeeklyOrange = [63, 51, 47, 55, 43, 76, 60, 50, 59, 52, 67, 60, 49, 52, 73, 47, 43, 56, 60, 54, 55, 53, 47, 57, 61, 56, 65, 55, 51, 50, 46, 62, 51, 43, 64, 51, 55, 58, 54, 63, 54, 59, 66, 56, 56, 57, 60, 58, 47, 62]
    const accWeeklyGreen = [46, 56, 66, 59, 62, 44, 53, 56, 62, 47, 51, 48, 67, 48, 47, 54, 55, 51, 65, 64, 51, 60, 67, 59, 52, 52, 51, 50, 57, 55, 58, 51, 63, 68, 52, 48, 63, 58, 57, 55, 52, 58, 51, 52, 57, 54, 53, 51, 55, 48]
    this.layout.title = 'Statistik Mingguan Akselerometer'
    this.layout.xaxis.type = 'category'
    this.layout.xaxis.tickangle = 25
    this.layout.legend.y = 1
    Plotly.newPlot('plotmingguan', dataStats(WeeklyX, accWeeklyRed, accWeeklyOrange, accWeeklyGreen), this.layout, this.config)

    const accMonthlyRed = [254, 221, 253, 267, 235, 240, 264, 252, 242, 240, 240, 268, 242, 227, 243, 250, 265, 241, 245, 237, 221, 262, 234, 230, 242, 222, 254, 242, 256, 223, 253, 253, 228, 249, 261, 256, 88]
    const accMonthlyOrange = [232, 239, 252, 235, 242, 240, 244, 231, 236, 268, 247, 238, 240, 236, 239, 237, 235, 228, 238, 262, 259, 233, 242, 251, 238, 229, 240, 240, 249, 237, 251, 246, 261, 271, 235, 245, 97]
    const accMonthlyGreen = [258, 212, 239, 218, 267, 240, 236, 261, 242, 236, 233, 238, 262, 209, 262, 233, 244, 251, 261, 245, 240, 249, 244, 263, 264, 245, 250, 238, 239, 260, 240, 245, 231, 224, 224, 243, 80]
    this.layout.title = 'Statistik Bulanan Akselerometer'
    this.layout.legend.y = 1
    Plotly.newPlot('plotbulanan', dataStats(MonthlyX, accMonthlyRed, accMonthlyOrange, accMonthlyGreen), this.layout, this.config)

    const accYearlyRed = [2976, 2897, 2939, 88]
    const accYearlyOrange = [2904, 2900, 2942, 97]
    const accYearlyGreen = [2880, 2963, 2903, 80]
    this.layout.title = 'Statistik Tahunan Akselerometer'
    Plotly.newPlot('plottahunan', dataStats(YearlyX, accYearlyRed, accYearlyOrange, accYearlyGreen), this.layout, this.config)
  }
}