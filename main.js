const CHAT_URL = "https://chatbot-frontend-production-7968.up.railway.app/embedded-chat/"
export const CHAT_WIDTH = "360px";
export const CHAT_HEIGTH = "384px";

export const styles = `
body {
  height: 100vh;
  width: 100%;
  background-color: #000023;
}

.widget__container * {
  box-sizing: border-box;
}
.widget__container {
  box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
  right: -25px;
  bottom: 75px;
  position: absolute;
  transition: max-height .2s ease;
  background-color: #e6e6e6a6;
  border-radius: 10px;
  border: none;
}

.widget__icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: all .3s ease;
  z-index: 50;
}
.widget__hidden {
  display: none;
}
.button__container {
  border: none;
  display: flex;
  background-color: #24b47e;
  padding: 18px;
  border-radius: 50%;
  cursor: pointer;
}
.widget__container.hidden {
  display: none;
}
`;

export const MESSAGE_ICON = `
<svg
id="Capa_1"
data-name="Capa 1"
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 28.15 31.81"
width="24"
height="24"
>
<rect x="4.08" y="9.91" width="20" height="14" fill="#020202" />
<path
  d="M23.28,15.2a.29.29,0,0,1-.29-.29,2.34,2.34,0,0,0-2.06-2.55,2.34,2.34,0,0,0-2.07,2.55.29.29,0,1,1-.58,0,2.92,2.92,0,0,1,2.65-3.13,2.92,2.92,0,0,1,2.64,3.13A.29.29,0,0,1,23.28,15.2Zm-10.4,2.67a.29.29,0,0,1,.29.28c0,1.75,1.16,3.18,2.58,3.18a2.94,2.94,0,0,0,2.59-3.18.29.29,0,0,1,.58,0,3.5,3.5,0,0,1-3.17,3.75,3.5,3.5,0,0,1-3.16-3.75A.29.29,0,0,1,12.88,17.87Zm-4.58-3a.29.29,0,1,1-.57,0,2.91,2.91,0,0,1,2.64-3.13A2.92,2.92,0,0,1,13,14.91a.29.29,0,0,1-.58,0,2.35,2.35,0,0,0-2.07-2.55A2.35,2.35,0,0,0,8.3,14.91ZM26.89,6.7l.87-3.07.27,0h.18A1.78,1.78,0,0,0,29.42,3a1.76,1.76,0,0,0,.39-1.3,1.8,1.8,0,0,0-2-1.59,1.83,1.83,0,0,0-1.21.65,1.8,1.8,0,0,0-.39,1.3,1.82,1.82,0,0,0,1,1.4l-.89,3.13a5.65,5.65,0,0,0-.59,0H6.27l-.33,0L5.06,3.45a1.78,1.78,0,1,0-1,.19h.18l.27,0,.86,3a4.32,4.32,0,0,0-3.45,4.21V22.49A4.29,4.29,0,0,0,6,26.76v4.66a.48.48,0,0,0,.29.45.65.65,0,0,0,.19,0,.51.51,0,0,0,.33-.13l5.11-4.71a1.21,1.21,0,0,1,.81-.3h13a4.34,4.34,0,0,0,4.35-4.32V10.85A4.32,4.32,0,0,0,26.89,6.7"
  transform="translate(-1.92 -0.09)"
  fill="#fefdff"
/>
</svg>
`

export const CLOSE_ICON = `
<svg
viewBox="0 0 20 20"
fill="none"
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
>
<path
  d="M17.0707 15.6566L11.414 9.99981L17.0708 4.34292C17.4611 3.95268 17.4611 3.31903 17.0707 2.92866C16.6805 2.53842 16.0468 2.53842 15.6566 2.92866L9.99969 8.58556L4.3428 2.92866C3.95256 2.53842 3.31891 2.53842 2.92867 2.92866C2.5383 3.31903 2.5383 3.95268 2.92854 4.34292L8.58544 9.99981L2.92867 15.6566C2.5383 16.0469 2.5383 16.6806 2.92854 17.0708C3.31891 17.4612 3.95256 17.4612 4.34293 17.0708L9.99969 11.4141L15.6565 17.0708C16.0468 17.4612 16.6805 17.4612 17.0708 17.0708C17.4611 16.6806 17.4611 16.0469 17.0707 15.6566Z"
  fill="currentColor"
  stroke="currentColor"
  strokeWidth="0.1"
/>
</svg>
`

class MessageWidget {
  constructor(position = "bottom-right") {
    this.position = this.getPosition(position);
    this.open = false;
    this.url = this.getUrl()
    this.initialize();
    this.injectStyles();
  }

  position = "";
  open = false;
  widgetContent = null;
  url
  
  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px"
    };
  }

  getUrl() {
    const scriptAttr = document.querySelector("#embedded-chat-script");
    const scriptTag = document.getElementById("embedded-chat-script")
    console.log({location: window.location})
    console.log({scriptAttr, scriptTag})

    if (scriptAttr && scriptAttr !== null) {
      console.log(scriptAttr.getAttribute("src"))
      const urlBase = new URL(scriptAttr.getAttribute("src"))
      console.log({urlBase})
      const urlParams = urlBase.searchParams.get("client")
      console.log({
        currentScript:  document.currentScript,
        scriptAttr,
        urlParams,
        
      })
      return `${CHAT_URL}${urlParams}`
    }
    
    
    return `${CHAT_URL}`
  }

  async initialize() {

    document.querySelector("body").addEventListener('click', () => console.log("body clicked"))

    /**
     * Create a Container Div
     */
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.zIndex = 50
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    /**
     * Create a Button Container
     */
    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("button__container");

    /**
     * Create a span for Widget Icon
     */
    const widgetIconElement = document.createElement("span");
    widgetIconElement.innerHTML = MESSAGE_ICON;
    widgetIconElement.classList.add("widget__icon");
    this.widgetIcon = widgetIconElement;

    /**
     * Create a span for Close Icon
     */
    const closeIconElement = document.createElement("span");
    closeIconElement.innerHTML = CLOSE_ICON;
    closeIconElement.classList.add("widget__icon", "widget__hidden");
    this.closeIcon = closeIconElement;

    /**
     * Append both icon created to the button element and add a click
     * event
     */
      buttonContainer.appendChild(this.widgetIcon);
      buttonContainer.appendChild(this.closeIcon);
      buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

      /**
       * Create a container for widget (IFrame)
       */
      this.widgetContainer = document.createElement("iframe");
      this.widgetContainer.classList.add("widget__hidden", "widget__container");
      this.widgetContainer.src = this.url;
      this.widgetContainer.width = CHAT_WIDTH;
      this.widgetContainer.height = CHAT_HEIGTH;

      /**
       * Invoke createWidgetContent() method;
       */
      // this.createWidgetContent();

      /**
       * Append the widget's content and the button to the container
       */
      container.appendChild(this.widgetContainer);
      container.appendChild(buttonContainer);

  }

  // createWidgetContent() {
  //   this.widgetContainer.innerHTML = `
  //     <iframe class="widget__iframe" src="" width="360" height="384" />
  //   `;
  // }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;

    if(this.open) {
      console.log("open")
      this.widgetIcon.classList.add("widget__hidden");
      this.closeIcon.classList.remove("widget__hidden");
      this.widgetContainer.classList.remove("widget__hidden");
    } else {
      
      console.log("close")
      this.widgetIcon.classList.remove("widget__hidden");
      this.closeIcon.classList.add("widget__hidden");
      this.widgetContainer.classList.add("widget__hidden");
    }

  }

}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();