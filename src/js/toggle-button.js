class ToggleButton extends HTMLButtonElement {
  connectedCallback() {
    this.setAttribute("aria-pressed", "false");
    this.addEventListener("click", this.togglePressed);
    this.render();
  }

  togglePressed() {
    const isPressed = this.getAttribute("aria-pressed") === "true";
    this.setAttribute("aria-pressed", `${!isPressed}`);
    this.render();
  }

  render() {
    const isPressed = this.getAttribute("aria-pressed") === "true";
    const buttonText = isPressed
      ? this.getAttribute("pressed-text")
      : this.getAttribute("unpressed-text");
    let icon = "";
    if (this.getAttribute("pressed-icon")) {
      icon = `<span aria-hidden="true" class=${this.getAttribute(
        "icon-family"
      )}>${
        isPressed
          ? this.getAttribute("pressed-icon")
          : this.getAttribute("unpressed-icon")
      }</span> `;
    }
    this.innerHTML = `<span class=${this.getAttribute("class-names")}>
                             <span class="button-text">${buttonText}</span>
                             ${icon}
                          </span>`;
    console.log(this.innerHTML);
  }
}

customElements.define("toggle-button", ToggleButton, { extends: "button" });
