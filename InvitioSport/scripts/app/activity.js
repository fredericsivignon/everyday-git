/**
 * Activity view model
 */

var app = app || {};

app.Activity = (function () {
    'use strict'
    
    var $commentsContainer,
	    $participantsContainer,
        listScroller;
    
    var activityViewModel = (function () {
        
        var activityUid,
            activity,
            $activityPicture;
        
        var init = function () {
            $commentsContainer = $('#comments-listview');
			$participantsContainer = $('#participants-listview');
            $activityPicture = $('#picture');
        };
		
		var initEdit = function () {
            $participantsContainer = $('#participants-listview');
            $activityPicture = $('#picture');
        };
        
        var show = function (e) {
            
            $commentsContainer.empty();
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
			
            app.Comments.comments.filter({
                field: 'ActivityId',
                operator: 'eq',
                value: activity.Id
            });
            
            kendo.bind(e.view.element, activity, kendo.mobile.ui);
        };
		
		var editActivity = function (e) {
            app.mobileApp.navigate('views/editActivityView.html?uid=' + activityUid);
        };
		
		var edit = function (e) {
            
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
        
        var removeActivity = function () {
            
            var activities = app.Activities.activities;
            var activity = activities.getByUid(activityUid);
            
            app.showConfirm(
                appSettings.messages.removeActivityConfirm,
                'Delete Activity',
                function (confirmed) {
                    if (confirmed === true || confirmed === 1) {
                        
                        activities.remove(activity);
                        activities.one('sync', function () {
                            app.mobileApp.navigate('#:back');
                        });
                        activities.sync();
                    }
                }
            );
        };
		
		        
        return {
            init: init,
			initEdit: initEdit,
            show: show,
			edit: edit,
			editActivity: editActivity,
            remove: removeActivity,
            activity: function () {
                return activity;
            }
        };
        
    }());
    
    return activityViewModel;
    
}());
