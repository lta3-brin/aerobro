import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

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
        -Math.PI / 4,
        Math.PI / 3,
        3,
        new BABYLON.Vector3(1, 1.5, -3.5),
        scene
      )

      camera.wheelPrecision = 80
      camera.attachControl(canvas, true)

      // eslint-disable-next-line no-unused-vars
      const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene
      )

      BABYLON.SceneLoader.ImportMeshAsync(
        'jembatan_Cube.003',
        '/models/',
        'jembatan.obj',
        scene
      ).then(result => {
        const jembatan = result.meshes[0]
        const boxMaterial = new BABYLON.StandardMaterial('boxMat', scene)
        boxMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5)
        boxMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1)

        jembatan.material = boxMaterial
      }).catch(err => console.log(err.message))

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
