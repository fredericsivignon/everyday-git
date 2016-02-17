/**
 * Event view model
 */

var app = app || {};

app.Event = (function () {
    'use strict'
    
    var $commentsContainer,
	    $participantsContainer,
        listScroller;
    
    var eventViewModel = (function () {
        
        var eventUid,
            event,
            $eventPicture;
        
        var init = function () {
            $commentsContainer = $('#comments-listview');
			$participantsContainer = $('#participants-listview');
            $eventPicture = $('#picture');
        };
		
		var initEdit = function () {
            $participantsContainer = $('#participants-listview');
            $eventPicture = $('#picture');
        };
        
        var show = function (e) {
            
            $commentsContainer.empty();
			$participantsContainer.empty();
            
            listScroller = e.view.scroller;
            listScroller.reset();
            
            eventUid = e.view.params.uid;
            // Get current event (based on item uid) from Events model
            event = app.Events.events.getByUid(eventUid);
            $eventPicture[0].style.display = event.Picture ? 'block' : 'none';
            
			app.Participants.participants.filter({
                field: 'EventId',
                operator: 'eq',
                value: event.Id
            });
			
            app.Comments.comments.filter({
                field: 'EventId',
                operator: 'eq',
                value: event.Id
            });
            
            kendo.bind(e.view.element, event, kendo.mobile.ui);
        };
		
		var editEvent = function (e) {
            app.mobileApp.navigate('views/editEventView.html?uid=' + eventUid);
        };
		
		var edit = function (e) {
            
            $participantsContainer.empty();
            
            listScroller = e.view.scroller;
            listScroller.reset();
            
            eventUid = e.view.params.uid;
            // Get current event (based on item uid) from Events model
            event = app.Events.events.getByUid(eventUid);
            $eventPicture[0].style.display = event.Picture ? 'block' : 'none';
            
			app.Participants.participants.filter({
                field: 'EventId',
                operator: 'eq',
                value: event.Id
            });
			            
            kendo.bind(e.view.element, event, kendo.mobile.ui);
        };
        
        var removeEvent = function () {
            
            var events = app.Events.events;
            var event = events.getByUid(eventUid);
            
            app.showConfirm(
                appSettings.messages.removeEventConfirm,
                'Delete Event',
                function (confirmed) {
                    if (confirmed === true || confirmed === 1) {
                        
                        events.remove(event);
                        events.one('sync', function () {
                            app.mobileApp.navigate('#:back');
                        });
                        events.sync();
                    }
                }
            );
        };
		
		        
        return {
            init: init,
			initEdit: initEdit,
            show: show,
			edit: edit,
			editEvent: editEvent,
            remove: removeEvent,
            event: function () {
                return event;
            }
        };
        
    }());
    
    return eventViewModel;
    
}());
