import { DynamicTexture, Texture, ActionManager, ExecuteCodeAction, Mesh, MeshBuilder, StandardMaterial, Scene } from "@babylonjs/core";

import html2canvas from "html2canvas";

import htmlevent from "./htmlevent";

export default class HtmlUi {
    domElement: HTMLElement;
    scene: Scene;
    texture: DynamicTexture;
    mesh: Mesh;
    material: StandardMaterial;
    scheduleUpdate: ReturnType<typeof setTimeout> | null = null;
    observer: MutationObserver;
    scalingFactor = 0.01;

    constructor(domElement: HTMLElement, scene: Scene) {
        this.domElement = domElement;
        this.scene = scene;
        this.texture = new DynamicTexture("Dummy HTML UI", document.createElement("canvas"), this.scene);

        // create plane
        this.mesh = MeshBuilder.CreatePlane("plane", {
            // height: this.texture.height * this.scalingFactor,
            // width: this.texture.width * this.scalingFactor,
            height: 1,
            width: 1,
        }, scene);

        // create material
        this.material = new StandardMaterial("Mat", scene);
        this.mesh.material = this.material;

        // Create an observer on the DOM, and run html2canvas update in the next loop
        const observer = new MutationObserver(() => {

            if (!this.scheduleUpdate) {
                // ideally should use xr.requestAnimationFrame, here setTimeout to avoid passing the renderer
                this.scheduleUpdate = setTimeout(() => this.update(), 16);
            }

        });

        const config = { attributes: true, childList: true, subtree: true, characterData: true };
        observer.observe(domElement, config);
        this.observer = observer;

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

    async init(): Promise<void> {
        return this.update();
    }

    get canvas(): HTMLCanvasElement {
        const c: HTMLCanvasElement | undefined = (this?.texture as any)?._canvas;
        if (!c) {
            throw new Error("call .init() before accessing .canvas");
        }
        return c;
    }

    async updateCanvas(): Promise<HTMLCanvasElement> {
        return html2canvas(this.domElement, {
            backgroundColor: null,
        });
    }

    async update(): Promise<void> {
        const c = await this.updateCanvas();
        console.log(`canvas size: ${c.width}x${c.height}`);

        // save canvas or recreate texture

        // create new texture
        // if (this.texture.scale. === c.width)
        this.texture = new DynamicTexture("HTML UI", c, this.scene);
        this.texture.hasAlpha = true;
        this.material.diffuseTexture = this.texture;
        // set location of plane so that some part of it stays in the same place
        // through a resize

        // adjust plane size
        this.mesh.scaling.x = c.width * this.scalingFactor;
        this.mesh.scaling.y = c.height * this.scalingFactor;

        this.texture.update();

        this.scheduleUpdate = null;
    }
}