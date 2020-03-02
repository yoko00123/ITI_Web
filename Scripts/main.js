require.config({
    baseUrl: (PublishID == 0 || PublishID == undefined || AllowDebugging ? 'Scripts' : 'Build/' + PublishID)
    //urlArgs: 'v=' + Web_System_Version
});
require(
    [
		'app',
        //(PublishID != 0 ? PublishID + '-' : '') + 'route',
        'route',
        'customroute',
        //(PublishID != 0 ? PublishID + '-' : '') + 'customroute',
        'controllers',
        'directives',
		'dataservices',
		'utilservices',
        'filter',
        'template',
		'menu'
    ],
	function (app) {
	    angular.bootstrap(document, ['app']);
	    document.getElementById("initial-spinner").style.display = "none";
	});

function DownloadFile(path) {
    var iframe = document.createElement("iframe");
    iframe.src = encodeURI("WebHandler/DownloadFile.ashx?ID=0&path=" + path);
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    $(iframe).ready(function () {
        setTimeout(function () {
            $(iframe).remove();
        }, 2e4 + 1e4 * 5)
    });
}
Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};