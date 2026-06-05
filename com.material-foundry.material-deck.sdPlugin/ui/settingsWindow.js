/**
 * Global settings window
 */
export class SettingsWindow {
    menuOpen = false;
    elmnt;

    constructor() {
        this.elmnt = document.getElementById("settingsMenu");

        //Close on 'x' button click
        document.getElementById(`closeSettingsMenu`).addEventListener("click", () => {
            this.close();
        })

        //Close when clicking somewhere else in PI
        this.elmnt.addEventListener("pointerdown", (event) => {
            if (event.target == document.getElementById("settingsMenu")) 
                this.close();
        })

        //On port change
        document.getElementById("globalPortValue").addEventListener("change", (event)=>{
            window.SD.sendToPlugin({
                type: "setWebsocketPort",
                wsPort: event.target.value
            })
        })

        //On default collapse change
        document.getElementById("globalDefaultCollapse").addEventListener("change", (event)=>{
            window.SD.setGlobalSetting("defaultCollapse", event.target.checked);
        })
    }

    async open() {
        //Fill in values
        const globalSettings = await window.SD.getGlobalSettings();
        document.getElementById("globalPortValue").value = globalSettings.wsPort;
        document.getElementById("globalDefaultCollapse").checked = globalSettings.defaultCollapse || false;
        
        //Show settings element
        this.elmnt.style.display = "block";

        this.menuOpen = true;
    }

    close() {
        //Hide settings element
        this.elmnt.style.display = "none";
        this.menuOpen = false;
    }
}