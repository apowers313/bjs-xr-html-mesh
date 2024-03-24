import { ActionManager, ExecuteCodeAction, Mesh, MeshBuilder, StandardMaterial, Scene } from "@babylonjs/core";

import htmlevent from "./htmlevent";
import { default as HtmlTexture } from "./HtmlTexture";

export default class HtmlMesh {
    domElement: HTMLElement;
    texture: HtmlTexture;
    mesh: Mesh;
    material: StandardMaterial;

    constructor(domElement: HTMLElement, scene: Scene) {
        this.domElement = domElement;

        // create HTML texture
        this.texture = new HtmlTexture(domElement, scene);
        this.texture.hasAlpha = true;

        // create plane
        this.mesh = MeshBuilder.CreatePlane("plane", { height: 5, width: 5 }, scene);
        this.material = new StandardMaterial("Mat", scene);

        // create material
        this.material.diffuseTexture = this.texture;
        this.mesh.material = this.material;

        // remember to update or you will get NOTHING :)
        this.texture.update();

        // setup actions
        this.mesh.actionManager = new ActionManager(scene);

        // mousedown event on OnPickDownTrigger action
        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickDownTrigger,
                },
                (evt) => {
                    const htmlCoords = evt.additionalData.getTextureCoordinates();
                    // XXX: y coordinates are inverted between browser and 3D
                    htmlevent(this.domElement, "mousedown", htmlCoords.x, 1 - htmlCoords.y);
                },
            )
        );

        // mouseup event on OnPickUpTrigger action
        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickUpTrigger,
                },
                (evt) => {
                    const htmlCoords = evt.additionalData.getTextureCoordinates();
                    // XXX: y coordinates are inverted between browser and 3D
                    htmlevent(this.domElement, "mouseup", htmlCoords.x, 1 - htmlCoords.y);
                },
            )
        );

        // click event on OnPickTrigger action
        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger,
                },
                (evt) => {
                    const htmlCoords = evt.additionalData.getTextureCoordinates();
                    // XXX: y coordinates are inverted between browser and 3D
                    htmlevent(this.domElement, "click", htmlCoords.x, 1 - htmlCoords.y);
                },
            )
        );

        // mousemove event on OnPointerOverTrigger action
        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPointerOverTrigger,
                },
                (evt) => {
                    const htmlCoords = evt.additionalData.pickResult.getTextureCoordinates();
                    // XXX: y coordinates are inverted between browser and 3D
                    htmlevent(this.domElement, "mousemove", htmlCoords.x, 1 - htmlCoords.y);
                },
            )
        );

        // if you set AbstractMesh.pointerOverDisableMeshTesting to
        // true, this trigger will be triggered every time you move the
        // mouse and you are still over the mesh! 
        this.mesh.pointerOverDisableMeshTesting = true;
    }
}