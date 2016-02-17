/**
 * AddEvent view model
 */

var app = app || {};

app.AddEvent = (function () {
    'use strict'

    var addEventViewModel = (function () {
        
        //var $newStatus;
        var $eventText;
		var $eventPublic;
        var $img;
        var validator;
        
        var init = function () {
            $("#order").kendoDropDownList();
			
            validator = $('#enterStatus').kendoValidator().data('kendoValidator');
            //$newStatus = $('#newStatus');
            $eventText = $('#eventText');
			$eventPublic = $('#eventPublic');
            $img = $('#img');

           // $newStatus.on('keydown', app.helper.autoSizeTextarea);
        };
        
        var show = function () {
            
            // Clear field on view show
            //$newStatus.val('');
            $eventText.val('');
			$eventPublic.val(false);
            $img.val('');
            validator.hideMessages();
            //$newStatus.prop('rows', 1);
        };
        
        var saveEvent = function () {
            
            // Validating of the required fields
            if (validator.validate()) {
                
                // Adding new event to Events model
                var events = app.Events.events;
                var event = events.add();
                
                //event.Text = $newStatus.val();
                event.Text = $eventText.val();
                event.ImageUrl = $img.val();
                event.Public = $eventPublic.is(":checked");
				//event.UserId = app.Users.currentUser.get('data').Id;
                
                events.one('sync', function () {
                    app.mobileApp.navigate('#:back');
                });
                events.sync();				
				
				//set ACL of Event entity to Read = "Registered" users
				//In this way all registered users in the sstem will be able to read this Event
				//(get Role id from the current user)
				var currentUser = app.Users.currentUser.data;
                var aclEvent = { $push: { RolesCanRead: currentUser.Role } };										
				app.everlive.data('Events').setAcl(aclEvent, event.Id);
            }
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            saveEvent: saveEvent
        };
        
    }());
    
    return addEventViewModel;
    
}());
