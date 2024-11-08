sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, formatter, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
		formatter:formatter,
		onInit() {
			const oViewModel = new JSONModel({
				currency: "TEHE"
			});
			this.getView().setModel(oViewModel, "view");
		},
		onFilterInvoices (oEvent){
			// build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter ( "ProductName", FilterOperator.Contains, sQuery));

			}
			// filter binding
			const oList = this.byId ("invoiceList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter); 
		},
	
		onPress: function (oEvent){
			var oItem= oEvent.getSource()
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail",{
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			});
		}
	});
});