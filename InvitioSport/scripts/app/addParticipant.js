app.addParticipantView = kendo.observable({
        add: function() {
            
            if (!this.Username) {
                navigator.notification.alert("Please provide a username.");
                return;
            }
            var filter = { "Username": this.Username };
            app.everlive.Users.get(filter).then(function (userRaw) {
                var user = userRaw.result[0];
                
                var newItem = participantsDataSource.add({ Invit: this.InvitId, UserId: user.Id });
                participantsDataSource.one("sync", this.close);
                participantsDataSource.sync();            
            
                    //alert(JSON.stringify(data));
                    var acl =   {
                            $push: {
                                UsersCanRead: user.Id,
                                UsersCanUpdate: user.Id,
                                UsersCanDelete: user.Id
                            }
                        };
                    el.data('Participants').setAcl(acl, newItem.Id);
                },
                function(error){
                    //alert(JSON.stringify(error));
                }
            );            
        },
        close: function() {
            $("#addParticipant").data("kendoMobileModalView").close();
            this.InvitId = "";
            this.Username = "";
        }
    });
