// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
//http://www.enchantedlearning.com/wordlist/ GET ALL THESE IN HERE
//remeber: http://julian.com/research/blast/

;
(function($, window, document) {

    'use strict';
    if (!$.unstableVars) {
        $.unstableVars = {};
    };
    var pluginName = 'unstableWords',
        // the name used in .data()
        dataPlugin = 'plugin_' + pluginName,

        // default options, used for instantion, if not explicitly set
        defaults = {
            nr: 0,
            onLoad: function() {
                console.info('default onLoad() event');
            }
        };

    /**
     *  jQuery plugin skeleton
     *
     *  @alias square
     *  @constructor
     *
     *  @author   Andrei Pfeiffer
     *
     *  @requires jquery.js
     *
     *  @param   {jQueryObject}  element             - the DOM element
     *  @param   {Object}        [options]             - a set of options, to override the defaults
     *  @param   {String}        [options.nr = 1]      - an optional setting
     *  @param   {Function}      [options.onLoad]      - the event is triggered after plugin is loaded
     *
     *  @example 
        // minimal setup
        var instance = $('#element').square();

        // customized setup
        var instance = $('#element').square({
            nr: 5,
            onLoad: function() {
                console.log('plugin is loaded')
            }
        });
     */
    var Plugin = function(element, options) {

        // This is the plugin's constructor
        // It is instantiated for each matched DOM element
        // The huge comment block above is JSDoc syntax, for generated documentation
        // The name of the constructor is used ONLY internally
        // As a general best-practise, constructors should be Capitalized

        // store the element element
        this.element = $(element);

        // override default options
        // create a new object, with all default settings, overridden only by the init options
        this.options = $.extend({}, defaults, options);
    };


    /////////////////////////////////////
    //         Private methods         //
    /////////////////////////////////////


    /**
     *  Calculates the square for a given number
     *
     *  @param   {Number}  nr  the input number
     *  @returns {Number}
     */
    var _getSquare = function(nr) {
        console.log($.unstableVars.worldlists);
        console.log($.unstableVars.codes);
        return nr * nr;
    };


    ////////////////////////////////////
    //         Public methods         //
    ////////////////////////////////////


    Plugin.prototype = {

        /**
         *  Initializes the plugin.
         *  This is automatically called when the plugin is called.
         *
         *  @private
         */
        init: function() {
            var _this = this;

            //load data from json THIS SHOULD HAPPEN ONLY ONCE!

            //if (!$.unstableVars.status) {

            console.log("wordlist: " + _this.options.wordlist);
            $.getJSON(_this.options.wordlist, function(data) {
                $.unstableVars.worldlists = [];
                $.unstableVars.codes = [];
                $.unstableVars.names = [];
                $.unstableVars.status = "loaded";


                $.each(data, function(key, val) {
                    $.unstableVars.worldlists.push(val.words);
                    $.unstableVars.codes.push(val.code);
                    $.unstableVars.names.push(val.name);

                    //codes.push(val.code);
                    //console.log($.unstableVars.names[$.unstableVars.names.length - 1])

                });

                //}

                //find and replace variables, wrap in span tags for furter random
                var unstableContent = _this.element.html();
                for (var i = 0; i < $.unstableVars.codes.length; i++) {
                    var pattern = new RegExp("(" + $.unstableVars.codes[i] + ")", "ig");
                    //console.log(pattern);
                    var unstableContent = unstableContent.replace(pattern, '<span class="' + $.unstableVars.names[i] + '">' + $.unstableVars.worldlists[i][
                        [Math.floor(Math.random() * $.unstableVars.worldlists[i].length)]
                    ] + '</span>');
                    // $unstableVars.codes[i];
                };;

                _this.element.html(unstableContent);


                // bind events
                // _this.element.on('keyup', function() {
                //     _this.elementSquare.val(_getSquare($(this).val()));
                // });

                // set initial value, and trigger the 'keyup', to update the square
                _this.element.val(_this.options.nr).trigger('keyup');

                // trigger onLoad callback
                _this.options.onLoad();

            });


        },

        /**
         *  Gets the number in the field
         *
         *  @example instance.square('getValue');
         */
        getValue: function() {
            return this.element.val();
        },

        /**
         *  Sets a specific number in the field
         *
         *  @param  {Number}  nr
         *
         *  @example instance.square('setValue', 2);
         */
        setValue: function(nr) {
            var _nr = parseInt(nr, 10);

            if (isNaN(_nr)) {
                return false;
            }

            if (_nr < 0) {
                _nr = 0;
            }
            //console.log(worldlists[worldlists.length - 1]);

            this.element.val(_nr);
        }
    };


    //////////////////////////////////////////////////
    //         Plugin wrapper - LEAVE AS IS         //
    //////////////////////////////////////////////////


    // A plugin wrapper around the constructor, preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        var instance;

        // If the first parameter is an object (options), or was omitted,
        // call Plugin.init()
        if (typeof options === 'undefined' || typeof options === 'object') {
            return this.each(function() {
                // prevent multiple instantiations
                if (!$.data(this, dataPlugin)) {
                    $.data(
                        this,
                        dataPlugin,
                        new Plugin(this, options)
                    );
                }

                instance = $(this).data(dataPlugin);

                if (typeof instance['init'] === 'function') {
                    instance.init();
                }
            });

            // checks that the requested public method exists
        } else if (typeof options === 'string') {
            var methodName = arguments[0],
                args = Array.prototype.slice.call(arguments, 1),
                returnVal;

            this.each(function() {
                var instance = $(this).data(dataPlugin);

                // Check that the element has a plugin instance, and that
                // the requested public method exists.
                if ($.data(this, dataPlugin) && typeof $.data(this, dataPlugin)[methodName] === 'function') {
                    // Call the method of the Plugin instance, and Pass it
                    // the supplied arguments.
                    returnVal = $.data(this, dataPlugin)[methodName].apply(instance, args);
                } else {
                    console.info('Method ' + options + ' does not exist on jQuery.' + pluginName);
                }
            });

            if (typeof returnVal !== 'undefined') {
                // If the method returned a value, return the value
                return returnVal;
            } else {
                // Otherwise, returning 'this' preserves chainability
                return this;
            }
        } else {
            console.info('Method ' + options + ' does not exist on jQuery.' + pluginName);
        }
    };
})(jQuery, window, document);