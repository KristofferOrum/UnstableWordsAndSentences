#ESOH jQuery plugin skeleton

A more heavy weight, but also more powerfull jQuery plugin skeleton.

Based on [Addy Osmani's Lightweight jQuery plugin design pattern][addyosmani], which does not support public methods, that return a certain value.

##What does it support?

* Prevents against multiple instantiations
* Default options
* Overridable default options
* Customizable callbacks / events
* Public methods

##Plugin Example

[View Demo][example]

To give this skeleton a more practical meaning, I've implemented a sort of useful plugin, that calculates the "square" of a numeric value inside a text input.

The plugin contains:

* 1 option: "nr"
* 1 event: "onLoad()"
* 1 private method: "_getSquare()"
* 2 public methods: "getValue()", "setValue()"

[addyosmani]: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#jquerypluginpatterns
[example]: http://e-spres-oh.github.io/esoh-jquery-plugin-skeleton/example/
