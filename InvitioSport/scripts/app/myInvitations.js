/**
 * Invitations model
 */

var app = app || {};

app.MyInvitations = (function () {
    'use strict';

    var invitationsModel = (function () {

        var invitationsData;

        // Retrieve invitations for the current user from Backend Services
        var loadInvitations = function () {

            // Get the data about the currently logged in user
            /*var invitationsDataSource = new kendo.data.DataSource({
                type: "everlive",
                transport: {
                    typeName: "Participants"
                }
            }); 
            invitationsDataSource.read()
            .then(function () {
                invitationsData = invitationsDataSource;
            })
            .then(null,
                  function (err) {
                      app.showError(err.message);
                  }
            );*/
            var currentUser = app.Users.currentUser.data;
            var filter = { 
                'User': currentUser.Id
            };
            var data = app.everlive.data('Invitations');
            data.get(filter)
            .then(function(data){
               invitationsData = new kendo.data.ObservableArray(data.result);
            },
            function(error){
                app.showError(error.message);
            });
        };

        return {
            load: loadInvitations,
            invitations: function () {
                return invitationsData;
            }
        };

    }());

    return invitationsModel;

}());
