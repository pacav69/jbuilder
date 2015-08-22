		// Userdata 
	
/*	set User Data Prefs
	========================================================= */

		
		function setUserPrefs(thePrefs){

			//	Setting a string preference

			 var pref_name = ko.interpolate.interpolateStrings(thePrefs['jbdataUserNameDefault']);
			if (pref_name) {
			     var pref_value = ko.interpolate.interpolateStrings(thePrefs['jbdataUserNameDefault']);
			   if (pref_value !== null) {
				 var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
				//dump("Setting pref '" + pref_name + "' to '" + pref_value + "'\n");
				// prefs.setStringPref(pref_name, pref_value);
				prefs.setStringPref('jbdataUserNameDefault',thePrefs['jbdataUserNameDefault']);	//	jbdataUserNameDefault
				// prefset.setStringPref('jbdataUserEmailDefault',thePrefs['jbdataUserEmailDefault']);	//	jbdataUserEmailDefault
			   }
			}
		}

	/*	get User Data Prefs
	========================================================= */

		
		function getUserPrefs(){
				var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
				var prefset = prefs.QueryInterface(Components.interfaces.koIPreferenceSet);

		var result = {
			
//			jbdataUserNameDefault:			{	type: 'string',		value: prefset.getStringPref('jbdataUserNameDefault')},
//			jbdataUserEmailDefault:			{	type: 'string',		value: prefset.getStringPref('jbdataUserEmailDefault')},
			mruProjectSize:					{	type: 'long',		value: prefset.getLongPref('mruProjectSize') },
			mruFileSize:					{	type: 'long',		value: prefset.getLongPref('mruFileSize')},
			
				};
		return result;
			
		}
		
/*	default User Data Preds
	========================================================= */

	function defaultUserDataPrefs() {
		return {

			jbdataUserNameDefault:			{	type: 'string',		value: 'justme'},
			jbdataUserEmailDefault:			{	type: 'string',		value: 'myemail@example.com'},

			mruProjectSize:					{	type: 'long',		value: 15 },
			mruFileSize:					{	type: 'long',		value: 40 },
//			show_start_page:				{	type: 'boolean',	value: 0 },


		};
	}
	
/*	OK & Cancel
	========================================================= */


function doOKprefs() {
		window.arguments[0].out = getParms();
		return true;
	}
function doCancelprefs() {
		return true;
	}
	
function initprefs() {
		dialogInitprefs();
		// initMoreprefs();
	}


/*	Init
	========================================================= */

	function dialogInitprefs() {
        
        
		accept=document.documentElement.getButton('accept');
		cancel=document.documentElement.getButton('cancel');

		if(document.getElementById('help-destination')) destination=document.getElementById('help-destination');
		if(document.getElementById('help-source')) source=document.getElementById('help-source');

	//	if(destination) {
	//		setSetDestination(['id','class']);
	//		setDestination();
	//	}

	//	if(source) {
		//	source.onkeydown=function(e) {
		//		if(e.keyCode==9) {
		//			var pos=this.selectionStart;
		//			this.value=this.value.substr(0,pos)+'\t'+this.value.substr(pos);
		//			this.selectionStart=this.selectionEnd=pos+1;
		//			e.preventDefault();
		//		}
		//	};
		//	setSetDestination(['help-source']);
		//	setSource();
		//}

	}

	function initMoreprefs() {
		//	Dummy Stub for below
	}
    
 this.refresh = function() {
    try {
      if (ko.views.manager.currentView &&
          ko.views.manager.currentView.koDoc &&
          ko.views.manager.currentView.koDoc.buffer) {
        
          var t = document.getElementById('!JBUILDER_tab');
          if (!t || !t.parentNode.selectedItem ||
              t.parentNode.selectedItem.id != '!JBUILDER_tab' ||
              t.parentNode.parentNode.parentNode.collapsed) return;
        }
        !JBUILDER.reloadSource();
      } else !JBUILDER.init();
    } catch (e) { xtk2.debug.exceptionHandler(e, NAME); }
  };