(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 122:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 124:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 138:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(91);

// EXTERNAL MODULE: ./node_modules/cloudtables-api/dist/CloudTablesApi.js
var CloudTablesApi = __webpack_require__(90);
var CloudTablesApi_default = /*#__PURE__*/__webpack_require__.n(CloudTablesApi);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__(170);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(185);

// EXTERNAL MODULE: ./src/Components/Combobox/jquery-ui-autocomplete.css
var jquery_ui_autocomplete = __webpack_require__(187);

// CONCATENATED MODULE: ./src/Components/Combobox/Combobox.js



function setupAgencyCombobox(combobox) {
  // combobox setup
  $(function () {
    $.widget('custom.combobox', {
      _create: function () {
        this.wrapper = $('<span>').addClass('custom-combobox').insertAfter(this.element);
        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
        this.stored_input;
      },
      _createAutocomplete: function () {
        var selected = this.element.children(':selected'),
          value = selected.val() ? selected.text() : '';
        this.input = $('<input>').appendTo(this.wrapper).val(value).attr('title', '').addClass('custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left').autocomplete({
          delay: 0,
          minLength: 0,
          source: this._source.bind(this)
        }).tooltip({
          classes: {
            'ui-tooltip': 'ui-state-highlight'
          }
        });

        // clear the input on focus
        this._on(this.input, {
          focus: function (event, ui) {
            // store current value
            this.stored_input = this.input[0].value;
            // clear input text
            this.input[0].value = '';
          }
        });
        this._on(this.input, {
          focusout: function (event, ui) {
            ;
            // reset stored value if blank
            if (this.input[0].value == '') {
              this.input[0].value = this.stored_input;
            }
          }
        });
        this._on(this.input, {
          autocompleteselect: function (event, ui) {
            ui.item.option.selected = true;
            this._trigger('select', event, {
              item: ui.item.option
            });
            // trigger change event
            $('#combobox').trigger('change');

            // clear input focus
            this.stored_input = null;
            this.input[0].blur();
          },
          autocompletechange: '_removeIfInvalid'
        });
      },
      _createShowAllButton: function () {
        var input = this.input,
          wasOpen = false;
        $('<a>').attr('tabIndex', -1)
        // .attr('title','Show All Items')
        .tooltip().appendTo(this.wrapper).button({
          icons: {
            primary: 'ui-icon-triangle-1-s'
          },
          text: false
        }).removeClass('ui-corner-all').addClass('custom-combobox-toggle ui-corner-right').on('mousedown', function () {
          wasOpen = input.autocomplete('widget').is(':visible');
        }).on('click', function () {
          input.trigger('focus');

          // Close if already visible
          if (wasOpen) {
            return;
          }

          // Pass empty string as value to search for, displaying all results
          input.autocomplete('search', '');
        });
      },
      _source: function (request, response) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), 'i');
        response(this.element.children('option').map(function () {
          var text = $(this).text();
          if (this.value && (!request.term || matcher.test(text))) return {
            label: text,
            value: text,
            option: this
          };
        }));
      },
      _removeIfInvalid: function (event, ui) {
        // Selected an item, nothing to do
        if (ui.item) {
          return;
        }

        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children('option').each(function () {
          if ($(this).text().toLowerCase() === valueLowerCase) {
            this.selected = valid = true;
            return false;
          }
        });

        // Found a match, nothing to do
        if (valid) {
          return;
        }

        // Remove invalid value
        this.input.val('')
        // .attr('title','No matches')
        .tooltip('open');
        this.element.val('');
        this._delay(function () {
          this.input.tooltip('close').attr('title', '');
        }, 2500);
        this.input.autocomplete('instance').term = '';
      },
      _destroy: function () {
        this.wrapper.remove();
        this.element.show();
      }
    });

    // execute function
    $(combobox).combobox();
  });
}
/* harmony default export */ var Combobox = (setupAgencyCombobox);
// CONCATENATED MODULE: ./src/data/categories.js
const categories = ["🪥  Bathroom items", "☕️  Beverages", "🧀  Dairy", "🥫  Dried & canned foods", "🍏  Fruits & Vegetables", "🍞  Grains", "🥜  Nuts & seeds", "🍳  Oils", "🍼  Other foods", "🍗  Proteins"];
/* harmony default export */ var data_categories = (categories);
// CONCATENATED MODULE: ./src/data/params.js
const params = {
  appId: 'app',
  agencyId: 'dp-121',
  // find in the data page of your cloudtables dataset
  clientId: 'food-prices',
  // unique for each dataset
  cloudTableId: 'a93f4d3e-c57e-11f0-8ff6-671ebea0c98b',
  // find in embed tab
  // below here probably won’t change 
  tableId: 'cloudtable',
  // DOM element for the table
  cloudTableDomain: 'vs-postmedia-a.cloudtables.me',
  // should probably have 3-4 servers in the pool...
  serverPool: ['vs-postmedia-a.cloudtables.me'],
  apiKey: 'kcZqiHL7MiUCi1waLZYN1vkz' // read-only    
};
/* harmony default export */ var data_params = (params);
// EXTERNAL MODULE: ./src/css/normalize.css
var normalize = __webpack_require__(188);

// EXTERNAL MODULE: ./src/css/postmedia.css
var postmedia = __webpack_require__(189);

// EXTERNAL MODULE: ./src/css/colors.css
var colors = __webpack_require__(190);

// EXTERNAL MODULE: ./src/css/fonts.css
var fonts = __webpack_require__(191);

// EXTERNAL MODULE: ./src/css/main.css
var main = __webpack_require__(192);

// EXTERNAL MODULE: ./src/css/cloudtable.css
var cloudtable = __webpack_require__(193);

// CONCATENATED MODULE: ./src/fonts/Shift-Bold.otf
/* harmony default export */ var Shift_Bold = (__webpack_require__.p + "assets/Shift-Bold.8c454d7e.otf");
// CONCATENATED MODULE: ./src/fonts/Shift-BoldItalic.otf
/* harmony default export */ var Shift_BoldItalic = (__webpack_require__.p + "assets/Shift-BoldItalic.144e2c1f.otf");
// CONCATENATED MODULE: ./src/fonts/BentonSansCond-Regular.otf
/* harmony default export */ var BentonSansCond_Regular = (__webpack_require__.p + "assets/BentonSansCond-Regular.4421f875.otf");
// CONCATENATED MODULE: ./src/fonts/BentonSansCond-RegItalic.otf
/* harmony default export */ var BentonSansCond_RegItalic = (__webpack_require__.p + "assets/BentonSansCond-RegItalic.06edc58b.otf");
// CONCATENATED MODULE: ./src/fonts/BentonSansCond-Bold.otf
/* harmony default export */ var BentonSansCond_Bold = (__webpack_require__.p + "assets/BentonSansCond-Bold.87a66dcd.otf");
// CONCATENATED MODULE: ./src/index.js






// CSS







// FONTS






// VARS
let server;
let serverPool;

// JS FUNCTIONS
const init = async () => {
  // assign server - HACK!!! DISABLE WHEN TRAFFIC DROPS
  // serverPool = params.serverPool;
  // server = await assignServer(serverPool);

  server = data_params.cloudTableDomain;

  // create dynamic list of options for agency select tag
  createAgencyComboBox(data_categories);

  // create combobox filter for agencies
  Combobox('#combobox');
  $('#combobox').change(comboboxChangeHandler);

  // load the unfiltered cloudtable
  loadCloudTable('');
};

// super-hack "load balancer"
function assignServer(serverPool) {
  let server;
  // const date = new Date();
  // const current_min = date.getMinutes();

  // if (current_min % 2 == 0) {
  //     server = params.cloudTableDomain;
  // } else {
  //     server = params.cloudTableDomain_v2;
  // }
  if (serverPool.length == 0) {
    // re-assign server pool & pull sever from pool
  } else {
    // pull server from pool
    server = serverPool.pop();
  }

  // return server
  return server;
}
function comboboxChangeHandler(e) {
  // reset container dom element
  $('.cloudtables')[0].textContent = '';
  const category = e.target.value.slice(3);
  console.log(category);

  // reload the table with selected agency filtered
  const filterValue = e.target.value === 'All foods' ? null : category;

  // reload table
  loadCloudTable(filterValue);
}
function createAgencyComboBox(agenciesList) {
  let agenciesString = '';

  // sort our list
  const list = agenciesList.sort();
  list.unshift('All foods');
  list.forEach(d => {
    agenciesString += "<option value='".concat(d, "'>").concat(d, "</option>");
  });
  $('#combobox').append(agenciesString);
}
async function loadCloudTable(agency) {
  let conditionsArray = [{
    id: data_params.agencyId,
    value: agency
  }];

  // if the filter has been selected, filter for those options, otherwise show everything (null)
  let conditions = agency ? conditionsArray : null;

  // grab the ct api instance
  let api = new CloudTablesApi_default.a(data_params.apiKey, {
    clientName: data_params.clientId,
    // Client's name - optional
    domain: server,
    // CloudTables host
    // domain: params.cloudTableDomain,       // Your CloudTables host
    // secure: false,              // Disallow (true), or allow (false) self-signed certificates   
    // ssl: false,               // Disable https
    conditions: conditions // Use this to filter table
  });
  console.log("https://".concat(server, "/io/loader/").concat(data_params.cloudTableId, "/table/d"));
  // get a cloudtables api token
  let token = await api.token();
  console.log('CloudTables token:', token);
  // build the script tag for the table
  let script = document.createElement('script');
  script.src = "https://".concat(server, "/io/loader/").concat(data_params.cloudTableId, "/table/d");
  script.setAttribute('data-token', token);
  script.setAttribute('data-insert', data_params.tableId);
  script.setAttribute('data-clientId', data_params.clientId);
  script.onerror = e => console.error('CloudTables script failed to load:', e);

  // insert the script tag to load the table
  let app = document.getElementById(data_params.appId).appendChild(script);
}

// KICK *SHT OFF!!!
init();

/***/ })

},[[194,1,2]]]);