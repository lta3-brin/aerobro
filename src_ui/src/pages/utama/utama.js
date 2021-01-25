import * as BABYLON from 'babylonjs'

export default {
  name: 'PageIndex',
  mounted () {
    const canvas = this.$refs.jembatan
    const engine = new BABYLON.Engine(
      canvas,
      true,
      { preserveDrawingBuffer: true, stencil: true }
    )

    const createScene = function () {
      const scene = new BABYLON.Scene(engine)

      scene.clearColor = BABYLON.Color3.White()

      const camera = new BABYLON.ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        new BABYLON.Vector3(0, 0, 0)
      )

      camera.attachControl(canvas, true)

      // eslint-disable-next-line no-unused-vars
      const sphere = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0)
      )

      // eslint-disable-next-line no-unused-vars
      const box = BABYLON.MeshBuilder.CreateBox('box', {})

      return scene
    }

    const scene = createScene()

    engine.runRenderLoop(function () {
      scene.render()
    })
  },
  methods: {
    onResize (size) {
      console.log(size)
    }
  }
}
