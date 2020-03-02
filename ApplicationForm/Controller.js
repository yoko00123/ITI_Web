var appModule = angular.module('appModule', ['angular.filter', 'mgcrea.ngStrap', 'ngSanitize', 'ui.bootstrap.typeahead', 'ui.bootstrap.tpls']);
var dateToIso = function () {
return {
restrict: 'A',
require: 'ngModel',
link: function (scope, element, attrs, ngModelCtrl) {
ngModelCtrl.$parsers.push(function (datepickerValue) {
return moment(datepickerValue).format('YYYY-MM-DD 00:00:00');
});
}
};
};
appModule.directive('dateToIso', [dateToIso]);
var ngMin = function () {
return {
restrict:   'A',
require:    'ngModel',
link: function (scope, elem, attr, ctrl) {
function isEmpty(value) {
return angular.isUndefined(value) || value === '' || value === null || value !== value;
}
var minValidator = function (value) {
var min = scope.$eval(attr.ngMin) || 0;
if (!isEmpty(value) && value < min) {
ctrl.$setValidity('ngMin', false);
return undefined;
} else {
ctrl.$setValidity('ngMin', true);
return value;
}
};
ctrl.$parsers.push(minValidator);
ctrl.$formatters.push(minValidator);
}
};
}
appModule.directive('ngMin', ngMin);
appModule.controller('appData', function($scope, $timeout){
$(document).ready(function () {
$('#bdate').bind('cut copy paste', function (e) {
e.preventDefault();
});
});
var dd = new Date();
$scope.sDate = '1/1/' + parseInt(dd.getFullYear() - 10);
$scope.minDate = '12/31/' + parseInt(dd.getFullYear() - 10);
$scope.tabs = [];
$scope.tabs.activeTab = 0;
var findFormInvalid = function (ngForm) {
var x = 0;
for (var i in ngForm) {
if (ngForm[i] && ngForm[i].hasOwnProperty && ngForm[i].hasOwnProperty('$invalid') && ngForm[i].$name != 'import-excel') {
if (ngForm[i].$invalid) return x;
x++;
}} return 0 }
$scope.addnewrow = function(mID){
if(mID == 2068){
$scope.Detail[mID].push({'ID': 0, 'SchoolName': null, 'DegreeMajorHonor': null, 'YearFrom': null, 'YearTo': null, 'ID_Persona': null,'IsRequired': true});
}else{
$scope.Detail[mID].push({'ID': 0, 'LicenseNo': null, 'LicenseName': null, 'LicenseDate': null});
}}
$scope.removeLiRow = function (mID, index, id) {
$scope.Detail[mID].splice(index, 1);
}
$scope.Master = {
'ID': null,'CivilStatus': null,'CitizenShip': null,'Gender': null,'Designation': null,'LicenseType': null,'CurrentEmployment': null,'LatestEducationAttainment': null,'Name1': null,'ApplicationDate': '8/25/2015' ,'LastName': null,'FirstName': null,'MiddleName': null,'NickName': null,'MobileNo': null,'TelNo': null,'EmailAddress': null,'PermanentAddress': null,'BirthDate': '8/25/2015' ,'Age': null,'ID_CivilStatus': null,'ID_Citizenship': null,'ID_Gender': null,'SalaryDesired': null,'License': null,'DateIssued': '8/25/2015' ,'SchoolActivities': null,'CommunityActivities': null,'ProfessionalActivities': null,'Hobbies': null,'Interests': null,'Sports': null,'Remarks': null,'ImageFile': null,'ImageFile_GUID': null,'IsEndorsed': false,'License_Type': null,'PositionDesired': null,'ID_City': null,'Suffix': null,'IsAthlete': false,'IsCanEndorsed': false,'LatestPositionEndorsed': null,'ID_LatestRecruitmentStatus': null,'LatestRecruitmentStatus': null
};
$scope.Detail = {};
$scope.Detail[2070] = [
{'ID': 0 ,'ID_Questionaire_Details': 1 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'How did you learn about the job opportunity?' ,'Choices': 'Job Fair' ,'ID_QuestionaireType': 1 ,'SeqNo': 1 ,'QuestionaireType': 'Checkbox' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 2 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'How did you learn about the job opportunity?' ,'Choices': 'Job Street' ,'ID_QuestionaireType': 1 ,'SeqNo': 1 ,'QuestionaireType': 'Checkbox' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 3 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'How did you learn about the job opportunity?' ,'Choices': 'Referred By' ,'ID_QuestionaireType': 2 ,'SeqNo': 1 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 4 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'How did you learn about the job opportunity?' ,'Choices': 'Search Firm/Agency' ,'ID_QuestionaireType': 2 ,'SeqNo': 1 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 5 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'How did you learn about the job opportunity?' ,'Choices': 'School Placement Office' ,'ID_QuestionaireType': 1 ,'SeqNo': 1 ,'QuestionaireType': 'Checkbox' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 6 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'How did you learn about the job opportunity?' ,'Choices': 'Others' ,'ID_QuestionaireType': 2 ,'SeqNo': 1 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 7 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'How did you learn about the job opportunity?' ,'Choices': 'Walk-in' ,'ID_QuestionaireType': 1 ,'SeqNo': 1 ,'QuestionaireType': 'Checkbox' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 8 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'Do you or your spouse have any relative/s employed in Ayala Land, Inc. or any of its subsidiaries? (Proceed to next question if none.)' ,'Choices': 'Name' ,'ID_QuestionaireType': 2 ,'SeqNo': 2 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 9 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'Do you or your spouse have any relative/s employed in Ayala Land, Inc. or any of its subsidiaries? (Proceed to next question if none.)' ,'Choices': 'Relationship' ,'ID_QuestionaireType': 2 ,'SeqNo': 2 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 10 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'Do you or your spouse have any relative/s employed in Ayala Land, Inc. or any of its subsidiaries? (Proceed to next question if none.)' ,'Choices': 'Company Name' ,'ID_QuestionaireType': 2 ,'SeqNo': 2 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 11 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'Do you or your spouse have any relative/s employed in Ayala Land, Inc. or any of its subsidiaries? (Proceed to next question if none.)' ,'Choices': 'Position' ,'ID_QuestionaireType': 2 ,'SeqNo': 2 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 12 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'Do you or your spouse have any relative/s employed in other Real Estate companies? (Proceed to next question if none.)' ,'Choices': 'Name' ,'ID_QuestionaireType': 2 ,'SeqNo': 3 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 13 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'Do you or your spouse have any relative/s employed in other Real Estate companies? (Proceed to next question if none.)' ,'Choices': 'Relationship' ,'ID_QuestionaireType': 2 ,'SeqNo': 3 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 14 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'Do you or your spouse have any relative/s employed in other Real Estate companies? (Proceed to next question if none.)' ,'Choices': 'Company Name' ,'ID_QuestionaireType': 2 ,'SeqNo': 3 ,'QuestionaireType': 'Textarea' ,'IsRequired': false },{'ID': 0 ,'ID_Questionaire_Details': 15 ,'ID_Persona': 0 ,'TextAreaAnswer': null ,'IsCheckAnswer': false ,'Question': 'Do you or your spouse have any relative/s employed in other Real Estate companies? (Proceed to next question if none.)' ,'Choices': 'Position' ,'ID_QuestionaireType': 2 ,'SeqNo': 3 ,'QuestionaireType': 'Textarea' ,'IsRequired': false }
];
$scope.Detail[2066] = [{
'ID': null,'Company': null,'Designation': null,'EmploymentStatus': null,'YearsOfService': null,'ReasonForLeaving': null,'ImmediateSupervisor': null,'ImmediateSupervisorDesignation': null,'ContactNo': null,'ID_Persona': null
}];
$scope.Detail[2068] = [{
'ID': null,'SchoolName': null,'DegreeMajorHonor': null,'YearFrom': null,'ID_Persona': null,'IsRequired': true,'YearTo': null
}];
$scope.Detail[2069] = [{
'ID': null,'Name': null,'CompanyName': null,'Designation': null,'ContactNo': null,'ID_Persona': null
}];
$scope.Detail[4098] = [{
'ID': null,'Name': null,'Name_GUID': null,'DateAttached': '8/25/2015' 
}];
$scope.Detail[4235] = [

];
$scope.Detail[4238] = [{
'LicenseNo': null,'LicenseName': null,'LicenseDate': '8/25/2015' ,'ID_Persona': null
}];
$scope.dropdown_source = {};
$scope.text_autocomplete_source = {};
$scope.dropdown_source[1151] = [
{'ID': 2, 'Name':'Married'},{'ID': 3, 'Name':'Separated'},{'ID': 1, 'Name':'Single'}
];
$scope.dropdown_source[1152] = [
{'ID': 2, 'Name':'American'},{'ID': 4, 'Name':'Armenian'},{'ID': 3, 'Name':'Chinese'},{'ID': 1, 'Name':'Filipino'},{'ID': 13, 'Name':'French'},{'ID': 12, 'Name':'Japanese'}
];
$scope.dropdown_source[1153] = [
{'ID': 1, 'Name':'Male'},{'ID': 2, 'Name':'Female'}
];
$scope.dropdown_source[9420] = [
{'ID': 18, 'Name':'Bacolod City'},{'ID': 5, 'Name':'Caloocan City'},{'ID': 15, 'Name':'Las Pinas City'},{'ID': 9, 'Name':'Makati City'},{'ID': 8, 'Name':'Mandaluyong City'},{'ID': 1, 'Name':'Manila'},{'ID': 14, 'Name':'Paranaque City'},{'ID': 3, 'Name':'Pasay City'},{'ID': 7, 'Name':'Pasig City'},{'ID': 2, 'Name':'Quezon City'},{'ID': 6, 'Name':'San Juan'},{'ID': 10, 'Name':'Taguig City'},{'ID': 11, 'Name':'Valenzuela City'}
];
$scope.text_autocomplete_source[2203] = [

];
$scope.text_autocomplete_source[9424] = [

];
$scope.getAge = function (dateString) {
var today = new Date();
var birthDate = new Date(dateString);
var age = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
age--;
}
if (!isNaN(age) && ($scope.Master.BirthDate != '' && $scope.Master.BirthDate != undefined && $scope.Master.BirthDate != null)) {
$scope.Master.Age = age;
return age;
}
}
$scope.Detail[2066].push({ 'ID': 0, 'Company': '', 'Designation': '', 'EmploymentStatus': '', 'YearsOfService': '', 'ReasonForLeaving': '', 'ImmediateSupervisor': '', 'ImmediateSupervisorDesignation': '', 'ContactNo': '', 'ID_Persona': 0 });
$scope.Detail[2066].push({ 'ID': 0, 'Company': '', 'Designation': '', 'EmploymentStatus': '', 'YearsOfService': '', 'ReasonForLeaving': '', 'ImmediateSupervisor': '', 'ImmediateSupervisorDesignation': '', 'ContactNo': '', 'ID_Persona': 0 });
$scope.Detail[2066].push({ 'ID': 0, 'Company': '', 'Designation': '', 'EmploymentStatus': '', 'YearsOfService': '', 'ReasonForLeaving': '', 'ImmediateSupervisor': '', 'ImmediateSupervisorDesignation': '', 'ContactNo': '', 'ID_Persona': 0 });
$scope.Detail[2069].push({ 'ID': 0, 'Name': '', 'CompanyName': '', 'Designation': '', 'ContactNo': '', 'ID_Persona': 0, 'IsRequired': 1 });
$scope.Detail[2069].push({ 'ID': 0, 'Name': '', 'CompanyName': '', 'Designation': '', 'ContactNo': '', 'ID_Persona': 0, 'IsRequired': 1 });
$scope.Detail[2069][0].IsRequired = 1;
$scope.Master.BirthDate = null;
$scope.Master.DateIssued = null;
$scope.Detail[4238] = [];
var suffix = $scope.Master.Suffix;
$scope.Master.Suffix = (suffix == null ? '' : suffix.toUpperCase());
$scope.generateSaveData = function(){
$scope.mainform.$submitted = true;
if($scope.mainform.$valid){
var textToWrite = '{ "Master":' + angular.toJson($scope.Master) + ', "Detail":' + angular.toJson($scope.Detail) + '}';
var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
var fileNameToSaveAs = 'ApplicationFormData.json';
var downloadLink = document.createElement('a');
downloadLink.download = fileNameToSaveAs;
downloadLink.innerHTML = 'Download File';
if (window.webkitURL != null) {
downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
}else{
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
downloadLink.onclick = destroyClickedElement;
downloadLink.style.display = 'none';
document.body.appendChild(downloadLink);
}
downloadLink.click();
}else{
var delay = undefined;
$timeout(function () {
if ($scope.mainform.$error.pattern || $scope.mainform.$error.minlength || $scope.mainform.$error.maxlength) {
} else {
alert('Fill all the required fields.');
}
$scope.tabs.activeTab = (findFormInvalid($scope['mainform']) >= 1 ? 1 : findFormInvalid($scope['mainform'])) - (delay == undefined ? 0 : delay);
});
}
}
$scope.IgnoreNumbers = function (e) {
if (e.keyCode >= 48 && e.keyCode <= 57) {
e.preventDefault();
return false;
}}
if ($scope.Master.BirthDate != undefined || $scope.Master.BirthDate != null) {
$scope.Master.BirthDate = moment($scope.Master.BirthDate).format('MM/DD/YYYY');}
$scope.formatDate = function () {
var value = $scope.Master.BirthDate;
var b;
value = value.replace(/^([\d]{2})([\d]{2})([\d]{4})$/, '$1/$2/$3');
b = value;
var m = moment(b);
if (m.isValid()) {
$scope.Master.BirthDate = b;
$scope.mainform.BirthDate.$error.pattern = false;
$scope.mainform.BirthDate.$invalid = false;
} else {
$scope.mainform.BirthDate.$error.pattern = true;
$scope.mainform.BirthDate.$invalid = true;
}}
});

