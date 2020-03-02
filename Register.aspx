<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Register.aspx.vb" Inherits="Register" %>
<%@ Import Namespace="System.Web.Optimization" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <%--<meta http-equiv="X-UA-Compatible" content="IE=EDGE" />--%>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>InSys HRMS</title>

    <asp:PlaceHolder ID="PlaceHolder1" runat="server">        
        <%: Styles.Render("~/Styles/System/system-css") %> 
        <%: Styles.Render("~/Styles/System/additional-css") %> 
    </asp:PlaceHolder>
    <link rel="stylesheet" type="text/css" href="Styles/Skins/green.css"/>
</head>
<body ng-app="app" ng-controller="RegisterCntrl" class="green"><!--menu-on-top fixed-header fixed-navigation -->
    <style>
    .form-main,
    .form-border
    {
        border: 2px solid rgb(58, 109, 58);
    }
    .form-border1
    {
        border: 1px solid rgb(58, 109, 58);
    }
    .form-border-bottom
    {
        border-bottom: 2px solid rgb(58, 109, 58);
    }
    .form-border-right
    {
        border-right: 2px solid rgb(58, 109, 58);
    }
    .form-main .form-header {
        background-color: #00714b;
        color: white;
        padding: 8px;
    }
    .endorsed {
        color: green !important;
        font-weight: bold;
        margin-top: 8px;
        float:right;
    }

        .endorsed .profile-content .name-company strong a {
            color: green !important;
        }

        .endorsed .endorsed-label {
            float: right;
            color: rgb(0, 128, 0);
            font-size: 40px;
            opacity: .1;
        }
</style>

<%--<script type="text/ng-template" id="pageButtons">
		<ol class="breadcrumb">
			<li><button  type='button' class='btn btn-primary' ng-form-save btnid='1025' ><i class='fa fa-save'></i>Save</button></li>
		</ol>
</script>--%>
<div class="button-holder ng-scope">
    <ol class="breadcrumb">
        <li><button  type='button' class='btn btn-primary' ng-click="save()" btnid='1025' ><i class='fa fa-save'></i>Save</button></li>
    </ol>
</div>

<div class='content'>

<form novalidate name='mainform'>

<div class='clear'></div>
<div class='tabs-top' ng-model='tabs.activeTab'>
    <div title='Personnel Information'>
        <div class='form_template form-horizontal' >
        <fieldset>
        <legend>Personnel Information</legend>
        <div class="form-main" style="position:relative;width:100%;height:100%;">

            <div class="col-md-12">
                <div class="col-md-4"><img ng-src="Contents/Company/Ayala-land.png" width="158px" height="36px" style="margin:7px;" /></div>
                <div class="col-md-4" style="font-family:Arial;font-size:24px;padding-top:15px;line-height:20px;">Personal Information Form</div>
                <div class="col-md-4" style="padding-top:15px;">
                    <div class='form-group col-md-12'>
                        <label class='control-label col-md-6' >Date Filled Up</label>
                        <div class='col-md-6'>
                            <div class='input-group'><input type="text" name="ApplicationDate" disabled date-format="MM/dd/yyyy" bs-datepicker data-container="body" class="form-control" ng-model="Master.ApplicationDate"/><span class='input-group-addon'><i class='fa fa-calendar'></i></span></div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />

            <div class="form-header col-md-12">
                <ol style="list-style-type:upper-alpha;font-family:Arial;font-size:24px;line-height:20px;">
                    <li>PERSONNEL INFORMATION</li>
                </ol>
            </div>
            <div style="position:relative;">
				<div class="col-md-10">
					<table width="100%">
						<tr>
							<td>
								<div style="float:left;" class='col-md-6'  ng-class="{ 'has-error' : mainform.LastName.$invalid && mainform.$submitted }"  >
								<label class='control-label col-md-3' >Last Name <span class='required'>* </span></label>
								<div class='col-md-9'>
								<input type="text" name="LastName" ng-capitalize required class="form-control" ng-keypress="IgnoreNumbers($event)" ng-model="Master.LastName"/>
								<span style="color:red;" ng-show="mainform.LastName.$error.pattern">Last name shouldn't contain special characters or numbers.</span>
								</div>
								</div>
								
								<div style="float:left;" class='col-md-6'  ng-class="{ 'has-error' : mainform.FirstName.$invalid && mainform.$submitted }"  >
								<label class='control-label col-md-3' >First Name <span class='required'>* </span></label>
								<div class='col-md-9'>
								<input type="text" name="FirstName" ng-capitalize required class="form-control" ng-keypress="IgnoreNumbers($event)" ng-model="Master.FirstName"/>
									<span style="color:red;" ng-show="mainform.FirstName.$error.pattern">First name shouldn't contain special characters or numbers.</span>
								</div>
								</div>
							</td>
							
						</tr>
						<tr>
							<td>
								<div style="float:left;" class='col-md-4'  ng-class="{ 'has-error' : mainform.MiddleName.$invalid && mainform.$submitted }"  >
								<label class='control-label col-md-3' >Middle Name <span class='required'>* </span></label>
								<div class='col-md-9'>
								<input type="text" name="MiddleName" ng-capitalize required class="form-control" ng-keypress="IgnoreNumbers($event)" ng-model="Master.MiddleName"/>
								<span style="color:red;" ng-show="mainform.MiddleName.$error.pattern">Middle name shouldn't contain special characters or numbers.</span>
								</div>
								</div>
								
								<div style="float:left;" class='col-md-4'  >
								<label class='control-label col-md-3' >Suffix</label>
								<div class='col-md-9'>
								<input type="text" style="text-transform:uppercase;" name="Suffix" class="form-control" ng-keypress="IgnoreNumbers($event)" ng-model="Master.Suffix"/>
								<span style="color:red;" ng-show="mainform.Suffix.$error.pattern">Suffix shouldn't contain special characters or numbers.</span>
								</div>
								</div>
								
								<div style="float:left;" class='col-md-4'  >
								<label class='control-label col-md-3' >Nick Name</label>
								<div class='col-md-9'>
								<input type="text" name="NickName" ng-capitalize class="form-control" ng-keypress="IgnoreNumbers($event)" ng-model="Master.NickName"/>
								<span style="color:red;" ng-show="mainform.NickName.$error.pattern">Nick name shouldn't contain special characters or numbers.</span>
								</div>
								</div>
							</td>
							<td>&nbsp;</td>
						</tr>
					  
					</table>
				</div>
				<div class="col-md-1">
					<img ng-if="Master.ImageFile_GUID == null" src="Contents/Photos/avatar.png" id="ImagePreview" alt="Upload Image" style="width:100px;height:100px;cursor:pointer;padding:10px;margin-left:5px;" readonly="" ng-click="toggleUploadFile()" />
					<img ng-if="Master.ImageFile_GUID != null" src="Upload/{{Master.ImageFile_GUID}}" id="Img1" alt="Upload Image" style="width:100px;height:100px;cursor:pointer;padding:10px;margin-left:5px;" readonly="" ng-click="toggleUploadFile()" />
					<input type='file' id="ImageFile" style="display:none;" name='ImageFile' file-input ng-file-select='onFileSelect($files,1061,"ImageFile", Master.ID, $event) ' onclick='this.value = null' ng-model='Master.ImageFile' />
					<input type='text' style="display:none;" ng-model='Master.Name' placeholder='Select files...' readonly='' />
				</div>
				<div class="clear">&nbsp;</div>
                <!--<img style="width:150px;height:150px;" src="" />-->
            </div>
            <hr class="form-border1" style="margin:0;padding:0;" />
            <div class="form-border-bottom" style="position:relative;width:100%;margin:0;">
                <table width="100%">
                    <tr>
                        <td class="form-border-right" style="width:30%;">
                            <div style="margin-top:5px;" class='form-group col-md-12' ng-class="{ 'has-error' : mainform.MobileNo.$invalid && mainform.$submitted }"  >
                            <label class='control-label  col-md-2' >Mobile No. <span class='required'>* </span></label>
                            <div class='col-md-10'>
                            <input type="text" name="MobileNo" required class="form-control" ng-minlength="11" ng-maxlength="11" ng-pattern="/^[0-9]*$/" ng-model="Master.MobileNo"/>
                            <span style="color:red;" ng-show="mainform.MobileNo.$error.pattern">Mobile number must be numbers only.</span>
                            <span style="color:red;" ng-show="mainform.MobileNo.$error.minlength || mainform.MobileNo.$error.maxlength">Mobile number should be 11 digits only.</span>
                            </div>
                            </div>

                            <div class='form-group col-md-12'  >
                            <label class='control-label  col-md-2' >Home / Tel No.</label>
                            <div class='col-md-10'>
                            <input type="text" name="TelNo" class="form-control" ng-minlength="6" ng-maxlength="9" ng-pattern="/^[0-9-]*$/" ng-model="Master.TelNo"/>
                            <span style="color:red;" ng-show="mainform.TelNo.$error.pattern">Home/Tel number must be numbers only.</span>
                            <span style="color:red;" ng-show="mainform.TelNo.$error.minlength || mainform.TelNo.$error.maxlength">Home/Tel number should be atleast 6 but no more than 9 digits only.</span>
                            </div>
                            </div>

                            <div class='form-group col-md-12' ng-class="{ 'has-error' : mainform.EmailAddress.$invalid && mainform.$submitted }"  >
                            <label class='control-label  col-md-2' >Email Address <span class='required'>* </span></label>
                            <div class='col-md-10'>
                            <input type="text" name="EmailAddress" ng-pattern="/^[a-z0-9A-Z]+[A-Za-z0-9._]+@[A-Za-z0-9]+\.[A-Za-z0-9.]?.[A-Za-z0-9.]{1,5}$/" required class="form-control" ng-model="Master.EmailAddress"/>
                            <span style="color:red;" ng-show="mainform.EmailAddress.$error.pattern">Invalid e-mail.</span>
                            </div>
                            </div>
                        </td>
                        <td style="width:48%;">
                            
                                <div class='form-group col-md-12' ng-class="{ 'has-error' : mainform.ID_City.$invalid && mainform.$submitted }">
                                    <label class='control-label  col-md-2'>City <span class='required'>* </span></label>
                                    <div class='col-md-10'>
                                        <select name="ID_City" ng-options="item.ID as item.Name for item in dropdown_source[9420]" required class="form-control" ng-model="Master.ID_City"></select>
                                    </div>
                                </div>

                                <div style="margin-left:5px;width:100%;margin-top:0;" class='form-group' ng-class="{ 'has-error' : mainform.PermanentAddress.$invalid && mainform.$submitted }">
                                    <label style="width:1000%;text-align:left;" class='control-label  col-md-2'>Permanent Address <span class='required'>* </span><small><i style="color:#aaa">(Unit Number, House/Building/Street Number + Street Name , Barangay/District Name, City/Municipality)</i></small></label>
                                    <div class='col-md-12'>
                                        <textarea name="PermanentAddress" placeholder="Unit Number, House/Building/Street Number + Street Name , Barangay/District Name, City/Municipality" required style='height:70px;' class="form-control" ng-model="Master.PermanentAddress"></textarea>
                                    </div>
                                </div>
</td>
                    </tr>
                </table>
            </div>
            <div class="form-border-bottom" style="position:relative;width:100%;margin:0;">
                <table width="100%">
                    <tr>
                        <td class="form-border-right" style="width:30%;">
                            <div style="margin-top:-10%;">
                                <div style="margin-top:5px;" class='form-group col-md-12'  ng-class="{ 'has-error' : mainform.BirthDate.$invalid && mainform.$submitted }"  >
                                <label class='control-label  col-md-2' >Birth Date <span class='required'>* </span></label>
                                <div class='col-md-10'>
                                <div class='input-group'>
                                <input type="text" id="bdate" name="BirthDate" placeholder="mm/dd/yyyy" ng-change="formatDate()" date-format="MM/dd/yyyy" data-max-date="{{minDate}}" data-start-date="{{sDate}}" required data-container="body" class="form-control" ng-model="Master.BirthDate"/>
					            <span class='input-group-addon'><i class='fa fa-calendar'></i></span>
                                </div>
                                <span style="color:red;" ng-show="mainform.BirthDate.$error.pattern">Invalid BirthDate.</span>
                                </div>
                                </div>

                                <div class='form-group col-md-12' ng-class="{ 'has-error' : mainform.Age.$invalid && mainform.$submitted }">
                                <label class='control-label2 col-md-2' >Age</label>
                                <div class='col-md-10'>
                                <input type="hidden" ng-min="10" class="form-control" name="Age" ng-model="Master.Age" />
                                <span class="control-label">{{getAge(Master.BirthDate)}}</span>
                                    <br />
                                <span style="color:red;" ng-show="mainform.Age.$error.ngMin">Age must not be less than 10 years old.</span>
                                </div>
                                </div>

                                <div class='form-group col-md-12'  ng-class="{ 'has-error' : mainform.ID_CivilStatus.$invalid && mainform.$submitted }"  >
                                <label class='control-label  col-md-2' >Civil Status <span class='required'>* </span></label>
                                <div class='col-md-10'>
                                <select name="ID_CivilStatus" ng-options="item.ID as item.Name for item in dropdown_source[1151]"  required class="form-control" ng-model="Master.ID_CivilStatus"></select>
                                </div>
                                </div>

                                <div class='form-group col-md-12'  ng-class="{ 'has-error' : mainform.ID_Citizenship.$invalid && mainform.$submitted }"  >
                                <label class='control-label  col-md-2' >Citizenship <span class='required'>* </span></label>
                                <div class='col-md-10'>
                                <select name="ID_Citizenship" ng-options="item.ID as item.Name for item in dropdown_source[1152]"  required class="form-control" ng-model="Master.ID_Citizenship"></select>
                                </div>
                                </div>

                                <div class='form-group col-md-12'  ng-class="{ 'has-error' : mainform.ID_Gender.$invalid && mainform.$submitted }"  >
                                <label class='control-label  col-md-2' >Gender <span class='required'>* </span></label>
                                <div class='col-md-10'>
                                <select name="ID_Gender" ng-options="item.ID as item.Name for item in dropdown_source[1153]"  required class="form-control" ng-model="Master.ID_Gender"></select>
                                </div>
                                </div>
                            </div>
                        </td>
                        <td style="width:48%;">
                            <table style="margin-left:-5px;" width="101.5%">
                                <tr class="form-border1" style="border-top:none;border-left:none;border-right:none;border-bottom:2px solid rgb(58, 109, 58);">
                                    <td class="col-md-12">
                                        <div class="form-group col-md-12" ng-class="{ 'has-error' : mainform.PositionDesired.$invalid && mainform.$submitted }">
                                            <label class='control-label col-md-2' >Position Desired <span class='required'>* </span></label>
                                            <div class='col-md-10'>
                                                <input type="text" name="PositionDesired" required class="form-control" ng-model="Master.PositionDesired"/>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-12" ng-class="{ 'has-error' : mainform.SalaryDesired.$invalid && mainform.$submitted }">
                                            <label class='control-label col-md-2' >Expected Salary <span class='required'>* </span></label>
                                            <div class='col-md-10'>
                                                <input type="text" name="SalaryDesired" required class="form-control" ng-model="Master.SalaryDesired"/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="height:150px;overflow-y:auto;margin-top:-5px;margin-bottom:5px;">
                                            <table style="margin-top:20px;margin-bottom:15px;" width="100%">
                                                <tr>
                                                    <td colspan="2">
                                                        <table class="table table-striped table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>License No</th>
																    <th>Name</th>
																    <th>Date</th>
																    <th style="width:24px;"><a style="font-size:16px;" ng-click="AddNewRow(4238)" mid="4238" mtype="14"><i class="fa fa-plus"></i></a></th>
															    </tr>
														    </thead>
                                                            <tr ng-repeat="data in Detail[4238]">
																<td>
																	<input type="text" name="LicenseNo" required class="form-control" ng-model="data.LicenseNo"/>
																</td>
																<td>
																	<input type="text" typeahead-append-to-body='true' typeahead='item as item for item in text_autocomplete_source[9424] | filter:$viewValue | limitTo:10 ' name="LicenseName"  class="form-control" ng-model="data.LicenseName"/>
																</td>
																<td>
																	<input class='form-control'  date-format="MM/dd/yyyy" bs-datepicker data-container="body" ng-model="data.LicenseDate"/>
																</td>
																<td>
																	<a ng-click="removeLiRow(4238,$index,data.ID)"><i style='color:red;'  class="fa fa-minus-circle"></i></a>
																</td>
															</tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="form-header">
                <ol start="2" style="list-style-type:upper-alpha;font-family:Arial;font-size:24px;line-height:20px;">
                    <li>QUESTIONNAIRE</li>
                </ol>
            </div>
            <div style="position:relative;margin-top:5px;">
                <table>
                    <tr>
                        <td>
                            <div class="col-md-12">
                                <ol style="list-style-type: decimal;">
                                    <div class="col-md-12">
                                        <li class="col-md-12" ng-repeat="(key, value) in Detail[2070] | groupBy: 'Question'">
                                            <div>{{key}}</div>
                                            <div class="col-md-12" style="padding:5px;" ng-repeat="choice in value" ng-form name="x">
                                                <label class="control-label col-md-1">{{choice.Choices}}</label>
                                                <div ng-if="choice.ID_QuestionaireType==1" class="col-md-1"><input style="height:20px;" type="checkbox" name='IsCheckAnswer' class='form-control' ng-model='choice.IsCheckAnswer'></div>
                                                <div ng-if="choice.ID_QuestionaireType==2 && choice.IsRequired == 1" class="col-md-10" ng-class="{ 'has-error' : x.TextAreaAnswer.$invalid && mainform.$submitted }"><textarea name='TextAreaAnswer' required style='height:60px;' class='form-control' ng-model='choice.TextAreaAnswer'></textarea></div>
                                                <div ng-if="choice.ID_QuestionaireType==2 && choice.IsRequired == 0" class="col-md-10"><textarea name='TextAreaAnswer' style='height:60px;' class='form-control' ng-model='choice.TextAreaAnswer'></textarea></div>
                                                <div>
                                                    <input type='hidden' name='ID_Persona' class='form-control' ng-model='choice.ID_Persona'/>
                                                    <input type='hidden' name='ID_Questionaire_Details' class='form-control' ng-model='choice.ID_Questionaire_Details'/>
                                                    <input type='hidden' name='ID' class='form-control' ng-model='choice.ID'/>
                                                </div>
                                            </div>
                                        </li>
                                
                                    </div>
                            
                                </ol>
                        
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="form-header">
                <ol start="3" style="list-style-type:upper-alpha;font-family:Arial;font-size:24px;line-height:20px;">
                    <li>
                        EMPLOYMENT HISTORY
                        <div style="font-family: Arial; font-size: 12px; color: white;"><i>(Indicate last 4 companies worked with; start from the most recent; skip if not applicable.)</i></div>
                    </li>
                </ol>
            </div>
            <table width="100%">
                <tr>
                    <td>
                        <div style="position:relative;">
                            <div class="col-md-12 form-border" style="padding:5px;position:relative;left:-2px;width:100.3%;">
                                <div class="col-md-12 non-mobile">
                                    <div style="text-align:center;" class="col-md-4">&nbsp;</div>
                                    <div style="text-align:center;" class="col-md-2">Current</div>
                                    <div style="text-align:center;" class="col-md-2">Previous</div>
                                    <div style="text-align:center;" class="col-md-2">Previous</div>
                                    <div style="text-align:center;" class="col-md-2">Previous</div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4" style="padding: 25px 5px;height: 40px;">Company Name</div>
                                    <div class="col-md-2" ng-repeat="data in Detail[2066]">
                                        <div style="padding:5px;" class="col-md-12"><textarea placeholder="{{Header[$index]}}" name='Company' style='height:40px;' class='form-control' ng-model='data.Company'></textarea></div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4" style="padding: 25px 5px;height: 40px;">Position Title</div>
                                    <div class="col-md-2" ng-repeat="data in Detail[2066]">
                                        <div style="padding:5px;" class="col-md-12"><textarea placeholder="{{Header[$index]}}" name='Designation' style='height:40px;' class='form-control' ng-model='data.Designation'></textarea></div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4" style="padding: 25px 5px;height: 40px;">Employment Status</div>
                                    <div class="col-md-2" ng-repeat="data in Detail[2066]">
                                        <div style="padding:5px;" class="col-md-12"><textarea placeholder="{{Header[$index]}}" name='EmploymentStatus' style='height:40px;' class='form-control' ng-model='data.EmploymentStatus'></textarea></div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4" style="padding: 25px 5px;height: 40px;">Tenure/No. of years worked</div>
                                    <div class="col-md-2" ng-repeat="data in Detail[2066]">
                                        <div style="padding:5px;" class="col-md-12"><textarea placeholder="{{Header[$index]}}" ng-keypress="IgnoreCharacters($event)" name='YearsOfService' ng-numeric-only style='height:40px;' class='form-control' ng-model='data.YearsOfService'></textarea></div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4" style="padding: 25px 5px;height: 40px;">Reason for Leaving</div>
                                    <div class="col-md-2" ng-repeat="data in Detail[2066]">
                                        <div style="padding:5px;" class="col-md-12"><textarea placeholder="{{Header[$index]}}" name='ReasonForLeaving' style='height:40px;' class='form-control' ng-model='data.ReasonForLeaving'></textarea></div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4" style="padding: 25px 5px;height: 40px;">Immediate Supervisor's Name</div>
                                    <div class="col-md-2" ng-repeat="data in Detail[2066]">
                                        <div style="padding:5px;" class="col-md-12"><textarea placeholder="{{Header[$index]}}" name='ImmediateSupervisor' style='height:40px;' class='form-control' ng-model='data.ImmediateSupervisor'></textarea></div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4" style="padding: 25px 5px;height: 40px;">Designation</div>
                                    <div class="col-md-2" ng-repeat="data in Detail[2066]">
                                        <div style="padding:5px;" class="col-md-12"><textarea placeholder="{{Header[$index]}}" name='ImmediateSupervisorDesignation' style='height:40px;' class='form-control' ng-model='data.ImmediateSupervisorDesignation'></textarea></div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="col-md-4" style="padding: 25px 5px;height: 40px;">Superior's contact no.</div>
                                    <div class="col-md-2" ng-repeat="data in Detail[2066]">
                                        <div style="padding:5px;" class="col-md-12"><textarea placeholder="{{Header[$index]}}" name='ContactNo' style='height:40px;' class='form-control' ng-model='data.ContactNo'></textarea></div>
                                    </div>
                                </div>
                                <div ng-repeat="data in Detail[2066]">
                                    <input type='hidden' name='ID_Persona' class='form-control' ng-model='data.ID_Persona'/>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="form-header">
                <ol start="4" style="list-style-type:upper-alpha;font-family:Arial;font-size:24px;line-height:20px;">
                    <li>EDUCATIONAL ATTAINMENT</li>
                </ol>
            </div>
            <table>
                <tr>
                    <td>
                        <div style="position:relative;">
                            <div class="col-md-12 form-border" style="padding:5px;position:relative;left:-2px;width:100.3%;">
                                <table class="table table-striped table-bordered col-md-12" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Name of School</th>
                                            <th>Course</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th style="width:24px;"><a style="font-size:16px;" ng-click="AddNewRow(2068)" mid="2068" mtype="14"><i class="fa fa-plus"></i></a></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-form name="x" ng-repeat="data in Detail[2068]">
                                            <td>
                                                <div style="padding:5px;" ng-if="data.IsRequired == 1" ng-class="{ 'has-error' : x.SchoolName.$invalid && mainform.$submitted }" ><input type="text" typeahead-append-to-body='true' typeahead='item as item for item in text_autocomplete_source[2203] | filter:$viewValue | limitTo:10 ' placeholder="College / Gradudate / Post Graduate" name='SchoolName' style='height:40px;' required class='form-control' ng-model='data.SchoolName'></div>
                                                <div style="padding:5px;" ng-if="data.IsRequired == 0"><input type="text" typeahead-append-to-body='true' typeahead='item as item for item in text_autocomplete_source[2203] | filter:$viewValue | limitTo:10 ' placeholder="College / Gradudate / Post Graduate" name='SchoolName' style='height:40px;' class='form-control' ng-model='data.SchoolName'></div>
                                            </td>
                                            <td>
                                                <div style="padding:5px;" ng-if="data.IsRequired == 1" ng-class="{ 'has-error' : x.DegreeMajorHonor.$invalid && mainform.$submitted }"><textarea name='DegreeMajorHonor' style='height:40px;' required class='form-control' ng-model='data.DegreeMajorHonor'></textarea></div>
                                                <div style="padding:5px;" ng-if="data.IsRequired == 0"><textarea name='DegreeMajorHonor' style='height:40px;' class='form-control' ng-model='data.DegreeMajorHonor'></textarea></div>
                                            </td>
                                            <td>
                                                <div style="padding:5px;" ng-if="data.IsRequired == 1" ng-class="{ 'has-error' : x.YearFrom.$invalid && mainform.$submitted }" ><textarea name='YearFrom' style='height:40px;' required class='form-control' ng-model='data.YearFrom'></textarea></div>
                                                <div style="padding:5px;" ng-if="data.IsRequired == 0"><textarea name='YearFrom' style='height:40px;' class='form-control' ng-model='data.YearFrom'></textarea></div>
                                            </td>
									        <td>
                                                <div style="padding:5px;" ng-if="data.IsRequired == 1" ng-class="{ 'has-error' : x.YearTo.$invalid && mainform.$submitted }" ><textarea name='YearTo' style='height:40px;' required class='form-control' ng-model='data.YearTo'></textarea></div>
                                                <div style="padding:5px;" ng-if="data.IsRequired == 0"><textarea name='YearTo' style='height:40px;' class='form-control' ng-model='data.YearTo'></textarea></div>
                                                <input type='hidden' name='ID_Persona' class='form-control' ng-model='data.ID_Persona'/>
                                                <input type='hidden' name='IsRequired' class='form-control' ng-model='data.IsRequired'/>
									        </td>
                                            <td>
                                                <a ng-click="removeLiRow(2068,$index,data.ID)"><i style='color:red;'  class="fa fa-minus-circle"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-md-12">
                                    <div style="padding:5px;" class="col-md-4" ng-form name='x' ><textarea placeholder="School Activities" name='SchoolActivities' style='height:40px;' class='form-control' ng-model='Master.SchoolActivities'></textarea></div>
                                    <div style="padding:5px;" class="col-md-4" ng-form name='x' ><textarea placeholder="Community Activities" name='CommunityActivities' style='height:40px;' class='form-control' ng-model='Master.CommunityActivities'></textarea></div>
                                    <div style="padding:5px;" class="col-md-4" ng-form name='x' ><textarea placeholder="Professional / Business Activities" name='ProfessionalActivities' style='height:40px;' class='form-control' ng-model='Master.ProfessionalActivities'></textarea></div>
                                    <div style="padding:5px;" class="col-md-4" ng-form name='x' ><textarea placeholder="Hobbies" name='Hobbies' style='height:40px;' class='form-control' ng-model='Master.Hobbies'></textarea></div>
                                    <div style="padding:5px;" class="col-md-4" ng-form name='x' ><textarea placeholder="Interests" name='Interests' style='height:40px;' class='form-control' ng-model='Master.Interests'></textarea></div>
                                    <div style="padding:5px;" class="col-md-4" ng-form name='x' >
                                        <table width="100%">
                                            <tr>
                                                <td><textarea placeholder="Sports" name='Sports' style='height:40px;' class='form-control' ng-model='Master.Sports'></textarea>
                                                <td><div style="float:left;margin-top:5px;">Athlete</div>&nbsp;&nbsp;&nbsp; <input type="checkbox" name="IsAthlete" style="width:25px;height:20px;" ng-model="Master.IsAthlete" /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="form-header">
                <ol start="5" style="list-style-type:upper-alpha;font-family:Arial;font-size:24px;line-height:20px;">
                    <li>CHARACTER REFERENCES</li>
                </ol>
            </div>
            <table width="100%">
                <tr>
                    <td>
                        <div style="position:relative;">
                            <div class="col-md-12 form-border" style="padding:5px;position:relative;left:-2px;width:100.3%;">
                                <div class="col-md-3">
                                    <div style="text-align:center;" class="col-md-12">Name<span class="required">* </span></div>
                                    <div class="col-md-12" ng-form name='x' ng-repeat="data in Detail[2069]">
                                        <div style="padding:5px;" class="col-md-12" ng-class="{ 'has-error' : x.Name.$invalid && mainform.$submitted }"><textarea required ng-keypress="IgnoreNumbers($event)" name='Name' style='height:40px;' class='form-control' ng-model='data.Name'></textarea><span style="color:red;" ng-show="x.Name.$error.pattern">Name shouldn't contain special characters or numbers.</span></div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div style="text-align:center;" class="col-md-12">Company<span class="required">* </span></div>
                                    <div class="col-md-12" ng-form name='x' ng-repeat="data in Detail[2069]">
                                        <div style="padding:5px;" ng-class="{ 'has-error' : x.CompanyName.$invalid && mainform.$submitted }"><textarea required name='CompanyName' style='height:40px;' class='form-control' ng-model='data.CompanyName'></textarea></div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div style="text-align:center;" class="col-md-12">Position<span class="required">* </span></div>
                                    <div class="col-md-12" ng-form name='x' ng-repeat="data in Detail[2069]">
                                        <div style="padding:5px;" ng-class="{ 'has-error' : x.Designation.$invalid && mainform.$submitted }"><textarea required name='Designation' style='height:40px;' class='form-control' ng-model='data.Designation'></textarea></div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div style="text-align:center;" class="col-md-12">Contact #<span class="required">* </span></div>
                                    <div class="col-md-12" ng-form name='x' ng-repeat="data in Detail[2069]">
                                        <div style="padding:5px;" ng-class="{ 'has-error' : x.ContactNo.$invalid && mainform.$submitted }"><textarea required name='ContactNo' style='height:40px;' class='form-control' ng-model='data.ContactNo'></textarea></div>
                                    </div>
                                </div>
                                <div ng-repeat="data in Detail[2069]">
                                    <input type='hidden' name='ID_Persona' class='form-control' ng-model='data.ID_Persona'/>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="form-header">
                <ol start="6" style="list-style-type:upper-alpha;font-family:Arial;font-size:24px;line-height:20px;">
                    <li>ACKNOWLEDGEMENT and AUTHORIZATION</li>
                </ol>
            </div>
            <div style="position:relative;">
                <p style="font-family: Arial;font-size: 16px;padding:25px;line-height:25px;">
                    <i>
                        I hereby acknowledge that I am being considered for a position in Ayala Land, Inc. or any of its subsidiaries.
                        <br />
                        <br />
                        I certify that the statements made in this personal information form are correct and complete to the best of my knowledge.
                        <br />
                        I hereby authorize Ayala Land, Inc. to make reasonable inquiries from my schools, former associates, employers, customers and references. I understand
                        <br />
                        that any misrepresentation, falsification, or any omision of facts, of whatever nature, that I indicated on this form shall be considered sufficient cause for
                        <br />
                        dismissal at anytime during employment.
                    </i>
                    <br />
                    <br />
                    <table width="60%" align="center">
                        <tbody>
                            <tr>
                                <td class="form-border-bottom" style="text-align:center;font-weight:bold;font-size:20px;line-height:20px;">&nbsp;{{Master.FirstName}}&nbsp;{{Master.MiddleName}}&nbsp;{{Master.LastName}}</td>
                                <td style="width:30%;">&nbsp;</td>
                                <td class="form-border-bottom">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">Applicant's Name and Signature</td>
                                <td>&nbsp;</td>
                                <td style="text-align:center;">Date Accomplished</td>
                            </tr>
                        </tbody>
                    </table>
                </p>
            </div>
            <hr class="form-border1" style="margin:0;padding:0;" />
            <p style="padding:5px;font-family:Arial;font-size:18px;">Remarks: (to be filled out by HR only)</p>
            <div style="position:relative;">
                <textarea name="Remarks" style='height:70px;' class="form-control" ng-model="Master.Remarks"></textarea>
            </div>

        </div>
        
        </fieldset>
        </div>
    </div>
    <div ng-if="Detail[4235].length > 0" title='Essay' bs-pane>
        <div class='form_template form-horizontal' >
        <fieldset>
        <legend>Essay</legend>
                <div style="position:relative;margin-top:5px;">
                    <table>
                        <tr>
                            <td>
                                <div class="col-md-12">
                                    <ol style="list-style-type: decimal;">
                                        <div class="col-md-12">
                                            <li ng-repeat="d in Detail[4235]">
                                                <div>{{d.Essay}}</div>
                                                <table>
                                                    <tr>
                                                        <td style="padding:5px;">
                                                            <div ng-form name='x' ng-if="d.IsRequired == 1" ng-class="{ 'has-error' : x.Answer.$invalid && mainform.$submitted }" ><textarea name='Answer' rows="5" cols="100" required class='form-control' ng-model='d.Answer'></textarea></div>
                                                            <div ng-form name='x' ng-if="d.IsRequired == 0"><textarea name='Answer' rows="5" cols="100" class='form-control' ng-model='d.Answer'></textarea></div>
                                                        </td>
                                                        <td style="display:none;"><input type='hidden' name='ID_Persona' class='form-control' ng-model='d.ID_Persona'/></td>
                                                        <td style="display:none;"><input type='hidden' name='ID_Essay' class='form-control' ng-model='d.ID_Essay'/></td>
                                                        <td style="display:none;"><input type='hidden' name='ID' class='form-control' ng-model='d.ID'/></td>
                                                    </tr>
                                                    <tr>
                                                        <td>&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </li>
                                
                                        </div>
                            
                                    </ol>
                        
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </fieldset>
        </div>
    </div>
</div>

    </form>
    </div>
    <div class="button-holder button-bottom ng-scope">
		<ol class="breadcrumb ng-scope">
			<li><button type="button" class="btn btn-primary" ng-click="save()" btnid="1025"><i class="fa fa-save"></i>Save</button></li>
		</ol>
    </div>
    <div growl-notifications  class="notifications"></div>
</body>
    <asp:PlaceHolder ID="PlaceHolder2" runat="server">        
        <%: Scripts.Render("~/bundles/script") %>
    </asp:PlaceHolder>
    <script src="Scripts/growl-notifications.js"></script>
    <script>
        var app = angular.module('app', ['ct.ui.router.extras', 'dialogs.main', 'ui.bootstrap', 'angularFileUpload', 'angular.filter', 'growlNotifications', 'ngSanitize', 'ui.bootstrap.carousel', 'ui.bootstrap.tpls', 'chieffancypants.loadingBar', 'mgcrea.ngStrap']);
        app.config(function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
        });

        app.directive('fileInput', function () {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ngModel) {

                    el.bind('change', function (event) {
                        var fileName = el.val().split("\\");
                        scope.$apply(function () {
                            ngModel.$setViewValue(fileName[fileName.length - 1]);
                            ngModel.$render();
                        });
                    });

                }
            }
        });

        app.controller('RegisterCntrl', ['$scope', '$state', '$http', 'growlNotifications', '$timeout', '$upload', 'dialogs', function (s, S, $http, g, t, u, di) {
            s.loadConfirm = function () {
                var dlg = di.notify('Thank you!', 'You have successfully submitted your form.');
                dlg.result.then(function () {
                    window.location.reload();
                })
            }

            var r;
            $http({
                url: "api/DataService/getAllPublicResources",
                method: "POST",
            }).success(function (data, status, headers, config) {
                r = data;
                s.Master = r.Master;
                s.Detail = r.Detail;
                var suffix = s.Master.Suffix;
                s.Master.Suffix = (suffix == null ? '' : suffix.toUpperCase());
                if (s.rID == 0 || s.rID != 0 && s.Detail[2066].length == 0) {
                    s.Detail[2066].push({ "ID": 0, "Company": "", "Designation": "", "EmploymentStatus": "", "YearsOfService": "", "ReasonForLeaving": "", "ImmediateSupervisor": "", "ImmediateSupervisorDesignation": "", "ContactNo": "", "ID_Persona": "" });
                    s.Detail[2066].push({ "ID": 0, "Company": "", "Designation": "", "EmploymentStatus": "", "YearsOfService": "", "ReasonForLeaving": "", "ImmediateSupervisor": "", "ImmediateSupervisorDesignation": "", "ContactNo": "", "ID_Persona": "" });
                    s.Detail[2066].push({ "ID": 0, "Company": "", "Designation": "", "EmploymentStatus": "", "YearsOfService": "", "ReasonForLeaving": "", "ImmediateSupervisor": "", "ImmediateSupervisorDesignation": "", "ContactNo": "", "ID_Persona": "" });
                    s.Detail[2066].push({ "ID": 0, "Company": "", "Designation": "", "EmploymentStatus": "", "YearsOfService": "", "ReasonForLeaving": "", "ImmediateSupervisor": "", "ImmediateSupervisorDesignation": "", "ContactNo": "", "ID_Persona": "" });
                    s.Detail[2068].push({ "ID": 0, "SchoolName": "", "DegreeMajorHonor": "", "YearsAttended": "", "ID_Persona": "", "IsRequired": 1 });
                    s.Detail[2068].push({ "ID": 0, "SchoolName": "", "DegreeMajorHonor": "", "YearsAttended": "", "ID_Persona": "", "IsRequired": 0 });
                    s.Detail[2069].push({ "ID": 0, "Name": "", "CompanyName": "", "Designation": "", "ContactNo": "", "ID_Persona": "", "IsRequired": 1 });
                    s.Detail[2069].push({ "ID": 0, "Name": "", "CompanyName": "", "Designation": "", "ContactNo": "", "ID_Persona": "", "IsRequired": 0 });
                    s.Detail[2069].push({ "ID": 0, "Name": "", "CompanyName": "", "Designation": "", "ContactNo": "", "ID_Persona": "", "IsRequired": 0 });
                }
                s.Header = { 0: "Current", 1: "Previous", 2: "Previous", 3: "Previous" };

                if (s.rID != 0 && s.Detail[2069].length > 0) {
                    for (var i = 0; i < s.Detail[2069].length; i++) {
                        if (i == 0) {
                            s.Detail[2069][i].IsRequired = 1;
                        } else {
                            s.Detail[2069][i].IsRequired = 0;
                        }
                    }
                }

                s.AddNewRow = function (btnmID) {
                    $http({
                        url: "api/DataService/AddPublicNewRow",
                        method: "POST",
                        data: LZString.compressToEncodedURIComponent(JSON.stringify({ 'mID': btnmID })),
                    }).success(function (data, status, headers, config) {
                        s.Detail[btnmID].push(data.data);
                        if (!s.$$phase) {
                            s.$apply();
                        }
                        
                    });
                }
                
                var dd = new Date();
                s.sDate = '1/1/' + parseInt(dd.getFullYear() - 10);
                s.minDate = '12/31/' + parseInt(dd.getFullYear() - 10);
                s.dropdown_source = r.dropdown_source;
                s.rdb_source = r.rdb_source;
                s.text_autocomplete_source = r.text_autocomplete_source;

                s.getAge = function (dateString) {
                    var today = new Date();
                    var birthDate = new Date(dateString);
                    var age = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    if (!isNaN(age) && (s.Master.BirthDate != "" && s.Master.BirthDate != undefined && s.Master.BirthDate != null)) {
                        s.Master.Age = age;
                        return age;
                    }
                }

                s.removeRow = function (mID, row) {
                    if (row.entity.ID == 0 || row.entity.ID == undefined) {
                        s.Detail[mID].splice(row.rowIndex, 1);
                    }
                };
                s.setID = function (data, target, b) {
                    data[target.substring(3)] = b.Name;
                    data[target] = b.ID;
                };

                s.removeLiRow = function (mID, index, id) {
                    if (id == 0 || id == undefined) {
                        s.Detail[mID].splice(index, 1);
                    }
                };
                
                if (s.Master.BirthDate != undefined) {
                    s.Master.BirthDate = moment(s.Master.BirthDate).format("MM/DD/YYYY");
                }
                s.formatDate = function () {
                    var value = s.Master.BirthDate;
                    var b;
                    value = value.replace(/^([\d]{2})([\d]{2})([\d]{4})$/, "$1/$2/$3");
                    b = value;
                    var m = moment(b);
                    if (m.isValid()) {
                        s.Master.BirthDate = b;
                        s.mainform.BirthDate.$error.pattern = false;
                        s.mainform.BirthDate.$invalid = false;
                    } else {
                        s.mainform.BirthDate.$error.pattern = true;
                        s.mainform.BirthDate.$invalid = true;
                    }
                }

                s.selectedFiles = [];
                s.onFileSelect = function ($files, mID, name, idx, e) {
                    for (var i = 0; i < s.selectedFiles.length; i++) {
                        if (s.selectedFiles[i].mID == mID && s.selectedFiles[i].name == name && s.selectedFiles[i].idx == idx) {
                            s.selectedFiles.splice(i, 1);
                            break;
                        }
                    }
                    s.selectedFiles.push({
                        'file': $files[0],
                        'mID': mID,
                        'name': name,
                        'idx': idx
                    });
                    var reader = new FileReader();
                    if (e.originalEvent.target.files[0].type == "image/jpeg" || e.originalEvent.target.files[0].type == "image/png") {
                        reader.onload = function (e) {
                            $('#ImagePreview').attr('src', e.target.result);
                        }
                        reader.readAsDataURL(e.originalEvent.target.files[0]);
                    } else {
                        g.add("Invalid file format.", "danger", 5000);
                    }
                }

                s.save = function () {
                    s.mainform.$submitted = true;
                    if (s.mainform.$valid) {
                        s.mainform.$setPristine();
                        //
                        var files = [], fileSummary = [];
                        if (s.selectedFiles !== undefined) {
                            for (var i = 0; i < s.selectedFiles.length; i++) {
                                files.push(s.selectedFiles[i].file);
                                fileSummary.push({ 'mID': 1061, 'name': s.selectedFiles[i].name, 'idx': s.selectedFiles[i].idx })
                            }
                        }
                        u.upload({
                            method: 'POST',
                            url: 'api/DataService/publicSave',
                            data: { 'mID': 1061, 'rID': 0, 'btnID': 0, 'Master': angular.toJson(s.Master), 'Detail': angular.toJson(s.Detail), 'fileSummary': angular.toJson(fileSummary) },
                            file: files,
                            //dataType: "json"
                        }).error(function (data, status, headers, config) {
                            g.add("Save Error", "danger", 5000);
                        }).then(function (results) {
                            s.loadConfirm();
                        });
                    } else {
                        t(function () {
                            if (s.mainform.$error.pattern || s.mainform.$error.minlength || s.mainform.$error.maxlength) {
                                g.add('Invalid values on other fields.', "danger", 5000);
                            } else if (s.mainform.$error.ngMin) {
                                g.add('Input value does not meet the minimum value.', "danger", 5000);
                            } else if (s.mainform.$error.ngMax) {
                                g.add('Input value exceeded the maximum value.', "danger", 5000);
                            } else {
                                g.add('Fill all the required fields.', "danger", 5000);
                            }

                            //s.tabs.activeTab = findFormInvalid(s['mainform']) - (delay == undefined ? 0 : delay);
                        });

                    }
                }

            });
            
                s.mID = 1061;
                s.rID = 0;

                s.toggleUploadFile = function () {
                    setTimeout(function () {
                        $("#ImageFile").click();
                    }, 0);
                }

                s.IgnoreNumbers = function (e) {
                    if (e.keyCode >= 48 && e.keyCode <= 57) {
                        console.log(e.keyCode, e);
                        e.preventDefault();
                        return false;
                    }
                }

                s.IgnoreCharacters = function (e) {
                    if (e.keyCode < 48 || e.keyCode > 57) {
                        console.log(e.keyCode, e);
                        e.preventDefault();
                        return false;
                    }
                }
            
        }]);
    </script>

</html>
