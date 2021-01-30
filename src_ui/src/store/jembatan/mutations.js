export function cameraMutation (state, cam) {
  state.camera = cam
}

export function sensorMutation (state, payload) {
  state.sensor = payload
}

export function sensorOfflineMutation (state) {
  state.sensor = {
    sinyal: 'offline',
    acc: 0,
    strain1: 0,
    strain2: 0
  }
}
