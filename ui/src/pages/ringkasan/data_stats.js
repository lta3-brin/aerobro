export const dataStats = (x, yRed, yOrange, yGreen) => {
  const trace1 = {
    x,
    y: yRed,
    name: 'Bahaya',
    type: 'bar',
    marker: {
      color: 'red'
    }
  }

  const trace2 = {
    x,
    y: yOrange,
    name: 'Peringatan',
    type: 'bar',
    marker: {
      color: 'orange'
    }
  }

  const trace3 = {
    x,
    y: yGreen,
    name: 'Aman',
    type: 'bar',
    marker: {
      color: 'green'
    }
  }

  return [trace1, trace2, trace3]
}
