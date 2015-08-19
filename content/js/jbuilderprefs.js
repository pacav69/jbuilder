/*	Komodo Edit Prefs
	================================================================================================================

//	http://community.activestate.com/faq/komodo-profile-structure
//	http://community.activestate.com/faq/komodo-file-locations
//	http://community.activestate.com/faq/getting-setting-komodo-preference
//	http://svn.openkomodo.com/openkomodo/view/openkomodo/trunk/src/prefs/prefs.p.xml
//	http://community.activestate.com/forum/where-does-komodo-store-file-preferences
//	http://grok.openkomodo.com/source/xref/openkomodo/trunk/src/prefs/koIPrefs.idl#114
//	http://www.koders.com/javascript/fid7B93638BF3D5E6E8BFE1DCD0FBE3A837AA6C2B58.aspx?s=firefox
//	http://community.activestate.com/node/8422
//	http://community.activestate.com/tags/komodo-preference-set

	================================================================================================================ */
// TODO: remove before production
// window.openDialog("chrome://global/content/console.xul", "_blank");

	function defaultKOPrefs() {
		return {

			dataUserNameDefault:			{	type: 'string',		value: 'justme'},
			dataUserEmailDefault:			{	type: 'string',		value: 'myemail@example.com'},


		};
	}

	function getKOPrefs() {
		var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
		var prefset = prefs.QueryInterface(Components.interfaces.koIPreferenceSet);

		var result = {

			dataUserNameDefault:				{	type: 'string',		value: prefset.getStringPref('dataUserNameDefault')},
			dataUserEmailDefault:				{	type: 'string',		value: prefset.getStringPref('dataUserEmailDefault')},

		};
		return result;
	}

	function setKOPrefs(thePrefs) {
		var i;
		var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
		var prefset = prefs.QueryInterface(Components.interfaces.koIPreferenceSet);

	/*	Data User
		================================================================================================================ */
			prefset.setStringPref('dataUserNameDefault',thePrefs['dataUserNameDefault']);	//	dataUserNameDefault
			prefset.setStringPref('dataUserEmailDefault',thePrefs['dataUserEmailDefault']);	//	dataUserEmailDefault
	}
