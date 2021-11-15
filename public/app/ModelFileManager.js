class CsManagerClient {


    static msready() {
        csManagerClient = new CsManagerClient();    
    }

    constructor() {

        let _this = this;

        this._modelTable = new Tabulator("#modeltable", {
            layout: "fitColumns",
            responsiveLayout: "hide",
            rowClick: function(e,row) {
                _this._loadNewModel(row.getData().name);
            },
            columns: [
                { title: "", field: "image", formatter: "image", minWidth: 100, maxWidth: 100, formatterParams: { width: "90px", height: "70px" } },
                { title: "Name", field: "name", formatter: "plaintext" }
            ],
        });
        
        this._getModelList();       
    }


    async _getModelList() {
        let res = await fetch(serveraddress + '/api/models');
        let data = await res.json();

        await this._updateModelTable(data);

    }

    async _updateModelTable(modelnames)
    { 
        this._modelTable.clearData();
        for (var i=0;i<modelnames.length;i++)
        { 
        
            let image = await fetch(serveraddress + '/api/png/' + modelnames[i]);
            let imageblow = await image.blob();
            let urlCreator = window.URL || window.webkitURL;
            let part = urlCreator.createObjectURL(imageblow);                
           
            let prop = {image:part, name: modelnames[i]};
            this._modelTable.addData([prop], false);
        }
    }

    async _loadNewModel(modelname)
    { 
        await hwv.model.clear();
        let res = await fetch(serveraddress + "/api/scs/" + modelname);
        let buffer = await res.arrayBuffer();
        let byteArray = new Uint8Array(buffer);
        hwv.model.loadSubtreeFromScsBuffer(hwv.model.getRootNode(), byteArray);
    }

}