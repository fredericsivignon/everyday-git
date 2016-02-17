/**
 * Participations view model
 */

var app = app || {};

app.Participants = (function () {
    'use strict'

    var participantsViewModel = (function () {
        
        var participantModel = {
            id: 'Id',
            fields: {
				CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Accepted: {
                    field: 'Accepted',
                    defaultValue: ''
                },
                EventId: {
                    field: 'EventId',
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

        var participantsDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: participantModel
            },
            transport: {
                typeName: 'Participants'
            },
            serverFiltering: true,
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#participants-listview').kendoMobileListView({
                        dataSource: e.items,
                        template: kendo.template($('#participantTemplate').html())
                    });
                } else {
                    $('#participants-listview').empty();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });
        
        return {
            participants: participantsDataSource
        };
        
    }());
    
    return participantsViewModel;

}());
