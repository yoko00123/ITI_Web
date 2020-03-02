//T.put('c1063Dialog.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> Notes/Remarks' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<div scroll-glue="true" style="max-height: 200px; overflow-y: scroll; padding: 10px; background-color: rgb(249, 249, 249);">' +
//                '<div style="border-radius: 5px; margin-bottom: 8px; border: 1px solid rgb(233, 234, 233);" class="form_template" ng-repeat="data in Comments">' +
//                    '<div class="form-group" style="border-bottom: 1px solid rgb(164, 197, 164);">' +
//                        '<span><i class="fa fa-user" style="padding-right: 3px;"></i>{{data.Employee}}</span><span style="float: right;"><i class="fa fa-fw fa-calendar-o" style="padding-right: 3px;"></i>{{data.DateTimeCreated | date: "MM/dd/yyyy HH:mm:ss "}}</span>' +
//                    '</div>' +
//                    '<div class="form-group" style="word-break: break-word;">' +
//                        '<span ng-bind-html="data.Comment | trustedHTML"></span>' +
//                    '</div>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group input-group-lg" >' +
//                '<textarea redactor id="Comment" name="Comment" ng-model="Data.Comment" required style="height:100px;" class="form-control"></textarea>' +
//            '</div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Close</button>' +
//        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Post Comment</button>' +
//     '</div>'
//);
//T.put('c4084Dialog.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> Schedule Candidate' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<h2>{{Data.Name}}</h2><hr />' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.Schedule.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Date</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="input" >' +
//                        '<div class="input-group"><input type="text" name="Schedule" placeholder="Date"  required bs-datepicker data-container="body" date-to-iso class="form-control" ng-model="Data.Schedule"/>' +
//                            '<span class="input-group-addon"><i class="fa fa-calendar"></i></span>' +
//                        '</div>' +
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.Schedule.$error.required && mainform.$submitted\'>Date is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_Employee.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Interviewer</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" >' +
//                        '<select name="ID_Employee" ng-options="item.ID as item.Name for item in dropdown_source[4313]"  required class="form-control" ng-model="Data.ID_Employee">' +
//                        '</select><i></i>' + 
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.ID_Employee.$error.required && mainform.$submitted\'>Interviewer is required.</span>' +
//                '</div>' +
//            '</div>' +
//            //'<div class="form-group">' +
//            //    '<label class="control-label  col-md-2" >Level</label>' +
//            //    '<div class="col-md-10">' +
//            //        '<label class="select" >{{Data.RecruitmentProcess}}</label>' +
//            //        //'<span ng-show=\'nameDialog.ID_RecruitmentProcess.$error.required && mainform.$submitted\'>Level is required.</span>' +                    
//            //    '</div>' +
//            //'</div>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_RecruitmentProcess.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Level</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" >' +
//                        '<select ng-disabled="!NewProcess" name="ID_RecruitmentProcess" ng-options="item.ID as item.Name for item in dropdown_source[4307]"  required class="form-control" ng-model="Data.ID_RecruitmentProcess">' +
//                        '</select><i></i>' +
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.ID_RecruitmentProcess.$error.required && mainform.$submitted\'>Level is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  >' +
//                '<label class="control-label  col-md-2" >Notes/Remarks</label>' +
//                '<div class="col-md-10">' +
//                    '<textarea name="Comment" placeholder="Notes/Remarks" style="height:70px;" class="form-control" ng-model="Data.Comment"></textarea>' +
//                '</div>' +
//            '</div>' +
//            '<div class="clear"></div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
//     '</div>'
//);
//T.put('c1043Dialog.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> Batch Endorse' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_Designation.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Job Openings</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" >' +
//                        '<select name="ID_Designation" ng-change="ChangeRequestor()" ng-options="item.ID as item.Name for item in dropdown_source[\'Designation\']"  required class="form-control" ng-model="Data.ID_Designation">' +
//                        '</select><i></i>' +
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.ID_Designation.$error.required && mainform.$submitted\'>Job Opening is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_Employee.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Requestor</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" >' +
//                        '<select name="ID_Employee" ng-change="ChangeMRFNumber()" ng-options="item.ID as item.Name for item in dropdown_source[\'Requestor\']"  required class="form-control" ng-model="Data.ID_Employee">' +
//                        '</select><i></i>' +
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.ID_Employee.$error.required && mainform.$submitted\'>Requestor is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_ManpowerRequest.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >MRF #</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" >' +
//                        '<select name="ID_ManpowerRequest" ng-options="item.ID as item.Name for item in dropdown_source[\'MRFNumber\']"  required class="form-control" ng-model="Data.ID_ManpowerRequest">' +
//                        '</select><i></i>' +
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.ID_ManpowerRequest.$error.required && mainform.$submitted\'>MRF # is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="clear"></div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Endorse</button>' +
//     '</div>'
//);
//T.put('c1070Dialog.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> Remarks' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<div class="form-group input-group-lg">' +
//                '<textarea id="Comment" name="Comment" ng-model="Data.Comment" style="height:100px;" class="form-control"></textarea>' +
//            '</div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button type="button" ng-if="Data.Action == 1" class="btn btn-primary" ng-click="save()">Approve</button>' +
//        '<button type="button" ng-if="Data.Action == 2" class="btn btn-primary" ng-click="save()">Disapprove</button>' +
//        '<button type="button" ng-if="Data.Action == 3" class="btn btn-primary" ng-click="save()">Back to Requestor</button>' +
//     '</div>'
//);
//T.put('c4097Dialog.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> Remarks' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<div class="form-group input-group-lg">' +
//                '<textarea id="Comment" name="Comment" ng-model="Data.Comment" style="height:100px;" class="form-control"></textarea>' +
//            '</div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button type="button" class="btn btn-primary" ng-click="save()">Save</button>' +
//     '</div>'
//);
//T.put('c1043DialogAttachments.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> Upload Attachments' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_Persona.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Applicant</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" >' +
//                        '<select name="ID_Persona" ng-options="item.ID as item.Name for item in dropdown_source[\'Persona\']"  required class="form-control" ng-model="Data.ID_Persona">' +
//                        '</select><i></i>' +
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.ID_Employee.$error.required && mainform.$submitted\'>Applicant is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.Name.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >File(s)</label>' +
//                '<div class="col-md-10">' +
//                    '<div class=\'smart-form\'><label for=\'file\' class=\'input input-file\'><div class=\'button\'><input type=\'file\' name=\'Name\' ng-file-select=\'replaceTxtBox($files)\' file-input onclick=\'this.value = null\' multiple=\'\' required ng-model=\'Data.Name\'>Browse</div><input type=\'text\' id=\'fileholder\' placeholder=\'Select files...\' readonly=\'\'></label></div>' +
//                    '<span ng-show=\'nameDialog.Name.$error.required && mainform.$submitted\'>File(s) is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="clear"></div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Upload Attachments</button>' +
//     '</div>'
//);
//T.put('c1061DialogViewAttachments.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> File Attachments' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<div style=\'padding:5px;\' ng-repeat=\'file in Data\'><i class=\'fa fa-download\'></i><a ng-click=\'DownloadAttachment(file.Name_GUID)\' style=\'cursor:pointer;text-decoration:none;\'>&nbsp;&nbsp;{{file.Name}}</a> <i class=\'fa fa-times\' style=\'float:right;cursor:pointer;\' ng-click=\'RemoveFiles(file.Name_GUID,$index)\'></i></div>' +
//        '<div class="clear"></div>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Close</button>' +
//     '</div>'
//);
//T.put('c1061DialogUploadAttachments.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> Upload Attachments' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_Persona.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Applicant</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" >' +
//                        '<select name="ID_Persona" ng-options="item.ID as item.Name for item in dropdown_source[\'Persona\']"  required class="form-control" ng-model="Data.ID_Persona">' +
//                        '</select><i></i>' +
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.ID_Employee.$error.required && mainform.$submitted\'>Applicant is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.Name.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >File(s)</label>' +
//                '<div class="col-md-10">' +
//                    '<div class=\'smart-form\'><label for=\'file\' class=\'input input-file\'><div class=\'button\'><input type=\'file\' name=\'Name\' ng-file-select=\'replaceTxtBox($files)\' file-input onclick=\'this.value = null\' multiple=\'\' required ng-model=\'Data.Name\'>Browse</div><input type=\'text\' id=\'fileholder\' placeholder=\'Select files...\' readonly=\'\'></label></div>' +
//                    '<span ng-show=\'nameDialog.Name.$error.required && mainform.$submitted\'>File(s) is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="clear"></div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Upload Attachments</button>' +
//     '</div>'
//);
//T.put('c4078Dialog.html',
//    '<style>#upBtn { background: none; border: none; color: blue; box-shadow: none; } #upBtn:hover { text-decoration: underline;}</style>' +
//    '<div class="modal-header">' +
//        '<h4 ng-if="Data.Create == 1" class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> Schedule Candidate' +
//        '</h4>' +
//        '<h4 ng-if="Data.Create == 0" class="modal-title">' +
//            '<span ng-if="Data.Create == 0" class="fa fa-file-text-o"></span> Update Status' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<h2>{{Data.Name}}</h2><hr />' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.Schedule.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Date</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="input" >' +
//                        '<div class="input-group">' +
//                            '<input type="text" ng-disabled="Data.Create == 0" name="Schedule" placeholder="Date"  required bs-datepicker data-container="body" date-to-iso class="form-control" ng-model="Data.Schedule"/><span class="input-group-addon"><i class="fa fa-calendar"></i></span>' +
//                        '</div>' +
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.Schedule.$error.required && mainform.$submitted\'>Date is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_Employee.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Interviewer</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" >' +
//                        '<select name="ID_Employee" ng-disabled="Data.Create == 0" ng-options="item.ID as item.Name for item in dropdown_source[\'EmployeeSource\']"  required class="form-control" ng-model="Data.ID_Employee">' +
//                        '</select><i></i>' +
//                    '</label>' +
//                    '<span ng-show=\'nameDialog.ID_Employee.$error.required && mainform.$submitted\'>Interviewer is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_RecruitmentProcess.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Level</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" ><select ng-disabled="Data.Create == 0" name="ID_RecruitmentProcess" ng-options="item.ID as item.Name for item in dropdown_source[\'RecruitmentProcessSource\']"  required class="form-control" ng-model="Data.ID_RecruitmentProcess"></select><i></i></label>' +
//                    '<span ng-show=\'nameDialog.ID_RecruitmentProcess.$error.required && mainform.$submitted\'>Level is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div  ng-if="Data.Create == 0" class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_RecruitmentProcessStatus.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Status</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" ><select name="ID_RecruitmentProcessStatus" ng-options="item.ID as item.Name for item in dropdown_source[\'RecruitmentProcessStatusSource\']"  required class="form-control" ng-model="Data.ID_RecruitmentProcessStatus"></select><i></i></label>' +
//                    '<span ng-show=\'nameDialog.ID_RecruitmentProcessStatus.$error.required && mainform.$submitted\'>Level is required.</span>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  >' +
//                '<label class="control-label  col-md-2" >Notes/Remarks</label>' +
//                '<div class="col-md-10">' +
//                    '<textarea name="Comment" redactor style="height:100px;" class="form-control" ng-model="Data.Comment"></textarea>' +
//                '</div>' +
//            '</div>' +
//            '<div class="clear"></div>' +
//            '<hr />' +
//            '<div ng-if="Data.Create == 0" class="form-group" >' +
//                '<div style="padding:10px;">' +
//                    '<div style="font-weight:bold;margin-bottom:10px;"><i class="fa fa-lg fa-fw fa-file-o"></i> Attachments: (' +
//                        '<button type="button" id="upBtn" style="cursor: pointer;" class="btn btn-primary btn-file-upload">Add<input type="file" style="cursor: pointer;" ng-model="xxx" name="upFile" file-input="" ng-file-select="AddAttachment($files)" class="ng-pristine ng-valid"></button>)' +
//                    '</div>' +
//                    '<ul><li ng-repeat="data in attachments"><a ng-click="DownloadAttachment(data.Name_GUID)">{{data.Name}}</a> ( <a ng-click="removeAttachment(data.ID,data.Name_GUID,$index)">remove</a> )</li></ul>' +
//                '</div>' +
//            '</div>' +
//            '<div class="clear"></div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
//     '</div>'
//);
//T.put('cSendMail.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> Send Email' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.emailTo.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >To</label>' +
//                '<div class="col-md-10">' +
//                    '<input type="text" id="emailTo" name="emailTo" required ng-model="Data.emailTo" class="form-control">' +
//                '</div>' +
//                '<span ng-show=\'nameDialog.emailTo.$error.required && mainform.$submitted\'>To is required.</span>' +
//            '</div><br><br>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.Title.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Title</label>' +
//                '<div class="col-md-10">' +
//                    '<input type="text" id="Title" name="Title" required ng-model="Data.Title" class="form-control">' +
//                '</div>' +
//                '<span ng-show=\'nameDialog.Title.$error.required && mainform.$submitted\'>Title is required.</span>' +
//            '</div><br><br>' +
//            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.Body.$invalid && mainform.$submitted }"  >' +
//                '<label class="control-label  col-md-2" >Body</label>' +
//                '<div class="form-group input-group-lg">' +
//                    '<textarea id="Body" name="Body" ng-model="Data.Body" required style="height:100px;" class="form-control"></textarea>' +
//                '</div>' +
//                '<span ng-show=\'nameDialog.Body.$error.required && mainform.$submitted\'>Body is required.</span>' +
//            '</div>' +
//            '<div class="clear"></div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Send Email</button>' +
//     '</div>'
//);
T.put('c4078ForHiringDialog.html',
    '<style>#upBtn { background: none; border: none; color: blue; box-shadow: none; } #upBtn:hover { text-decoration: underline;}</style>' +
    '<div class="modal-header">' +
        '<h4 class="modal-title">' +
            '<span class="fa fa-file-text-o"></span>  For Hiring' +
        '</h4>' +
        '<h4 ng-if="Data.Create == 0" class="modal-title">' +
            '<span ng-if="Data.Create == 0" class="fa fa-file-text-o"></span> Update Status' +
        '</h4>' +
    '</div>' +
    '<div class="modal-body">' +
        '<ng-form name="nameDialog" novalidate role="form">' +
            '<h2>{{Data.Name}}</h2><hr />' +
            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_RecruitmentProcess.$invalid && mainform.$submitted }"  >' +
                '<label class="control-label  col-md-2" >Process</label>' +
                '<div class="col-md-10">' +
                    '<label class="select" ><select name="ID_RecruitmentProcess" ng-options="item.ID as item.Name for item in dropdown_source[4440]"  required class="form-control" ng-model="Data.ID_RecruitmentProcess"></select><i></i></label>' +
                    '<span ng-show=\'nameDialog.ID_RecruitmentProcess.$error.required && mainform.$submitted\'>Level is required.</span>' +
                '</div>' +
            '</div>' +
            '<div  class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_RecruitmentProcessStatus.$invalid && mainform.$submitted }"  >' +
                '<label class="control-label  col-md-2" >Status</label>' +
                '<div class="col-md-10">' +
                    '<label class="select" ><select name="ID_RecruitmentProcessStatus" ng-options="item.ID as item.Name for item in dropdown_source[4441]"  required class="form-control" ng-model="Data.ID_RecruitmentProcessStatus"></select><i></i></label>' +
                    '<span ng-show=\'nameDialog.ID_RecruitmentProcessStatus.$error.required && mainform.$submitted\'>Level is required.</span>' +
                '</div>' +
            '</div>' +
            '<div class="form-group"  >' +
                '<label class="control-label  col-md-2" >Notes/Remarks</label>' +
                '<div class="col-md-10">' +
                    '<textarea name="Comment" placeholder="Notes/Remarks" style="height:70px;" class="form-control" ng-model="Data.Comment"></textarea>' +
                '</div>' +
            '</div>' +
            '<div class="clear"></div>' +
            '<hr />' +
            '<div class="form-group" >' +
                '<div style="padding:10px;">' +
                    '<div style="font-weight:bold;margin-bottom:10px;"><i class="fa fa-lg fa-fw fa-file-o"></i> Attachments: (' +
                        '<button type="button" id="upBtn" style="cursor: pointer;" class="btn btn-primary btn-file-upload">Add<input type="file" style="cursor: pointer;" ng-model="xxx" name="upFile" file-input="" ng-file-select="onFileSelect($files)" class="ng-pristine ng-valid"></button>)' +
                    '</div>' +
                    '<ul><li ng-repeat="data in attachments"><a ng-click="DownloadAttachment(data.Name_GUID)">{{data.Name}}</a> ( <a ng-click="removeAttachment(data.ID,data.Name_GUID,$index)">remove</a> )</li></ul>' +
                '</div>' +
            '</div>' +
            '<div class="clear"></div>' +
         '</ng-form>' +
     '</div>' +
     '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
     '</div>'
);
//T.put('c1063Employees.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-user"></span> Employees - {{Title}} ({{Count}})' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//            '<div class="form_template" style="max-height: 200px; overflow-y: scroll;">' +
//                '<ul>' +
//                    '<li ng-repeat="data in EmployeeList"><a ui-sref=\'4065({ ID_4065:data.ID})\' ng-click="cancel()">{{data.Name}}</a></li>' +
//                '</ul>' +
//            '</div>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Close</button>' +
//     '</div>'
//);
T.put('c4083Dialog.html',
    '<style>#upBtn { background: none; border: none; color: blue; box-shadow: none; } #upBtn:hover { text-decoration: underline;}</style>' +
    '<div class="modal-header">' +
        '<h4 ng-if="Data.Create == 1" class="modal-title">' +
            '<span class="fa fa-file-text-o"></span> Schedule Candidate' +
        '</h4>' +
        '<h4 ng-if="Data.Create == 0" class="modal-title">' +
            '<span ng-if="Data.Create == 0" class="fa fa-file-text-o"></span> Update Status' +
        '</h4>' +
    '</div>' +
    '<div class="modal-body">' +
        '<ng-form name="nameDialog" novalidate role="form">' +
            '<h2>{{Data.Name}}</h2><hr />' +
            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.Schedule.$invalid && mainform.$submitted }"  >' +
                '<label class="control-label  col-md-2" >Date</label>' +
                '<div class="col-md-10">' +
                    '<label class="input" >' +
                        '<div class="input-group">' +
                            '<input type="text" ng-disabled="Data.Create == 0" name="Schedule" placeholder="Date"  required bs-datepicker data-container="body" date-to-iso class="form-control" ng-model="Data.Schedule"/><span class="input-group-addon"><i class="fa fa-calendar"></i></span>' +
                        '</div>' +
                    '</label>' +
                    '<span ng-show=\'nameDialog.Schedule.$error.required && mainform.$submitted\'>Date is required.</span>' +
                '</div>' +
            '</div>' +
            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_Employee.$invalid && mainform.$submitted }"  >' +
                '<label class="control-label  col-md-2" >Interviewer</label>' +
                '<div class="col-md-10">' +
                    '<label class="select" >' +
                        '<select name="ID_Employee" ng-disabled="Data.Create == 0" ng-options="item.ID as item.Name for item in dropdown_source[\'EmployeeSource\']"  required class="form-control" ng-model="Data.ID_Employee">' +
                        '</select><i></i>' +
                    '</label>' +
                    '<span ng-show=\'nameDialog.ID_Employee.$error.required && mainform.$submitted\'>Interviewer is required.</span>' +
                '</div>' +
            '</div>' +
            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_RecruitmentProcess.$invalid && mainform.$submitted }"  >' +
                '<label class="control-label  col-md-2" >Level</label>' +
                '<div class="col-md-10">' +
                    '<label class="select" ><select ng-disabled="Data.Create == 0" name="ID_RecruitmentProcess" ng-options="item.ID as item.Name for item in dropdown_source[\'RecruitmentProcessSource\']"  required class="form-control" ng-model="Data.ID_RecruitmentProcess"></select><i></i></label>' +
                    '<span ng-show=\'nameDialog.ID_RecruitmentProcess.$error.required && mainform.$submitted\'>Level is required.</span>' +
                '</div>' +
            '</div>' +
            '<div  ng-if="Data.Create == 0" class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_RecruitmentProcessStatus.$invalid && mainform.$submitted }"  >' +
                '<label class="control-label  col-md-2" >Status</label>' +
                '<div class="col-md-10">' +
                    '<label class="select" ><select name="ID_RecruitmentProcessStatus" ng-options="item.ID as item.Name for item in dropdown_source[\'RecruitmentProcessStatusSource\']"  required class="form-control" ng-model="Data.ID_RecruitmentProcessStatus"></select><i></i></label>' +
                    '<span ng-show=\'nameDialog.ID_RecruitmentProcessStatus.$error.required && mainform.$submitted\'>Level is required.</span>' +
                '</div>' +
            '</div>' +
            '<div class="form-group"  >' +
                '<label class="control-label  col-md-2" >Notes/Remarks</label>' +
                '<div class="col-md-10">' +
                    '<textarea name="Comment" redactor style="height:100px;" class="form-control" ng-model="Data.Comment"></textarea>' +
                '</div>' +
            '</div>' +
            '<div class="clear"></div>' +
            '<hr />' +
            '<div ng-if="Data.Create == 0" class="form-group" >' +
                '<div style="padding:10px;">' +
                    '<div style="font-weight:bold;margin-bottom:10px;"><i class="fa fa-lg fa-fw fa-file-o"></i> Attachments: (' +
                        '<button type="button" id="upBtn" style="cursor: pointer;" class="btn btn-primary btn-file-upload">Add<input type="file" style="cursor: pointer;" ng-model="xxx" name="upFile" file-input="" ng-file-select="AddAttachment($files)" class="ng-pristine ng-valid"></button>)' +
                    '</div>' +
                    '<ul><li ng-repeat="data in attachments"><a ng-click="DownloadAttachment(data.Name_GUID)">{{data.Name}}</a> ( <a ng-click="removeAttachment(data.ID,data.Name_GUID,$index)">remove</a> )</li></ul>' +
                '</div>' +
            '</div>' +
            '<div class="clear"></div>' +
         '</ng-form>' +
     '</div>' +
     '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
     '</div>'
);
T.put('c4083ForHiringDialog.html',
    '<style>#upBtn { background: none; border: none; color: blue; box-shadow: none; } #upBtn:hover { text-decoration: underline;}</style>' +
    '<div class="modal-header">' +
        '<h4 class="modal-title">' +
            '<span class="fa fa-file-text-o"></span>  For Hiring' +
        '</h4>' +
        '<h4 ng-if="Data.Create == 0" class="modal-title">' +
            '<span ng-if="Data.Create == 0" class="fa fa-file-text-o"></span> Update Status' +
        '</h4>' +
    '</div>' +
    '<div class="modal-body">' +
        '<ng-form name="nameDialog" novalidate role="form">' +
            '<h2>{{Data.Name}}</h2><hr />' +
            '<div class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_RecruitmentProcess.$invalid && mainform.$submitted }"  >' +
                '<label class="control-label  col-md-2" >Process</label>' +
                '<div class="col-md-10">' +
                    '<label class="select" ><select name="ID_RecruitmentProcess" ng-options="item.ID as item.Name for item in dropdown_source[4440]"  required class="form-control" ng-model="Data.ID_RecruitmentProcess"></select><i></i></label>' +
                    '<span ng-show=\'nameDialog.ID_RecruitmentProcess.$error.required && mainform.$submitted\'>Level is required.</span>' +
                '</div>' +
            '</div>' +
            '<div  class="form-group"  ng-class="{ \'has-error\' : nameDialog.ID_RecruitmentProcessStatus.$invalid && mainform.$submitted }"  >' +
                '<label class="control-label  col-md-2" >Status</label>' +
                '<div class="col-md-10">' +
                    '<label class="select" ><select name="ID_RecruitmentProcessStatus" ng-options="item.ID as item.Name for item in dropdown_source[4441]"  required class="form-control" ng-model="Data.ID_RecruitmentProcessStatus"></select><i></i></label>' +
                    '<span ng-show=\'nameDialog.ID_RecruitmentProcessStatus.$error.required && mainform.$submitted\'>Level is required.</span>' +
                '</div>' +
            '</div>' +
            '<div class="form-group"  >' +
                '<label class="control-label  col-md-2" >Notes/Remarks</label>' +
                '<div class="col-md-10">' +
                    '<textarea redactor name="Comment" placeholder="Notes/Remarks" style="height:70px;" class="form-control" ng-model="Data.Comment"></textarea>' +
                '</div>' +
            '</div>' +
            '<div class="clear"></div>' +
            '<hr />' +
            '<div class="form-group" >' +
                '<div style="padding:10px;">' +
                    '<div style="font-weight:bold;margin-bottom:10px;"><i class="fa fa-lg fa-fw fa-file-o"></i> Attachments: (' +
                        '<button type="button" id="upBtn" style="cursor: pointer;" class="btn btn-primary btn-file-upload">Add<input type="file" style="cursor: pointer;" ng-model="xxx" name="upFile" file-input="" ng-file-select="onFileSelect($files)" class="ng-pristine ng-valid"></button>)' +
                    '</div>' +
                    '<ul><li ng-repeat="data in attachments"><a ng-click="DownloadAttachment(data.Name_GUID)">{{data.Name}}</a> ( <a ng-click="removeAttachment(data.ID,data.Name_GUID,$index)">remove</a> )</li></ul>' +
                '</div>' +
            '</div>' +
            '<div class="clear"></div>' +
         '</ng-form>' +
     '</div>' +
     '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
     '</div>'
);
//T.put('c4083AddIntComment.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> {{Title}}' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<div ng-if="Data.Action==1" class="form-group"  ng-class="{ \'has-error\' : nameDialog.Comment.$invalid && mainform.$submitted }"  >' +
//                '<div class="form-group input-group-lg">' +
//                    '<textarea ng-if="isCanSave" id="Comment" redactor name="Comment" ng-model="Data.Comment" required style="height:100px;" class="form-control"></textarea>' +
//                    '<div ng-if="!isCanSave" ng-bind-html="Data.Comment | trustedHTML" class="ng-binding ng-scope"></div>' +
//                '</div>' +
//                '<span ng-show=\'nameDialog.Comment.$error.required && mainform.$submitted\'>Comment is required.</span>' +
//            '</div>' +
//            '<div ng-if="Data.Action==2" class="form-group">' +
//                            '<label ng-repeat="rdb in source">' +
//                                '<input type="radio" name="ID_RecruitmentProcessStatus" class="form-control" ng-model="Data.ID_RecruitmentProcessStatus" ng-value="rdb.ID" />' +
//                                '<span style="padding:5px;">{{rdb.Name}}</span>' +
//                            '</label>' +
//                        '</div>' +
//            '<div class="clear"></div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button ng-if="isCanSave" type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">{{btnTitle}}</button>' +
//     '</div>'
//);
//T.put('TemplateList.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-user"></span> {{Title}} ({{Count}})' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//            '<div class="form_template" style="max-height: 200px; overflow-y: scroll;">' +
//                '<table class="table">' +
//                    '<thead>' +
//                        '<tr>' +
//                            '<th></th>' +
//	                        '<th>Name</th>' +
//	                        '<th>File</th>' +
//                        '</tr>' +
//                    '</thead>' +
//                    '<tbody>' +
//                        '<tr ng-repeat="data in source">' +
//                            '<td><span><a ng-click="DownloadAttachment(data.AttachedFileName_GUID,data.AttachedFileName)"><i class="fa fa-lg fa-fw fa-download"></i></a></span></td>' +
//                            '<td>{{data.Name}}</td>' +
//                            '<td>{{data.AttachedFileName}}</td>' +
//                        '</tr>' +
//                    '</tbody>' +
//                '</table>' +
//            '</div>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Close</button>' +
//     '</div>'
//);
//T.put('c4084DialogForHiring.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file-text-o"></span> {{Title}}' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//        '<ng-form name="nameDialog" novalidate role="form">' +
//            '<h2>{{Data.Name}}</h2><hr />' +
//            '<div class="form-group">' +
//                        '<label class="control-label  col-md-2 bold">Document<span class="required">* </span></label>' +
//                        '<div class="col-md-10" style="margin-bottom: 5px;">' +
//                            '<div class="smart-form input-group" style="width:100%">' +
//                                '<label for="file" class="input input-file">' +
//                                    '<div class="button"><input type="file" name="FileName" file-input ng-file-select="AddFile($files) " onclick="this.value = null" required ng-model="Data.FileName">Browse</div>' +
//                                    '<input type="text" ng-model="Data.FileName" placeholder="Select files..." readonly="">' +
//                                '</label>' +
//                                '<span class="input-group-addon" ng-if="Data.ID > 0 && Data.FileName !== null" download-file="{{Data.File_GUID}}" filename="{{Data.FileName}}"><i class="fa fa-download"></i></span>' +
//                            '</div>' +
//                        '</div>' +
//                    '</div>' +
//            '<div class="form-group" ng-if="Data.ID_RecruitmentProcess == 5">' +
//                '<label class="control-label  col-md-2" >Approver</label>' +
//                '<div class="col-md-10">' +
//                    '<label class="select" ><select disabled name="ID_Employee" ng-options="item.ID as item.Name for item in dropdown_source[4313]"  required class="form-control" ng-model="Data.ID_Employee"></select><i></i></label>' +
//                '</div>' +
//            '</div>' +
//            '<div class="form-group"  >' +
//                '<label class="control-label  col-md-2" >Notes/Remarks</label>' +
//                '<div class="col-md-10">' +
//                    '<textarea name="Comment" placeholder="Notes/Remarks" style="height:70px;" class="form-control" ng-model="Data.Comment"></textarea>' +
//                '</div>' +
//            '</div>' +
//            '<div class="clear"></div>' +
//         '</ng-form>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
//        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button>' +
//     '</div>'
//);
// T.put('c4103Template.html',
//    '<div class="modal-header">' +
//        '<h4 class="modal-title">' +
//            '<span class="fa fa-file"></span> {{Template}} Template(s)' +
//        '</h4>' +
//    '</div>' +
//    '<div class="modal-body">' +
//            '<div class="form_template" style="max-height: 200px; overflow-y: scroll;">' +
//                '<ul>' +
//                    '<li ng-repeat="data in Templates"><a ng-click="LoadTemplate(data)">{{data.AttachedFileName}}</a></li>' +
//                '</ul>' +
//            '</div>' +
//     '</div>' +
//     '<div class="modal-footer">' +
//        '<button type="button" class="btn btn-default" ng-click="cancel()">Close</button>' +
//     '</div>'
//);
T.put('c4188Dialog.html',
    '<div class="modal-header">' +
       '<h4 class="modal-title">' +
           '<span class="fa fa-file"></span> Password' +
       '</h4>' +
   '</div>' +
   '<div class="modal-body" style="max-height: 1200px;">' +
        '<ng-form name="nameDialog" novalidate role="form">' +
            '<div class="form-group" ng-if="Data.IsFirstLog == 0">' +
            //'<div class="form-group">' +
                '<label class="control-label  col-md-3 bold">Password</label>' +
                '<div class="col-md-8">' +
                    '<input type="password" name="Password" placeholder="Password" class="form-control" ng-model="Data.Password" />' +
                '</div>' +
            '</div>' +
            '<div class="form-group" >' +
                '<label class="control-label  col-md-3 bold">New Password</label>' +
                '<div class="col-md-8">' +
                    '<input type="password" name="NewPassword" placeholder="New Password" class="form-control" ng-model="Data.NewPassword" />' +
                '</div>' +
                '<label class="control-label  col-md-3 bold">Confirm Password</label>' +
                '<div class="col-md-8">' +
                    '<input type="password" name="ConfirmPassword" placeholder="Confirm Password" class="form-control" ng-model="Data.ConfirmPassword"/>' +
            '</div>' +
         '</ng-form>' +
     '</div>' +
     '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" ng-click="cancel()">Close</button>' +
        '<button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Change Password</button>' +
     '</div>'
);