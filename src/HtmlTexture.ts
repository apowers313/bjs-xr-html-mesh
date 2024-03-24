import { DynamicTexture, Scene } from "@babylonjs/core";
import html2canvas from "./html2canvas";

export default class HtmlTexture extends DynamicTexture {
    domElement: HTMLElement;
    scheduleUpdate: ReturnType<typeof setTimeout> | null;
    observer: MutationObserver;
    canvas: HTMLCanvasElement;

    constructor(domElement: HTMLElement, scene: Scene) {
        const canvas = html2canvas(domElement);
        super("HtmlTexture", canvas, scene);
        this.canvas = canvas;
        this.domElement = domElement;
        this.scheduleUpdate = null;

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
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    update() {
        html2canvas(this.domElement);
        super.update()
        this.scheduleUpdate = null;
    }
}