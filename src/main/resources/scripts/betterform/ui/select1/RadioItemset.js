/*
 * Copyright (c) 2010. betterForm Project - http://www.betterform.de
 * Licensed under the terms of BSD License
 */

dojo.provide("betterform.ui.select1.RadioItemset");

dojo.require("dijit._Widget");
dojo.require("betterform.ui.ControlValue");
dojo.require("dojox.data.dom");
/**
	All Rights Reserved.
	@author Joern Turner
	@author Lars Windauer

    class represents itemsets in selects with no appearance, appearance="minimal" or "compact"

**/

dojo.declare(
        "betterform.ui.select1.RadioItemset",
         dijit._Widget,
{
    values:"",

    handleStateChanged:function(contextInfo) {
        // console.debug("RadioItemset.handleStateChanged: ",contextInfo);
        if(contextInfo.targetName == "label"){
            dojo.byId(contextInfo.parentId+"-label").innerHTML = contextInfo.value;
        }else if(contextInfo.targetName == "value"){
            dijit.byId(contextInfo.parentId+"-value")._handleSetControlValue(contextInfo.value);
        }else {
           console.warn("RadioItemSet.handleStateChanged: no action taken for contextInfo: ",contextInfo);
        }
    },


    handleInsert:function(contextInfo) {
        // console.debug("RadioItemset.insertItem: ",contextInfo);

        var itemNode = document.createElement("span");
        dojo.addClass(itemNode, "xfSelectorItem");
        dojo.addClass(itemNode, "xfEnabled");
        dojo.addClass(itemNode, "xfReadWrite");
        dojo.addClass(itemNode, "xfOptional");
        dojo.addClass(itemNode, "xfValid");
        dojo.attr(itemNode, "controltype","radioButtonEntry");

        var generatedIds= contextInfo.generatedIds;
        var itemId = generatedIds[contextInfo.prototypeId];
        dojo.attr(itemNode, "id",itemId );
        var labelNode = document.createElement("label");
        dojo.addClass(labelNode, "xfLabel");
        dojo.attr(labelNode, "id",itemId+"-label" );
        dojo.attr(labelNode, "for",itemId+"-value" );
        labelNode.innerHTML = contextInfo.label;
        var myParentNode = this.domNode.parentNode;
        while(!dojo.hasClass(myParentNode,"xfSelect1")){
            myParentNode = myParentNode.parentNode;
        }

        var valueNode = document.createElement("input");
        dojo.addClass(valueNode, "xfValue");
        dojo.attr(valueNode, "id",itemId+"-value" );
        dojo.attr(valueNode, "selected","false");
        dojo.attr(valueNode, "parentId",myParentNode.id);
        dojo.attr(valueNode, "name",myParentNode.id+"-value");
        dojo.attr(valueNode, "value","");
        dojo.attr(valueNode, "datatype","radio");
        dojo.attr(valueNode, "controltype","radio");

        dojo.place(valueNode,itemNode);
        dojo.place(labelNode,itemNode);

        var controlDijit = new betterform.ui.Control({contextInfo:contextInfo}, itemNode);
        dojo.place(itemNode,this.domNode,  contextInfo.position);
    },
    handleDelete:function(contextInfo) {
        // console.debug("RadioGroup.deleteItem: ",contextInfo);
        var itemToRemove =dojo.query(".xfSelectorItem", this.domNode)[contextInfo.position-1];
        this.domNode.removeChild(itemToRemove)
    }

});


