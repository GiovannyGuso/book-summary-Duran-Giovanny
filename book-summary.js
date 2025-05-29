class BookSummary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 320px;
          border: 2px solid #444;
          border-radius: 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          font-family: 'Segoe UI', sans-serif;
          background: #1e1e1e;
          color: #f1f1f1;
          overflow: hidden;
        }

        .container {
          padding: 1rem;
        }

        img {
          width: 100%;
          height: auto;
          border-bottom: 2px solid #555;
        }

        h2 {
          font-size: 1.25rem;
          margin: 0.5rem 0 0;
          color: #f5f5f5;
        }

        p.author {
          font-style: italic;
          color: #ccc;
          margin: 0;
        }

        ::slotted(p) {
          margin-top: 1rem;
          color: #ddd;
        }

        ::slotted(.extra-info) {
          font-size: 0.9rem;
          color: #aaa;
          margin-top: 0.5rem;
        }
      </style>
      <div class="container">
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
