  /**
   * Refresh button handler
   * Called from XUL
   * @param view (current view)
   */
  this.refresh = function() {
    try {
      if (ko.views.manager.currentView &&
          ko.views.manager.currentView.koDoc &&
          ko.views.manager.currentView.koDoc.buffer) {
        if (!NST) NST = new NSTClass();
        // Here we prevent reloading when source tree is not visible:
        if (typeof ko.uilayout.isTabShown === 'function') { // Komodo 7 way
          // FOLLOWING LINE DOESN'T WORK WITH KOMODO 8!!!
          //if (!ko.uilayout.isTabShown('NST-viewbox')) return;
        } else { // Komodo 6 way
          var t = document.getElementById('NST_tab');
          if (!t || !t.parentNode.selectedItem ||
              t.parentNode.selectedItem.id != 'NST_tab' ||
              t.parentNode.parentNode.parentNode.collapsed) return;
        }
        NST.reloadSource();
      } else NST.init();
    } catch (e) { xtk2.debug.exceptionHandler(e, NAME); }
  };
  /**
   * Toggles tree sorting
   * Called from XUL
   */
  this.toggleSort = function() {
    try {
      this.settings.change('sort');
      this.refresh();
    } catch (e) { xtk2.debug.exceptionHandler(e, NAME); }
  };
  /**
   * Removes search filter from displayed tree
   * Called from XUL
   */
  this.removeFilter = function() {
    try {
      var t = NST;
      t.search_box.value = '';
      t.loadTree();
    } catch (e) {
      xtk2.debug.exceptionHandler(e, NAME);
    }
  };
  /**
   * Filters displayed tree with search text
   * Called from XUL
   */
  this.search = function() {
    try {
      var t = NST;
      if (t.search_box.value) t.filterTree(); else t.loadTree();
    } catch (e) { xtk2.debug.exceptionHandler(e, NAME); }
  };
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
    _switchIcon : function(id, state) {
      var i, icon = document.getElementById(id), classes;
      if (icon) {
        classes = icon.getAttribute('class').split(' ');
        if (state) {
          if (classes.indexOf('active') < 0) classes.push('active');
        } else {
          if ((i = classes.indexOf('active')) >= 0) delete classes[i];
        }
        icon.setAttribute('class', classes.join(' '));
        icon.setAttribute('checked', state);
      }
    },
    /**
     * Updates toggle-icons to their current states
     */
    updateIcons : function() {
      for (var p in this.defaults)
        this._switchIcon('NST-toggle-' + p, this.get(p));
    },
    /**
     * Loads a boolean setting from extension prefs
     * @returns {boolean}
     */
    get : function(name) {
      return xtk2.services.prefs.prefs.getBooleanPref('extensions.NST.' + name);
    },
    /**
     * Save a boolean setting to extension prefs
     * @param {string} name
     */
    set : function(name, value) {
      xtk2.services.prefs.prefs.setBooleanPref('extensions.NST.' + name, value);
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
    show : function(name) {
      var id = 'NST-toggle-' + name,
          icon = document.getElementById(id);
      if (icon) icon.style.display = 'block';
    },
    hide : function(name) {
      var id = 'NST-toggle-' + name,
          icon = document.getElementById(id);
      if (icon) icon.style.display = 'none';
    },
    /**
     * Initialization with defaults
     * Called by main init, REQUIRED
     */
    init : function() {
      for (var p in this.defaults) {
        if (!xtk2.services.prefs.prefs.hasBooleanPref('extensions.NST.' + p))
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
      main.settings.updateIcons(); // now it's done here
      NST = new NSTClass();
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
}).apply(ko.extensions.NST);
