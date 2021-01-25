import * as BABYLON from 'babylonjs'

export default {
  name: 'ComponentJembatan',
  data () {
    return {
      motor: null
    }
  },
  mounted () {
    const canvas = this.$refs.jembatan
    const engine = new BABYLON.Engine(
      canvas,
      true,
      {
        preserveDrawingBuffer: true,
        audioEngine: false,
        stencil: true
      },
      true
    )

    this.motor = engine

    const createScene = function () {
      const scene = new BABYLON.Scene(engine)
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)

      const camera = new BABYLON.ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        4,
        new BABYLON.Vector3(0, 0, 0),
        scene
      )

      camera.attachControl(canvas, true)

      // eslint-disable-next-line no-unused-vars
      const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene
      )

      const box = BABYLON.MeshBuilder.CreateBox('box', {})
      const boxMaterial = new BABYLON.StandardMaterial('boxMat', scene)
      boxMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5)
      boxMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1)

      box.material = boxMaterial

      return scene
    }

    const scene = createScene()

    engine.runRenderLoop(function () {
      scene.render()
    })
  },
  methods: {
    onResize () {
      if (this.motor) {
        this.motor.resize()
      }
    }
  }
}
