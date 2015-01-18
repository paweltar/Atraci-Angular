app.factory('DBService', function () {
    function MainDAO()
    {
        var self = this;
        self.Datastore = require("nedb");
        self.dbFolder = "DB";
        self.db = {
            MAIN : new self.Datastore({ filename : self.dbFolder + "/main.adb" , autoload : true}),
            HISTORY : new self.Datastore({ filename : self.dbFolder + "/history.adb" , autoload : true}),
            PLAYLIST : new self.Datastore({ filename : self.dbFolder + "/playlist.adb" , autoload : true}),
            TRACK : new self.Datastore({ filename : self.dbFolder + "/track.adb" , autoload : true})
        };

        /** HistoryDAO Queries */
        self.getAllHistory = function (callback) {
            self.db.HISTORY.find({}).exec(function (err, data) {
                callback(data);
            });
        };

        self.InsertNewHistory = function (trackObject, callback) {
            self.db.HISTORY.findOne({ "hash" : trackObject.hash }).exec(function (err, data) {
                if(data === null)
                {
                    self.db.HISTORY.insert(JSON.parse(angular.toJson(trackObject)), function (err, NewObj) {
                        if(err)
                        {
                            console.error("HistoryDAO Error: ", err);
                            return false;
                        }
                        if(callback) callback(NewObj);
                        console.info("new History Object Created", NewObj);
                    });
                }
            });
        };
        /** End HistoryDAO Queries */
    }

    MainDAO.prototype.constructor = MainDAO;

    return new MainDAO();
});