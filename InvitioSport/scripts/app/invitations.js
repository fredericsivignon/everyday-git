/**
 * Invitations view model
 */

var app = app || {};

app.Invitations = (function () {
    'use strict'

    var invitationsViewModel = (function () {
        
        var invitationModel = {
            id: 'Id',
            fields: {
                Accept: {
                    field: 'Accept',
                    defaultValue: ''
                },
                ActivityId: {
                    field: 'ActivityId',
                    defaultValue: null
                },
                UserId: {
                    field: 'UserId',
                    defaultValue: null
                }
            },
            User: function () {
                
                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];
                
                return user ? { 
                    DisplayName: user.DisplayName, 
                    PictureUrl: app.helper.resolveProfilePictureUrl(user.Picture) 
                } : { 
                    DisplayName: 'Anonymous', 
                    PictureUrl: app.helper.resolveProfilePictureUrl() 
                };
            }
        };

        var invitationsDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: invitationModel
            },
            transport: {
                typeName: 'Invitations'
            },
            serverFiltering: true,
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#invitations-listview').kendoMobileListView({
                        dataSource: e.items,
                        template: kendo.template($('#invitationTemplate').html())
                    });
                } else {
                    $('#invitations-listview').empty();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });
        
        return {
            invitations: invitationsDataSource
        };
        
    }());
    
    return invitationsViewModel;

}());
