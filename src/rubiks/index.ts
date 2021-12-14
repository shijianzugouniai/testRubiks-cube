import {PerspectiveCamera, Color, Renderer, Scene, WebGLRenderer} from "three";
import createCamera from "./components/camera";
import createScene from "./components/scene";
import createRenderer from "./components/renderer";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {createControls} from "./systems/controls";
import Loop from "./systems/loop";
import {Cube} from "./core/cube";
import Control from "./core/control";

const setSize = (container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
    // Set the camera's aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

    // set the pixel ratio (for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
};

class Rubiks {
    private camera: PerspectiveCamera;
    private scene: Scene;
    private renderer: WebGLRenderer;
    public constructor(container: Element) {
        this.camera = createCamera();
        this.scene = createScene("black");
        this.renderer = createRenderer();
        container.appendChild(this.renderer.domElement);
        
        const cube = new Cube(3);
        this.scene.add(cube);

        // auto resize
        window.addEventListener("resize", () => {
            setSize(container, this.camera, this.renderer);
            this.render();
        });
        setSize(container, this.camera, this.renderer);
        this.render();

        new Control(this.camera, this.scene, this.renderer, cube);
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    }
}

export default Rubiks;
