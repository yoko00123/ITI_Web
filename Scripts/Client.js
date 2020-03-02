/*
 * nat 20170605
 * dependent on jquery, jquery.signalR
 */

(function (window) {
    window.client = function () {
        var server = 'http://localhost:14095/'; // Change this according to the server address
        var httpSignalr = server + '/signalr';
        var connection = $.hubConnection(httpSignalr, { useDefaultPath: false });
        var hub = connection.createHubProxy('client');
        var mainId = 3; // CRM = 1, Accounting = 2, IONS = 3; Note: The assigned value must replicate the tMain table of Unification Database.

        /**
         * User Defined Methods
         */

        var updateData = function (obj) {
            console.log('updateData: ', obj);
            var name = obj.Name;
            $.ajax({
                url: location.origin + '/Security/UpdateData',
                method: 'POST',
                data: { Data: JSON.stringify(obj.Data), Name: name }
            }).done(function (data) {
                var result = JSON.parse(data.ResultSet);
                console.log('Client UpdateData: ', data, obj);
                $(window.client).trigger('client.Updated', [name, result]);
            }).fail(function () {
            });
        }

        var pullTable = function (obj) {
            if (obj.Name == 'tUser') {
                //console.log('Client pullTable: ', obj);  
                $.ajax({
                    url: location.origin + '/api/DataService/LoadTable',
                    method: 'POST',
                    data: { Name: obj.Name }
                }).done(function (data) {
                    var result = data;
                    if (result == null) return;
                    var table = result.Tables;
                    if (table) {
                        $(window.client).trigger('client.UpdateData', [obj, table]);
                    }
					consle.log('Pull Success')
                }).fail(function (data) {
                    console.log('pullTable Fail: ', data);
                });
            }
        }
        /*End of User Defined Methods*/


        /**
         * Client Events trigger by SignalR
         */
        //this will be trigger if there is new update from the unified system.
        hub.on('onSync', function (data) {

            //data: {"Name":"tUser","Data":[{"ID":1174,"Name":"LUMAPAS, JONATHAN","IsActive":true,"DateTimeCreated":"2017-05-31T11:48:08.043","DateTimeModified":"2017-06-16T15:27:21.763","LogInName":"ITI-NAT","Password":"dev123sql","ImageFile":null,"ID_UserGroup":1,"ID_Employee":306,"CrmId":1174,"AccountingId":null,"IsCrmSync":false,"IsAccountingSync":false,"InvalidLogCount":0}]}
            /*note: used the 'data' when telling the server if the update is done, if crmId AccountingId  */
            /*ex: */
            //$(window.client).trigger('client.Updated', [data]);
            //logic here..
            console.log('CLient onSync: ', data);
        });

        //this will be trigger when the client connect to the unified system for the first time, this will be trigger multiple times based on the number of common tables in unified.
        hub.on('onRetrieveData', function (data) {
            //data: {"Id":1,"Name":"tCity","IsActive":true,"Status":1,"IsRetrieved":false,"IsRetrieving":false,"IsUpdating":false,"IsUpdated":false}
            //logic here..  
            pullTable(data)
        });


        //this will be trigger if the user clicked the link from the unified system
        hub.on('onLogIn', function (data) {
            //data: [{"LogInName":"ITI-NAT","Password":"dev123"}]
        });

        //this will be trigger if the user clicked the logout from the unified system
        hub.on('onLogOut', function () {
            //logic here...
            console.log('Client onLogout from unified: ');
            $(document).trigger('client.onLogOut'); //for crm only, remove if not
        });
        /*End of Client Events*/


        /**
         * Connection Events
         */
        connection.disconnected(function () {
            setTimeout(function () {
                //this code will trigger to reconnect this client if the unified system is not yet online. 
                window.client.init();
            }, 5000);
        });
        /*End of Connection Events*/


        /**
         * Public Methods
        */

        var guid = function () {
            var s4 = function () {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        /*End of Public Methods*/

        /**
         * Public Objects
        */

        var cookie = function (item) {

            var getAll = function () {
                var getCook = {};
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var arr = cookie.split("=");
                    getCook[arr[0].trim()] = arr[1];
                }

                return getCook;
            }

            var get = function (item) {
                return getAll()[item];
            }

            var set = function (data, exp) {
                var cookies = [];
                exp = exp ? ";expires=" + (typeof exp === "string" ? new Date(exp) : exp) : "";

                if (typeof data === "string") {
                    cookies.push(data + "" + exp);
                }

                if (typeof data === "object") {
                    var arr = Object.keys(data);
                    for (var i = 0; i < arr.length; i++) {
                        var item = arr[i];
                        cookies.push(item + "=" + data[item] + "" + exp);
                    }
                }

                for (var j = 0; j < cookies.length; j++)
                    document.cookie = cookies[j];
            }

            var remove = function (data) {
                var now = new Date();
                now.setFullYear(now.getFullYear() - 1);

                if (typeof data === "string") {
                    var newData = {}
                    newData[data] = null;
                    data = newData;
                }

                set(data, now);
            }
            return {
                getAll: getAll,
                get: get,
                set: set,
                remove: remove
            }
        }();

        /*Public Objects*/

        return {
            //connection: connection,
            //hub: hub,
            init: function () {
                var unifiedId = cookie.get("unifiedId");
                if (!unifiedId) {
                    unifiedId = guid();
                    cookie.set({ unifiedId: unifiedId });
                }

                connection.qs = { UnifiedId: unifiedId, mainId: mainId };
                var name = location.href;

                connection.start()
                    .done(function (data) {
                        /**
                         * Server Methods
                         */
                        var sessionId = name.substr(name.indexOf('?') + 1);
                        hub.invoke('validateConnection', sessionId); //this code will be used to automate the login, if session is valid, the onLogIn client event will be trigger
                        //this code will be used to send update to the unified system
                        $(window.client).on('client.UpdateData', function (d, e, f) {
                            var dt = JSON.stringify(f);
                            var client = JSON.stringify(e);
                            //console.log('Client UpdateData: ', f, e);
                            //dt: [{"ID":4,"ID_CompanyGroup":null,"ID_CompanyClassification":null,"ID_CompanyType":null,"ID_LogFileFormat":3,"Code":"ITI","Name":"IntelliSmart Technology Inc","Address":"16 A Catanduanes street, Bgry Paltok, Quezon City","ZipCode":null,"TIN":null,"SSSNo":"12343453453","PhilHealthNo":null,"HDMFNo":null,"TelNo":"365-4663 to 64 Fax No. 352-0377","President":null,"VicePresident":null,"TradeName":null,"Business":null,"Owner":null,"VatRegNo":null,"Overview":null,"ProductsAndServices":null,"ImageFile":"71c466c7-c6e3-4c6b-a27a-2b7e0c98a80a.jpg","SeqNo":null,"IsActive":true,"Comment":null,"BusinessNature":null,"BranchCode":null,"isCOAFinalized":false,"AcctPeriod":null,"AcctYear":null,"isYearly":false,"ReportImageFile":null,"ID_Branch":null},
                            //{"ID":11,"ID_CompanyGroup":null,"ID_CompanyClassification":null,"ID_CompanyType":null,"ID_LogFileFormat":1,"Code":"SC - ITI","Name":"SERVICE CENTER - INTELLISMART TECHNOLOGY INC.","Address":"85A Dangay Street, Veterans Village, Project 7, Quezon City","ZipCode":null,"TIN":null,"SSSNo":null,"PhilHealthNo":null,"HDMFNo":null,"TelNo":"2915018","President":"Gerry Sy","VicePresident":null,"TradeName":null,"Business":null,"Owner":"Gerry Sy","VatRegNo":null,"Overview":null,"ProductsAndServices":null,"ImageFile":null,"SeqNo":null,"IsActive":true,"Comment":null,"BusinessNature":null,"BranchCode":null,"isCOAFinalized":false,"AcctPeriod":null,"AcctYear":null,"isYearly":false,"ReportImageFile":null,"ID_Branch":34}]
                            //client: {"Id":3,"Name":"tCompany","IsActive":true,"Status":1,"IsRetrieved":false,"IsRetrieving":false,"IsUpdating":false,"IsUpdated":false}
                            //note: on client, Name property is required  
                            hub.invoke('updateData', client, dt, mainId)
                                .done(function () {

                                }).fail(function (data) {
                                    console.log('Client Fail: ', e);
                                });
								consle.log('Unification intiating..' , mainId)
                            if (mainId == 3) {
                                hub.invoke('IonsCheck', client, dt, mainId)
                                    .done(function (s) {
										console.log('Unification Starting...')
                                        $.ajax({
                                            url: location.origin + '/api/DataService/UpdateUser',
                                            method: 'POST',
                                            data: {
                                                Insert: LZString.compressToEncodedURIComponent(JSON.stringify(s.Insert)),
                                                Update: LZString.compressToEncodedURIComponent(JSON.stringify(s.Update)),
                                                TClient: LZString.compressToEncodedURIComponent(JSON.stringify(s.TClient)),
                                                TProjects: LZString.compressToEncodedURIComponent(JSON.stringify(s.TProjects)),
                                                TBranch: LZString.compressToEncodedURIComponent(JSON.stringify(s.TBranch)),
                                            }
                                        }).done(function (data) { 
                                            console.log('Unification : ' + (data.message === 'Success' ? data.message : 'Error'));
                                        }).fail(function (data) {
                                            console.log('pullTable Fail: ', data);
                                        });
                                    }).fail(function (d) {
                                        console.log('Insert Ions Fail: ', d)
                                    })
                            }
                        });

                        $(window.client).on('client.Updated', function (d, e, f) {

                            hub.invoke('clientUpdated', e, JSON.stringify(f), mainId);
                        });

                        $(window.client).on('client.LogOut', function () {

                        });

                        /*End of Server Methods*/

                    }).fail(function (data) {

                    });
            },
            guid: guid,
            cookie: cookie,
            pullTable: pullTable


        }
    }();


    window.client.init();

    /*For CRM Global Event*/
    $(window.client).on('client.SaveInfo', function (d, e) {
        console.log('client.SaveINfo: ', d, e);
        window.client.pullTable(e);
    });
    /*End of CRM Global Event*/

})(window);