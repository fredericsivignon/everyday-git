/**
 * AddActivity view model
 */

var app = app || {};

app.AddParticipant = (function () {
    'use strict'

    var AddParticipantViewModel = (function () {
        
        var $newUsername;
        var validator;
        
        var init = function () {
            
            validator = $('#enterUsername').kendoValidator().data('kendoValidator');
            $newUsername = $('#newUsername');

            $newUsername.on('keydown', app.helper.autoSizeTextarea);
        };
        
        var show = function () {
            
            // Clear field on view show
            $newUsername.val('');
            validator.hideMessages();
            $newUsername.prop('rows', 1);
        };
        
        var saveParticipant = function () {
            
            // Validating of the required fields
            if (validator.validate()) {
                
                // Adding new participant to Participants model
                var participants = app.Participants.participants;
                var participant = participants.add();				
				
                var filter = { "Username": $newUsername.val() };
            	app.everlive.Users.get(filter)
				.then(function (userRaw) {
                	var user = userRaw.result[0];
				
					var activity = app.Activity.activity();
                	participant.UserId = user.Id;
                	participant.EventId = activity.Id;
                
	                participants.one('sync', function () {
	                    app.mobileApp.navigate('#:back');
	                });
	                
	                participants.sync();
					var acl =   {
                            $push: {
                                UsersCanRead: user.Id,
                                UsersCanUpdate: user.Id,
                                UsersCanDelete: user.Id
                            }
                        };
                      
					
                    app.everlive.data('Participants').setAcl(acl, participant.Id);
                    	
					//add Read permission for participant in Event
					var aclActivity =   {
											$push: {
					                                UsersCanRead: user.Id
					                               }	
					                    };					
					
					app.everlive.data('Events').setAcl(aclActivity, activity.Id);
					
				},
                function(error){
                    epp.showError(JSON.stringify(error));
                }
            );   
            }
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            saveParticipant: saveParticipant
        };
        
    }());
    
    return AddParticipantViewModel;
    
}());
