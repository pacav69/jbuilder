/*	Komodo Edit Prefs
	================================================================================================================

//	http://community.activestate.com/faq/komodo-profile-structure
//	http://community.activestate.com/faq/komodo-file-locations
//	http://community.activestate.com/faq/getting-setting-komodo-preference
//	https://github.com/Komodo/KomodoEdit/blob/master/src/prefs/prefs.p.xml
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

			jbdataUserNameDefault:			{	type: 'string',		value: 'justme'},
			jbdataUserEmailDefault:			{	type: 'string',		value: 'myemail@example.com'},

			mruProjectSize:					{	type: 'long',		value: 15 },
			mruFileSize:					{	type: 'long',		value: 40 },


		};
	}

	function getKOPrefs() {
		var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
		var prefset = prefs.QueryInterface(Components.interfaces.koIPreferenceSet);

		var result = {

			jbdataUserNameDefault:				{	type: 'string',		value: prefset.getStringPref('jbdataUserNameDefault')},
			jbdataUserEmailDefault:				{	type: 'string',		value: prefset.getStringPref('jbdataUserEmailDefault')},

			mruProjectSize:					{	type: 'long',		value: prefset.getLongPref('mruProjectSize') },
			mruFileSize:					{	type: 'long',		value: prefset.getLongPref('mruFileSize')},

		};
		return result;
	}

	function setKOPrefs(thePrefs) {
		var i;
		var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
		var prefset = prefs.QueryInterface(Components.interfaces.koIPreferenceSet);

	/*	Data User
		================================================================================================================ */
			prefset.setStringPref('jbdataUserNameDefault',thePrefs['jbdataUserNameDefault']);	//	jbdataUserNameDefault
			prefset.setStringPref('jbdataUserEmailDefault',thePrefs['jbdataUserEmailDefault']);	//	jbdataUserEmailDefault

	/*	Appearance
		================================================================================================================ */

		prefset.setLongPref('mruProjectSize',thePrefs['mruProjectSize']);		//	Number of Projects
		prefset.setLongPref('mruFileSize',thePrefs['mruFileSize']);			//	Number of Files
	}
