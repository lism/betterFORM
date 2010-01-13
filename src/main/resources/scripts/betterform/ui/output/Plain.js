/*
 * Copyright (c) 2010. betterForm Project - http://www.betterform.de
 * Licensed under the terms of BSD License
 */

dojo.provide("betterform.ui.output.Plain");

dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("betterform.ui.ControlValue");

dojo.declare(
        "betterform.ui.output.Plain",
         betterform.ui.ControlValue,
{
    id: "",
    value:"",

    templateString:"<span id=\"${id}\" dojoAttachPoint=\"containerNode\"></span>",


    postMixInProperties:function() {
        this.inherited(arguments);
        this.applyProperties(dijit.byId(this.xfControlId), this.srcNodeRef);
    },

    postCreate:function() {
        this.inherited(arguments);
        this.setCurrentValue();
    },

    _onFocus:function() {
        // console.debug("Plain._onFocus (id:"+this.id+")");
        this.inherited(arguments);
        this.handleOnFocus();
    },

    _onBlur:function(){
        // console.debug("Plain._onBlur (id:"+this.id+")");
        this.inherited(arguments);
        this.handleOnBlur();
    },

    getControlValue:function(){
        return this.containerNode.innerHTML;
    },

    _handleSetControlValue:function(value) {
        // console.debug("betterform.ui.output.Plain._handleSetControlValue: Value: ", value);
        this.containerNode.innerHTML = value;
    },
    
    applyState:function(){
        /* overwritten with no content because outputs are allways readonly */
    },

    displayValidity:function(/*Boolean*/ valid) {
        // console.debug("Plain.displayValidity (id:" + this.id +")");
        if (valid) {
            dojo.removeClass(this.domNode, "caDisplayInvalid");
            this.hideAlert();
        } else {
            dojo.addClass(this.domNode, "caDisplayInvalid");
            this.showAlert();
        }
    }



});


