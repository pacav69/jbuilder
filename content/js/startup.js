/* startup.js
*/
window.onload = function() {
  init();
  /*doSomethingElse(); */
};

	function init() {
	getExtenstionPrefs(extension.JBUILDER)
}


/*	Preferences
	--------------------------------------------------------- */

	function getExtenstionPrefs(extension) {
		var prefs = Components.classes["@activestate.com/koPrefService;1"].getService(Components.interfaces.koIPrefService).prefs;
		var extensionPrefs, appPrefs;

		//	Extension Prefs Section
			if (!prefs.hasPref('extensions')) {
				extensionPrefs = Components.classes["@activestate.com/koPreferenceSet;1"].createInstance();		//	Create Prefs
				prefs.setPref('extensions', extensionPrefs);													//	Save
			} else extensionPrefs = prefs.getPref('extensions');												//	Read

		//	This Extension
			if (!extensionPrefs.hasPref(extension)) {
				appPrefs = Components.classes["@activestate.com/koPreferenceSet;1"].createInstance();			//	Create Prefs
				extensionPrefs.setPref(extension, appPrefs);													//	Save
			} else appPrefs= extensionPrefs.getPref(extension);													//	Read

		return appPrefs;
	}