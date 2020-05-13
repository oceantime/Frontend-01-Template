/*
FY 2020-0510
*/
window.jdls = window.jdls || {};

(function() {
	"use strict";

	var ObjectGraph = jdls.ObjectGraph = function ObjectGraph(name, root, options) {
		options = options || {};

		this._nodes = [];
		this._edges = [];
		this._showBuiltins = !!options.builtins;
		this._showAllFunctions = !!options.allFunctions;

		traverse(this, new jdls.ObjectNode(name, root));
		removePartialEdges(this);
	};

	ObjectGraph.prototype.nodes = function nodes() {
		return this._nodes;
	};

	ObjectGraph.prototype.edges = function edges() {
		return this._edges;
	};

	function traverse(self, node) {
		if (hasNode(self, node)) return;

		addNode(self, node);
		node.forEachSubNode(function(subnode, id, name) {
			if (isBuiltin(subnode) && !self._showBuiltins) return;

			subnode = dedupe(self, subnode);
			addEdge(self, node, subnode, id);
			if (isOrdinaryFunction(subnode, name) && !self._showAllFunctions) return;
			traverse(self, subnode);
		});
	}

	function removePartialEdges(self) {

		var result = [];
		self._edges.forEach(function(element) {
			var node = findNode(self, element.to);
			if (node !== undefined) {
				element.to = node;
				result.push(element);
			}
		});
		self._edges = result;
	}

	function hasNode(self, node) {
		return findNode(self, node) !== undefined;
	}

	function dedupe(self, node) {
		return findNode(self, node) || node;
	}

	function findNode(self, node) {
		var matchingNodes = self._nodes.filter(function(element) {
			return element.equals(node);
		});
		if (matchingNodes.length > 1) throw new Error("Node [" + node.name() + "] was stored multiple times; that should be impossible");
		return matchingNodes[0];
	}

	function addNode(self, node) {
		self._nodes.push(node);
	}

	function addEdge(self, from, to, fromField) {
		self._edges.push({
			from: from,
			to: to,
			fromField: fromField
		});
	}

	function isBuiltin(node) {
		var value = node.value();
		return value === Object.prototype ||
			value === Function.prototype ||
			value === Array.prototype ||
			value === String.prototype ||
			value === Boolean.prototype ||
			value === Number.prototype ||
			value === Date.prototype ||
			value === RegExp.prototype ||
			value === Error.prototype;
	}

	function isOrdinaryFunction(node, propertyName) {
		var func = node.value();
		if (typeof func !== "function") return false;

		var prototype = func.prototype;
		if (prototype && typeof prototype !== "object") return false;

		var constructor = propertyName === "constructor";
		var standardFunction = !hasUnusualProperties(func, ["length", "name", "caller", "arguments", "prototype"]);
		var standardPrototype = !hasUnusualProperties(prototype, ["constructor"]);
		var selfReferencingPrototype = !prototype || prototype.constructor === func;

		return !constructor && standardFunction && standardPrototype && selfReferencingPrototype;

		function hasUnusualProperties(obj, normalProperties) {
			if (obj === undefined || obj === null) return false;

			var unusualProperties = Object.getOwnPropertyNames(obj).filter(function(property) {
				return normalProperties.indexOf(property) === -1;
			});
			return (unusualProperties.length !== 0);
		}
	}

}());