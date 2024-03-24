var F = Object.defineProperty;
var L = (l, f, c) => f in l ? F(l, f, { enumerable: !0, configurable: !0, writable: !0, value: c }) : l[f] = c;
var C = (l, f, c) => (L(l, typeof f != "symbol" ? f + "" : f, c), c);
import { DynamicTexture as H, MeshBuilder as U, StandardMaterial as X, ActionManager as k, ExecuteCodeAction as W } from "@babylonjs/core";
function N(l, f, c, u) {
  const d = {
    clientX: c * l.offsetWidth + l.offsetLeft,
    clientY: u * l.offsetHeight + l.offsetTop,
    view: l.ownerDocument.defaultView
  }, m = new MouseEvent(f, d);
  window.dispatchEvent(m);
  const w = l.getBoundingClientRect();
  c = c * w.width + w.left, u = u * w.height + w.top;
  function T(h) {
    if (h.nodeType !== Node.TEXT_NODE && h.nodeType !== Node.COMMENT_NODE) {
      const t = h.getBoundingClientRect();
      if (c > t.left && c < t.right && u > t.top && u < t.bottom && (h.dispatchEvent(new MouseEvent(f, d)), h instanceof HTMLInputElement && h.type === "range" && (f === "mousedown" || f === "click"))) {
        const [b, e] = ["min", "max"].map((n) => parseFloat(h[n])), o = t.width, i = (c - t.x) / o;
        h.value = b + (e - b) * i, h.dispatchEvent(new InputEvent("input", { bubbles: !0 }));
      }
      for (let b = 0; b < h.childNodes.length; b++)
        T(h.childNodes[b]);
    }
  }
  T(l);
}
const I = /* @__PURE__ */ new WeakMap();
function O(l) {
  const f = document.createRange();
  function c(e) {
    const o = [];
    let r = !1;
    function i() {
      if (r && (r = !1, e.restore()), o.length === 0)
        return;
      let n = -1 / 0, a = -1 / 0, v = 1 / 0, s = 1 / 0;
      for (let g = 0; g < o.length; g++) {
        const x = o[g];
        n = Math.max(n, x.x), a = Math.max(a, x.y), v = Math.min(v, x.x + x.width), s = Math.min(s, x.y + x.height);
      }
      e.save(), e.beginPath(), e.rect(n, a, v - n, s - a), e.clip(), r = !0;
    }
    return {
      add: function(n) {
        o.push(n), i();
      },
      remove: function() {
        o.pop(), i();
      }
    };
  }
  function u(e, o, r, i) {
    i !== "" && (e.textTransform === "uppercase" && (i = i.toUpperCase()), t.font = e.fontWeight + " " + e.fontSize + " " + e.fontFamily, t.textBaseline = "top", t.fillStyle = e.color, t.fillText(i, o, r + parseFloat(e.fontSize) * 0.1));
  }
  function d(e, o, r, i, n) {
    r < 2 * n && (n = r / 2), i < 2 * n && (n = i / 2), t.beginPath(), t.moveTo(e + n, o), t.arcTo(e + r, o, e + r, o + i, n), t.arcTo(e + r, o + i, e, o + i, n), t.arcTo(e, o + i, e, o, n), t.arcTo(e, o, e + r, o, n), t.closePath();
  }
  function m(e, o, r, i, n, a) {
    const v = e[o + "Width"], s = e[o + "Style"], g = e[o + "Color"];
    v !== "0px" && s !== "none" && g !== "transparent" && g !== "rgba(0, 0, 0, 0)" && (t.strokeStyle = g, t.lineWidth = parseFloat(v), t.beginPath(), t.moveTo(r, i), t.lineTo(r + n, i + a), t.stroke());
  }
  function w(e, o) {
    let r = 0, i = 0, n = 0, a = 0;
    if (e.nodeType === Node.TEXT_NODE) {
      f.selectNode(e);
      const s = f.getBoundingClientRect();
      r = s.left - T.left - 0.5, i = s.top - T.top - 0.5, n = s.width, a = s.height, u(o, r, i, e.nodeValue.trim());
    } else {
      if (e.nodeType === Node.COMMENT_NODE)
        return;
      if (e instanceof HTMLCanvasElement) {
        if (e.style.display === "none")
          return;
        const s = e.getBoundingClientRect();
        r = s.left - T.left - 0.5, i = s.top - T.top - 0.5, t.save();
        const g = window.devicePixelRatio;
        t.scale(1 / g, 1 / g), t.drawImage(e, r, i), t.restore();
      } else if (e instanceof HTMLImageElement) {
        if (e.style.display === "none")
          return;
        const s = e.getBoundingClientRect();
        r = s.left - T.left - 0.5, i = s.top - T.top - 0.5, n = s.width, a = s.height, t.drawImage(e, r, i, n, a);
      } else {
        if (e.style.display === "none")
          return;
        const s = e.getBoundingClientRect();
        r = s.left - T.left - 0.5, i = s.top - T.top - 0.5, n = s.width, a = s.height, o = window.getComputedStyle(e), d(r, i, n, a, parseFloat(o.borderRadius));
        const g = o.backgroundColor;
        g !== "transparent" && g !== "rgba(0, 0, 0, 0)" && (t.fillStyle = g, t.fill());
        const x = ["borderTop", "borderLeft", "borderBottom", "borderRight"];
        let R = !0, E = null;
        for (const p of x) {
          if (E !== null && (R = o[p + "Width"] === o[E + "Width"] && o[p + "Color"] === o[E + "Color"] && o[p + "Style"] === o[E + "Style"]), R === !1)
            break;
          E = p;
        }
        if (R === !0) {
          const p = parseFloat(o.borderTopWidth);
          o.borderTopWidth !== "0px" && o.borderTopStyle !== "none" && o.borderTopColor !== "transparent" && o.borderTopColor !== "rgba(0, 0, 0, 0)" && (t.strokeStyle = o.borderTopColor, t.lineWidth = p, t.stroke());
        } else
          m(o, "borderTop", r, i, n, 0), m(o, "borderLeft", r, i, 0, a), m(o, "borderBottom", r, i + a, n, 0), m(o, "borderRight", r + n, i, 0, a);
        if (e instanceof HTMLInputElement) {
          let p = o.accentColor;
          (p === void 0 || p === "auto") && (p = o.color);
          const M = "white";
          if (e.type === "radio" && (d(r, i, n, a, a), t.fillStyle = "white", t.strokeStyle = p, t.lineWidth = 1, t.fill(), t.stroke(), e.checked && (d(r + 2, i + 2, n - 4, a - 4, a), t.fillStyle = p, t.strokeStyle = M, t.lineWidth = 2, t.fill(), t.stroke())), e.type === "checkbox" && (d(r, i, n, a, 2), t.fillStyle = e.checked ? p : "white", t.strokeStyle = e.checked ? M : p, t.lineWidth = 1, t.stroke(), t.fill(), e.checked)) {
            const S = t.textAlign;
            t.textAlign = "center";
            const B = {
              color: M,
              fontFamily: o.fontFamily,
              fontSize: a + "px",
              fontWeight: "bold"
            };
            u(B, r + n / 2, i, "✔"), t.textAlign = S;
          }
          if (e.type === "range") {
            const [S, B, A] = ["min", "max", "value"].map((P) => parseFloat(e[P])), D = (A - S) / (B - S) * (n - a);
            d(r, i + a / 4, n, a / 2, a / 4), t.fillStyle = M, t.strokeStyle = p, t.lineWidth = 1, t.fill(), t.stroke(), d(r, i + a / 4, D + a / 2, a / 2, a / 4), t.fillStyle = p, t.fill(), d(r + D, i, a, a, a / 2), t.fillStyle = p, t.fill();
          }
          (e.type === "color" || e.type === "text" || e.type === "number") && (b.add({ x: r, y: i, width: n, height: a }), u(o, r + parseInt(o.paddingLeft), i + parseInt(o.paddingTop), e.value), b.remove());
        }
      }
    }
    const v = o.overflow === "auto" || o.overflow === "hidden";
    v && b.add({ x: r, y: i, width: n, height: a });
    for (let s = 0; s < e.childNodes.length; s++)
      w(e.childNodes[s], o);
    v && b.remove();
  }
  const T = l.getBoundingClientRect();
  let h = I.get(l);
  h === void 0 && (h = document.createElement("canvas"), h.width = T.width, h.height = T.height, I.set(l, h));
  const t = h.getContext(
    "2d"
    /*, { alpha: false }*/
  ), b = new c(t);
  return t.clearRect(0, 0, h.width, h.height), w(l), h;
}
class y extends H {
  constructor(c, u) {
    const d = O(c);
    super("HtmlTexture", d, u);
    C(this, "domElement");
    C(this, "scheduleUpdate");
    C(this, "observer");
    C(this, "canvas");
    this.canvas = d, this.domElement = c, this.scheduleUpdate = null;
    const m = new MutationObserver(() => {
      this.scheduleUpdate || (this.scheduleUpdate = setTimeout(() => this.update(), 16));
    }), w = { attributes: !0, childList: !0, subtree: !0, characterData: !0 };
    m.observe(c, w), this.observer = m;
  }
  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
  update() {
    O(this.domElement), super.update(), this.scheduleUpdate = null;
  }
}
class Y {
  constructor(f, c) {
    C(this, "domElement");
    C(this, "texture");
    C(this, "mesh");
    C(this, "material");
    this.domElement = f, this.texture = new y(f, c), this.texture.hasAlpha = !0, this.mesh = U.CreatePlane("plane", { height: 5, width: 5 }), this.material = new X("Mat", c), this.material.diffuseTexture = this.texture, this.mesh.material = this.material, this.texture.update(), this.mesh.actionManager = new k(c), this.mesh.actionManager.registerAction(
      new W(
        {
          trigger: k.OnPickDownTrigger
        },
        (u) => {
          const d = u.additionalData.getTextureCoordinates();
          N(this.domElement, "mousedown", d.x, 1 - d.y);
        }
      )
    ), this.mesh.actionManager.registerAction(
      new W(
        {
          trigger: k.OnPickUpTrigger
        },
        (u) => {
          const d = u.additionalData.getTextureCoordinates();
          N(this.domElement, "mouseup", d.x, 1 - d.y);
        }
      )
    ), this.mesh.actionManager.registerAction(
      new W(
        {
          trigger: k.OnPickTrigger
        },
        (u) => {
          const d = u.additionalData.getTextureCoordinates();
          N(this.domElement, "click", d.x, 1 - d.y);
        }
      )
    ), this.mesh.actionManager.registerAction(
      new W(
        {
          trigger: k.OnPointerOverTrigger
        },
        (u) => {
          const d = u.additionalData.pickResult.getTextureCoordinates();
          N(this.domElement, "mousemove", d.x, 1 - d.y);
        }
      )
    ), this.mesh.pointerOverDisableMeshTesting = !0;
  }
}
export {
  Y as HtmlMesh,
  y as HtmlTexture
};
