class BookSummary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement('template');
 template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 300px;
      background: #222;
      color: white;
      border: 1px solid #444;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      padding: 10px;
    }
    img {
      width: 100%;
      border-radius: 4px;
    }
    h2 {
      margin: 10px 0 5px;
      font-size: 18px;
    }
    .author {
      font-size: 14px;
      font-style: italic;
      margin: 0;
    }
    ::slotted(p) {
      margin: 10px 0 0;
    }
    ::slotted(.extra-info) {
      font-size: 13px;
      color: #bbb;
    }
  </style>
  <div>
    <img id="cover" />
    <h2 id="title"></h2>
    <p class="author" id="author"></p>
    <slot></slot>
    <slot name="extra"></slot>
  </div>
`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title", "author", "cover"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.getElementById("title").textContent = this.getAttribute("title") || "";
    this.shadowRoot.getElementById("author").textContent = this.getAttribute("author") ? `por ${this.getAttribute("author")}` : "";
    this.shadowRoot.getElementById("cover").src = this.getAttribute("cover") || "";
    this.shadowRoot.getElementById("cover").alt = this.getAttribute("title") || "Portada del libro";
  }
}

customElements.define('book-summary', BookSummary);
