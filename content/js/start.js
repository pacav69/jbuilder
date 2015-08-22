/**
 * Jbuilder
 *
 * @fileoverview
 *
 * Joomla Builder for Komodo Edit
 *
 * @author  Paul Cavanagh 
 *
 * Contributors:
 *
 * Copyright (c) 2015, Paul Cavanagh 
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of  nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.

 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Namespaces
 */
if (typeof ko.extensions === 'undefined') ko.extensions = {};
if (typeof ko.extensions.JBUILDER === 'undefined') ko.extensions.JBUILDER = { version : '0.1' };

/**
 * Extension code
 */
(function () {
  ///
  /// Common constants
  ///
  const // Rows indices
     
        // Display name
        NAME = 'JBUILDER';
  ///
  /// Extension scoped variables
  ///
  var main = this,
      JBUILDER = null,
      JBUILDERBox = null,
      JBUILDERView = null,
	  
  /**
   * Displays a node info in a tooltip if set
   * @param {Event} event
   */
  //this.nodeInfo = function(event) {
  //  try {
  //    var n = this.getNodeFromEvent(event),
  //        i =  JBUILDER.node_info;
  //    if (n && n.info) i.value = n.info;
  //    else event.preventDefault();
  //  } catch (e) { xtk2.debug.exceptionHandler(e, NAME); }
  //};
  //

  /**
   * Extension settings module
   */
  this.settings = {
    /**
     * Initial settings (if none set)
     */
    defaults : {
      left : false,
      locate : true,
      expand : true,
      sort : false,
      HTMLfilter : false
    },
    /**
     * Switches toolbar icon to a new state
     * @param {string} id XUL id
     * @param {boolean} state
     */
   // _switchIcon : function(id, state) {
    //  var i, icon = document.getElementById(id), classes;
    //  if (icon) {
    //    classes = icon.getAttribute('class').split(' ');
    //    if (state) {
    //      if (classes.indexOf('active') < 0) classes.push('active');
    //    } else {
    //      if ((i = classes.indexOf('active')) >= 0) delete classes[i];
    //    }
    //    icon.setAttribute('class', classes.join(' '));
    //    icon.setAttribute('checked', state);
    //  }
    //},
 
    /**
     * Loads a boolean setting from extension prefs
     * @returns {boolean}
     */
    get : function(name) {
      return xtk2.services.prefs.prefs.getBooleanPref('extensions.JBUILDER.' + name);
    },
    /**
     * Save a boolean setting to extension prefs
     * @param {string} name
     */
    set : function(name, value) {
      xtk2.services.prefs.prefs.setBooleanPref('extensions.JBUILDER.' + name, value);
    },
    /**
     * Changes a boolean setting in extension prefs
     * @returns {boolean} new value
     */
    change : function(name) {
      var result;
      this.set(name, result = !this.get(name));
      this.updateIcons();
      return result;
    },
    //show : function(name) {
    //  var id = 'JBUILDER-toggle-' + name,
    //      icon = document.getElementById(id);
    //  if (icon) icon.style.display = 'block';
    //},
    //hide : function(name) {
    //  var id = 'JBUILDER-toggle-' + name,
    //      icon = document.getElementById(id);
    //  if (icon) icon.style.display = 'none';
    //},
    /**
     * Initialization with defaults
     * Called by main init, REQUIRED
     */
    init : function() {
      for (var p in this.defaults) {
        if (!xtk2.services.prefs.prefs.hasBooleanPref('extensions.JBUILDER.' + p))
          this.set(p, this.defaults[p]);
      }
    }
  };
  /**
   * Extension loader
   */
  this.load = function() {
    try {
      main.settings.init(); // this loads defaults if ran for the first time
      //main.settings.updateIcons(); // now it's done here
      JBUILDER = new JBUILDERClass();
      xtk2.events.bind(
        ['current_view_changed',
         'current_project_changed',
         'current_view_language_changed',
         'file_changed'],
        main.refresh
      );
      xtk2.events.view_closed(function(event) {
        // if no more views - this removes the last source from the tree
        if (!ko.views.manager._viewCount) self.refresh();
      });
      if (main.settings.get('locate')) main.setAutoLocate(true);
      main.refresh();
    } catch(e) { xtk2.debug.exceptionHandler(e, NAME); }
  };
  window.setTimeout(main.load, 1000, false);
}).apply(ko.extensions.JBUILDER);
