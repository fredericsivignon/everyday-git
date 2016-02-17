/**
 * Event view model
 */

var app = app || {};

app.EditEvent = (function () {
    'use strict'
    
    var $participantsContainer,
        listScroller;
    
    var eventViewModel = (function () {
        
        var eventUid,
            event,
            $eventPicture;
        
        var init = function () {
            $participantsContainer = $('#participants-listview');
            $eventPicture = $('#picture');
        };
		
		        
        var show = function (e) {
            
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
		        
        return {
            init: init,
			show: show,
			event: function () {
                return event;
            }
        };
        
    }());
    
    return eventViewModel;
    
}());
