import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
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

    const scene = this.onCreateScene(engine, canvas)

    engine.runRenderLoop(function () {
      scene.render()
    })
  },
  methods: {
    onResize () {
      if (this.motor) {
        this.motor.resize()
      }
    },
    onCreateScene (engine, canvas) {
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
      camera.minZ = 0.1
      camera.storeState()
      camera.attachControl(canvas, true)

      const light = new BABYLON.DirectionalLight(
        'dirlight',
        new BABYLON.Vector3(-1, -2, -1),
        scene
      )
      light.position = new BABYLON.Vector3(1, 0, 2)
      light.intensity = 1

      BABYLON.SceneLoader.ImportMeshAsync(
        ['jembatan', 'acc', 'strain1', 'strain2'],
        '/models/',
        'jembatan.obj',
        scene
      ).then(result => {
        const jembatan = result.meshes[0]
        const jembatanMaterial = new BABYLON.StandardMaterial('jembatanMat', scene)
        jembatanMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8)
        jembatanMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1)
        jembatan.material = jembatanMaterial

        const accSensor = result.meshes[1]
        const accMaterial = new BABYLON.StandardMaterial('accMat', scene)
        accMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0)
        accMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1)
        accSensor.material = accMaterial

        const strainSensor1 = result.meshes[2]
        const strainSensor2 = result.meshes[3]
        const strainMaterial = new BABYLON.StandardMaterial('strainMat', scene)
        strainMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0)
        strainMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1)
        strainSensor1.material = strainMaterial
        strainSensor2.material = strainMaterial

        // Shadow
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, light)
        shadowGenerator.addShadowCaster(jembatan)
        shadowGenerator.usePoissonSampling = true

        /// Create GUI
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')

        this.onCreateButtonReset(advancedTexture, camera)
        this.onCreateLabel(advancedTexture, 'accelerometer', 0, -220, 0, 20, accSensor)
        this.onCreateLabel(advancedTexture, 'strain 1', 150, 110, 0, -20, strainSensor1)
        this.onCreateLabel(advancedTexture, 'strain 2', -150, 110, 0, -20, strainSensor2)
      }).catch(err => console.log(err.message))

      return scene
    },
    onCreateButtonReset (textureUI, camera) {
      const buttonReset = GUI.Button.CreateSimpleButton('butReset', '📷 reset')
      buttonReset.width = '150px'
      buttonReset.height = '40px'
      buttonReset.color = 'black'
      buttonReset.cornerRadius = 7
      buttonReset.thickness = 3
      buttonReset.background = 'white'
      buttonReset.left = 10
      buttonReset.top = -10
      buttonReset.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      buttonReset.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM

      buttonReset.onPointerUpObservable.add(function () {
        camera.restoreState()
      })

      textureUI.addControl(buttonReset)
    },
    onCreateLabel (textureUI, name, offsetX, offsetY, lineX, lineY, mesh) {
      const rect = new GUI.Rectangle()
      rect.width = 0.1
      rect.height = '40px'
      rect.cornerRadius = 7
      rect.color = 'black'
      rect.thickness = 3
      rect.background = 'white'
      textureUI.addControl(rect)

      const label = new GUI.TextBlock()
      label.text = name
      rect.addControl(label)

      rect.linkWithMesh(mesh)
      rect.linkOffsetX = offsetX
      rect.linkOffsetY = offsetY

      /// Draw the line
      const line = new GUI.Line()
      line.lineWidth = 4
      line.color = 'orange'
      line.x2 = lineX
      line.y2 = lineY
      textureUI.addControl(line)
      line.linkWithMesh(mesh)
      line.connectedControl = rect
    }
  }
}
