/*
FY 2020-0510
*/
window.jdls = window.jdls || {};

(function() {
	"use strict";

	var exports = window.jdls.viz = {};
	var details = exports.details = {};

	var ARROW_COLOR = "#555555";
	var ARROW_HEAD_MULTIPLIER = "0.8";

	var TABLE_FONT_POINTS = 10;

	var TITLE_BACKGROUND_COLOR = "#00668F";
	var TITLE_FONT_COLOR = "white";
	var TITLE_FONT_POINTS = TABLE_FONT_POINTS + 1;

	var PROPERTY_BACKGROUND_COLOR = "#E3E3E3";
	var PROPERTY_ALT_BACKGROUND_COLOR = "#FDFDFD";
	var PROPERTY_NAME_FONT_COLOR = "#333333";
	var PROPERTY_VALUE_FONT_COLOR = "#666666";

	var PROTOTYPE_BACKGROUND_COLOR = "#0082B6";
	var PROTOTYPE_FONT_COLOR = "white";

	exports.render = function render(rootName, object, options) {
		let objectGraph = new jdls.ObjectGraph(rootName, object, options);

		// 1.antv 不支持这种e-r图datastruct显示方式，所以使用了Viz库
		// return details.vizToSvg(details.graphToViz(objectGraph));

		// 2.使用了antv雷达布局显示
		const data = {
		  // 点集
		  nodes: [],
		  // 边集
		  edges: [],
		};

		nodes();
		function nodes() {
			return objectGraph.nodes().map(function(node) {
				let item = {};
				item.id = node.id();
				item.label = node.name();
				item.labelCfg = {style:{fontSize: 3}};
				console.log(item);
				data.nodes.push(item);
				return node;
			}).join("");
		}
		edges();
		function edges() {
			return objectGraph.edges().map(function(edge) {
				let item = {};
				item.source = edge.from.id();
				item.target = edge.to.id();
				data.edges.push(item);
				return edge;
			}).join("");
		}

		const graph = new G6.Graph({
			container: 'mountNode',
			width: document.getElementById('content').scrollWidth,
			height: document.getElementById('content').scrollHeight || 500,
			layout: {
		    	type: 'radial',
			    center: [ 50, 50 ],     // 可选，默认为图的中心
			    linkDistance: 50,         // 可选，边长
			    maxIteration: 1000,       // 可选
			    unitRadius: 100,          // 可选
			    preventOverlap: true,     // 可选，必须配合 nodeSize
			    nodeSize: 20,             // 可选
			    strictRadial: false       // 可选
			}
		});

		graph.data(data);
		graph.render();
		graph.fitView();

		return '';
		
	};

	details.vizToSvg = function vizToSvg(vizCode) {
		return Viz(vizCode, "svg");
	};

	details.graphToViz = function graphToViz(graph) {
		return '' +
			'digraph g {\n' +
			'  graph [\n' +
			'    rankdir = "LR"\n' +
			'  ];\n' +
			'  node [\n' +
			'    fontname = "Helvetica"\n' +
			'    fontsize = "' + TABLE_FONT_POINTS + '"\n' +
			'    shape = "plaintext"\n' + 
			'  ];\n' +
			'  edge [\n' +
			'    color = "' + ARROW_COLOR + '"\n' +
			'    arrowsize = "' + ARROW_HEAD_MULTIPLIER + '"\n' +
			'  ];\n' +
			'  \n' +
			nodes() +
			edges() +
			'}\n';

		function nodes() {
			return graph.nodes().map(function(node) {
				return details.nodeToViz(node);
			}).join("");
		}

		function edges() {
			return graph.edges().map(function(edge) {
				return details.edgeToViz(edge);
			}).join("");
		}
	};

	details.nodeToViz = function nodeToViz(node) {
		return '' +
			'  "' + node.id() + '" [label=<\n' +
			'    <table border="0" cellborder="0" cellpadding="3" cellspacing="0">\n' +
			'      <th><td port="title" bgcolor="' + TITLE_BACKGROUND_COLOR + '"><font color="' + TITLE_FONT_COLOR + '" point-size="' + TITLE_FONT_POINTS +'">' + escapeHtml(node.name()) + '</font></td></th>\n' +
			fields() +
			prototype() +
			'    </table>\n' +
			'  >];\n';

		function fields() {
			var oddRow = true;
			return node.properties().map(function(property) {
				var color = oddRow ? PROPERTY_BACKGROUND_COLOR : PROPERTY_ALT_BACKGROUND_COLOR;
				oddRow = !oddRow;
				var result = '      <tr><td port="' + property.id + '" bgcolor="' + color + '" align="left" balign="left">&nbsp;<font color="' + PROPERTY_NAME_FONT_COLOR + '">' + escapeHtml(property.name) + ':</font> <font color="' + PROPERTY_VALUE_FONT_COLOR + '">' + escapeHtml(property.value) + '</font>&nbsp;</td></tr>\n';
				return result;
			}).join("");
		}

		function prototype() {
			var proto = node.prototype();
			return '      <tr><td port="' + proto.id + '" bgcolor="' + PROTOTYPE_BACKGROUND_COLOR + '"><font color="' + PROTOTYPE_FONT_COLOR + '">' + escapeHtml(proto.value) + '</font></td></tr>\n';
		}
	};

	details.edgeToViz = function edgeToViz(edge) {
		return '"' + edge.from.id() + '":' + edge.fromField + ' -> "' + edge.to.id() + '":title [];';
	};

	var escapeHtml = details.escapeHtml = function escapeHtml(html) {
		return html.
			replace(/&/g, "&amp;").
			replace(/</g, "&lt;").
			replace(/>/g, "&gt;").
			replace(/"/g, "&quot;").
			replace(/'/g, "&#039;").
			replace(/\n/g, '<br />').
			replace(/\t/g, '  ');
	};

}());
