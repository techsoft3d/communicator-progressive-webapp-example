const serveraddress = window.location.origin;

function setupTutorial() {
    hwv.setCallbacks({
        modelStructureReady: ModelFileManager.msready
    });

}