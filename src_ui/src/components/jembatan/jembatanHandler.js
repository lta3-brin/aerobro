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

      // Camera
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

      // Light
      // const light = new BABYLON.HemisphericLight(
      //   'light',
      //   new BABYLON.Vector3(0, 1, 0),
      //   scene
      // )
      const light = new BABYLON.DirectionalLight(
        'dirlight',
        new BABYLON.Vector3(-1, -2, -1),
        scene
      )
      light.position = new BABYLON.Vector3(1, 0, 2)
      light.intensity = 1

      BABYLON.SceneLoader.ImportMeshAsync(
        'jembatan_Cube.003',
        '/models/',
        'jembatan.obj',
        scene
      ).then(result => {
        const jembatan = result.meshes[0]
        const jembatanMaterial = new BABYLON.StandardMaterial('boxMat', scene)
        jembatanMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8)
        jembatanMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1)

        // Shadow
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, light)
        shadowGenerator.addShadowCaster(jembatan)
        shadowGenerator.usePoissonSampling = true

        jembatan.material = jembatanMaterial
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
