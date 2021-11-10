let csManagerClient;
const serveraddress = "http://localhost:3000";

function setupTutorial() {


    hwv.setCallbacks({
        modelStructureReady: CsManagerClient.msready
    });

}