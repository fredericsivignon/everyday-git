/**
 * Activities view model
 */

var app = app || {};

app.Activities = (function () {
    'use strict'

    // Activities model
    var activitiesModel = (function () {

        var activityModel = {

            id: 'Id',
            fields: {
                Text: {
                    field: 'Text',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Picture: {
                    fields: 'Picture',
                    defaultValue: null
                },
                ImageUrl: {
                    fields: 'ImageUrl',
                    defaultValue: null
                },
                Start: {
                    field: 'Start',
                    defaultValue: null
                },
                End: {
                    field: 'End',
                    defaultValue: null
                },
                Category: {
                    field: 'Category',
                    defaultValue: ''
                },
                FriendlyLocation: {
                    field: 'FriendlyLocation',
                    defaultValue: ''
                },
				Public: {
					field: 'Public',
					defaultValue: false
                }
            },
            ImageUrlFormatted: function(){
                return "images/" + this.get("ImageUrl")+ ".png";  
            },
            CreatedAtFormatted: function () {

                return app.helper.formatDate(this.get('CreatedAt'));
            },
            PictureUrl: function () {

                return app.helper.resolvePictureUrl(this.get('Picture'));
            },
            Accepted: function () {

                var ivtId = this.get('Id');
                var activityOwnerId = this.get('Owner');

                var currentUser = app.Users.currentUser.data;
                    
                if(activityOwnerId === currentUser.Id)
                    return "responseExists";
                
                var data = app.MyInvitations.invitations();
                var ivt = $.grep(data, function (e) {
                    return e.EventId === ivtId && e.UserId === currentUser.Id;
                })[0];

                if (typeof ivt !== 'undefined' && (ivt.Accepted === "YES" || ivt.Accepted === "NO" || ivt.Accepted === "MAYBE"))
                    return "responseExists";
                else
                    return "hidden";
                
            },
            Owner2: function () {

                var userId = this.get('Owner');

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
            },
            isVisible: function () {
                return true;
                /*
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');

                return currentUserId === userId;
                */
            }
        };

        // Activities data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var activitiesDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: activityModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Events'
            },
            //serverFiltering: true,
            //works with serverFilersing     filter: { logic: "and", filters: [ { field: "Id", operator: "eq", value: "cddd7a50-c9f6-11e5-9e11-87c941a35a7e" } ] },
            //not working with serverFiltering     filter: { field: "Id", operator: "eq", value: "cddd7a50-c9f6-11e5-9e11-87c941a35a7e" },
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#no-activities-span').hide();
                } else {
                    $('#no-activities-span').show();
                }
            },
            sort: { field: 'Text', dir: 'asc' }
        });

        return {
            activities: activitiesDataSource
        };

    }());

    // Activities view model
    var activitiesViewModel = (function () {

        // Navigate to activityView When some activity is selected
        var activitySelected = function (e) {
            app.mobileApp.navigate('views/activityView.html?uid=' + e.data.uid);
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };

        // Logout user
        var logout = function () {

            app.helper.logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };
        
        var onShow = function() {  
            var buttongroup = $("#headerButtonGroup").data("kendoMobileButtonGroup");
            buttongroup.select(0);            
            activitiesModel.activities.read()
			.then(function(){
				try{
			    	//zz.show();
					console.log(activitiesModel.activities.total());
				} catch (err) {
                	console.log('Something went wrong:');
                	console.log(err);
            	}
               var view = activitiesModel.activities.view();
            },
            function(error){
                app.showError(error.message);
            });
       }

        return {
            activities: activitiesModel.activities,
            activitySelected: activitySelected,
            logout: logout,
            onShow: onShow
        };

    }());

    return activitiesViewModel;

}());