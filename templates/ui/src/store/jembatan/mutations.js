export function cameraMutation (state, cam) {
  state.camera = cam
}

export function sensorMutation (state, payload) {
  state.sensor = payload
}

export function setVersionMutation (state, version) {
  state.version = version
}
