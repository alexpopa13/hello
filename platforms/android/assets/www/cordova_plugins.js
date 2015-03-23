cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/com.microsoft.azure-mobile-services/www/MobileServices.Web.min.js",
        "id": "com.microsoft.azure-mobile-services.AzureMobileServices",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.inappbrowser": "0.6.1-dev",
    "com.microsoft.azure-mobile-services": "1.2.7"
}
// BOTTOM OF METADATA
});