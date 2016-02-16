/**
 * Activity view model
 */

var app = app || {};

app.EditActivity = (function () {
    'use strict'
    
    var $participantsContainer,
        listScroller;
    
    var activityViewModel = (function () {
        
        var activityUid,
            activity,
            $activityPicture;
        
        var init = function () {
            $participantsContainer = $('#participants-listview');
            $activityPicture = $('#picture');
        };
		
		        
        var show = function (e) {
            
           $participantsContainer.empty();
            
            listScroller = e.view.scroller;
            listScroller.reset();
            
            activityUid = e.view.params.uid;
            // Get current activity (based on item uid) from Activities model
            activity = app.Activities.activities.getByUid(activityUid);
            $activityPicture[0].style.display = activity.Picture ? 'block' : 'none';
            
			app.Participants.participants.filter({
                field: 'EventId',
                operator: 'eq',
                value: activity.Id
            });
			
                       
            kendo.bind(e.view.element, activity, kendo.mobile.ui);
        };	
		        
        return {
            init: init,
			show: show,
			activity: function () {
                return activity;
            }
        };
        
    }());
    
    return activityViewModel;
    
}());
