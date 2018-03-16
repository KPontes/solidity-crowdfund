"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require("semantic-ui-react");

var _factory = require("../ethereum/factory");

var _factory2 = _interopRequireDefault(_factory);

var _Layout = require("../components/Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/home/ponteskl/Projects/Solidity/kickstart/pages/index.js?entry";


// class based component

var CampaignIndex = function (_Component) {
	(0, _inherits3.default)(CampaignIndex, _Component);

	function CampaignIndex() {
		(0, _classCallCheck3.default)(this, CampaignIndex);

		return (0, _possibleConstructorReturn3.default)(this, (CampaignIndex.__proto__ || (0, _getPrototypeOf2.default)(CampaignIndex)).apply(this, arguments));
	}

	(0, _createClass3.default)(CampaignIndex, [{
		key: "renderCampaigns",

		//async componentDidMount() { code cleaned }

		value: function renderCampaigns() {
			// map will iterate through each campaign item
			var items = this.props.campaigns.map(function (address) {
				return {
					header: address,
					description: _react2.default.createElement("a", {
						__source: {
							fileName: _jsxFileName,
							lineNumber: 23
						}
					}, "View campaign"),
					fluid: true
				};
			});
			return _react2.default.createElement(_semanticUiReact.Card.Group, { items: items, __source: {
					fileName: _jsxFileName,
					lineNumber: 27
				}
			});
		}
	}, {
		key: "render",
		value: function render() {
			//link refering css here is because Next does not support css config
			//Normally reference to link tags should be on the Head of the Html tag,
			//but with Next we do not have an easy access to our default Html document, as instead, Next generate one for us
			return (
				//everything inside the Layout tags will be passed to the Layout component as props.children
				_react2.default.createElement(_Layout2.default, {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 36
					}
				}, _react2.default.createElement("div", {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 37
					}
				}, _react2.default.createElement("link", {
					rel: "stylesheet",
					href: "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css",
					__source: {
						fileName: _jsxFileName,
						lineNumber: 38
					}
				}), _react2.default.createElement("h3", {
					__source: {
						fileName: _jsxFileName,
						lineNumber: 42
					}
				}, "Open Campaigns"), _react2.default.createElement(_semanticUiReact.Button, {
					floated: "right",
					content: "Create Campaign",
					icon: "add circle",
					primary: true,
					__source: {
						fileName: _jsxFileName,
						lineNumber: 43
					}
				}), this.renderCampaigns()))
			);
		}
	}], [{
		key: "getInitialProps",

		//Class method required from Next instead of DidMount, for initilizing on server side
		// Next does not execute DidMount, instead executes InitialProps
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				var campaigns;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return _factory2.default.methods.getDeployedCampaigns().call();

							case 2:
								campaigns = _context.sent;
								return _context.abrupt("return", { campaigns: campaigns });

							case 4:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getInitialProps() {
				return _ref.apply(this, arguments);
			}

			return getInitialProps;
		}()
	}]);

	return CampaignIndex;
}(_react.Component);

/*Next requires that every file in the pages directory must export a component*/

exports.default = CampaignIndex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2FyZCIsIkJ1dHRvbiIsImZhY3RvcnkiLCJMYXlvdXQiLCJDYW1wYWlnbkluZGV4IiwiaXRlbXMiLCJwcm9wcyIsImNhbXBhaWducyIsIm1hcCIsImhlYWRlciIsImFkZHJlc3MiLCJkZXNjcmlwdGlvbiIsImZsdWlkIiwicmVuZGVyQ2FtcGFpZ25zIiwibWV0aG9kcyIsImdldERlcGxveWVkQ2FtcGFpZ25zIiwiY2FsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQU07O0FBQ2YsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBWTs7Ozs7Ozs7O0FBRW5COztJQUNNLEE7Ozs7Ozs7Ozs7T0FTTDs7OztvQ0FFa0IsQUFDakI7QUFDQTtPQUFNLGFBQVEsQUFBSyxNQUFMLEFBQVcsVUFBWCxBQUFxQixJQUFJLG1CQUFXLEFBQ2pEOzthQUFPLEFBQ0UsQUFDUjtrQ0FBYSxjQUFBOztpQkFBQTttQkFBQTtBQUFBO0FBQUEsTUFBQSxFQUZQLEFBRU8sQUFDYjtZQUhELEFBQU8sQUFHQyxBQUVSO0FBTE8sQUFDTjtBQUZGLEFBQWMsQUFPZCxJQVBjO3dDQU9QLEFBQUMsc0JBQUQsQUFBTSxTQUFNLE9BQVosQUFBbUI7ZUFBbkI7aUJBQVAsQUFBTyxBQUNQO0FBRE87SUFBQTs7OzsyQkFHQyxBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0M7QUFDQTtvQkFBQSxBQUFDOztnQkFBRDtrQkFBQSxBQUNDO0FBREQ7QUFBQSx1QkFDQyxjQUFBOztnQkFBQTtrQkFBQSxBQUNDO0FBREQ7QUFBQTtVQUNDLEFBQ0ssQUFDSjtXQUZELEFBRU07O2dCQUZOO2tCQURELEFBQ0MsQUFJQTtBQUpBO0FBQ0Msd0JBR0QsY0FBQTs7Z0JBQUE7a0JBQUE7QUFBQTtBQUFBLE9BTEQsQUFLQyxBQUNBLG1DQUFBLEFBQUM7Y0FBRCxBQUNTLEFBQ1I7Y0FGRCxBQUVTLEFBQ1I7V0FIRCxBQUdNLEFBQ0w7Y0FKRDs7Z0JBQUE7a0JBTkQsQUFNQyxBQU1DO0FBTkQ7QUFDQyxhQVZKLEFBRUMsQUFDQyxBQVlFLEFBQUssQUFJVDs7OztPQTdDRDs7QUFDQTs7Ozs7Ozs7OztlQUV5QixrQkFBQSxBQUFRLFFBQVIsQUFBZ0IsdUJBQWhCLEFBQXVDLEE7O1lBQXpEO0E7eUNBRUMsRUFBRSxXQUFGLEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFObUIsQTs7QUFpRDVCLEFBQ0E7O2tCQUFBLEFBQWUiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL2hvbWUvcG9udGVza2wvUHJvamVjdHMvU29saWRpdHkva2lja3N0YXJ0In0=