/**
 * Participations model
 */

var app = app || {};

app.MyParticipations = (function () {
    'use strict';

    var participationsModel = (function () {

        var participationsData;

        // Retrieve participations for the current user from Backend Services
        var loadParticipations = function () {

            // Get the data about the currently logged in user
            /*var participationsDataSource = new kendo.data.DataSource({
                type: "everlive",
                transport: {
                    typeName: "Participants"
                }
            }); 
            participationsDataSource.read()
            .then(function () {
                participationsData = participationsDataSource;
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );*/
            var currentUser = app.Users.currentUser.data;
            var filter = { 
                'UserId': currentUser.Id
            };
            var data = app.everlive.data('Participants');
            data.get(filter)
            .then(function(data){
               participationsData = new kendo.data.ObservableArray(data.result);
            },
            function(error){
                app.showError(error.message);
            });
        };

        return {
            load: loadParticipations,
            participations: function () {
                return participationsData;
            }
        };

    }());

    return participationsModel;

}());
