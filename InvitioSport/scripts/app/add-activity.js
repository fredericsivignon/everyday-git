/**
 * AddActivity view model
 */

var app = app || {};

app.AddActivity = (function () {
    'use strict'

    var addActivityViewModel = (function () {
        
        //var $newStatus;
        var $activityText;
        var $img;
        var validator;
        
        var init = function () {
            
            validator = $('#enterStatus').kendoValidator().data('kendoValidator');
            //$newStatus = $('#newStatus');
            $activityText = $('#activityText');
            $img = $('#img');

           // $newStatus.on('keydown', app.helper.autoSizeTextarea);
        };
        
        var show = function () {
            
            // Clear field on view show
            //$newStatus.val('');
            $activityText.val('');
            $img.val('');
            validator.hideMessages();
            //$newStatus.prop('rows', 1);
        };
        
        var saveActivity = function () {
            
            // Validating of the required fields
            if (validator.validate()) {
                
                // Adding new activity to Activities model
                var activities = app.Activities.activities;
                var activity = activities.add();
                
                //activity.Text = $newStatus.val();
                activity.Text = $activityText.val();
                activity.ImageUrl = $img.val();
                //activity.UserId = app.Users.currentUser.get('data').Id;
                
                activities.one('sync', function () {
                    app.mobileApp.navigate('#:back');
                });
                
                activities.sync();
            }
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            saveActivity: saveActivity
        };
        
    }());
    
    return addActivityViewModel;
    
}());