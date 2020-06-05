"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var react_1 = require("react");
var mobx_react_1 = require("mobx-react");
var Button_1 = require("@/components/Button");
var Input_1 = require("@/components/Input");
var wangeditor_1 = require("wangeditor");
var utils_1 = require("@/utils");
var history_1 = require("history");
var history = history_1.createHashHistory();
require("./index.less");
var Publish = /** @class */ (function (_super) {
    __extends(Publish, _super);
    function Publish(props) {
        var _this = _super.call(this, props) || this;
        _this.publishFunc = function () {
            var _a = _this.props.userStore, userId = _a.userId, userName = _a.userName;
            var postPublish = _this.props.publishStore.postPublish;
            var _b = _this.state, title = _b.title, html = _b.html;
            if (title.trim() === '' || html.trim() === '') {
                return window.showToast({ title: '请不要输入空标题/文本' });
            }
            _this.setState({
                title: '',
                html: ''
            });
            postPublish({
                title: title,
                content: html,
                author: userName,
                authorId: userId
            }).then(function () {
                history.replace('/');
            });
        };
        _this.state = {
            title: '',
            html: ''
        };
        return _this;
    }
    Publish.prototype.componentDidMount = function () {
        var _this = this;
        var userId = this.props.userStore.userId;
        if (utils_1.notLogin(userId)) {
            return;
        }
        var html = this.props.publishStore.html;
        var elem = this.refs.editor;
        var editor = new wangeditor_1["default"](elem);
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = function (html) {
            _this.setState({
                html: html
            });
        };
        editor.customConfig.uploadImgShowBase64 = true;
        editor.create();
        editor.txt.html(html);
    };
    Publish.prototype.componentWillUnmount = function () {
        var setHtml = this.props.publishStore.setHtml;
        var html = this.state.html;
        setHtml(html);
    };
    Publish.prototype.inputChange = function (val) {
        this.setState({
            title: val
        });
    };
    Publish.prototype.render = function () {
        var _this = this;
        var userId = this.props.userStore.userId;
        if (!userId) {
            return null;
        }
        return (react_1["default"].createElement("div", { className: 'publish' },
            react_1["default"].createElement("div", { className: "title" },
                react_1["default"].createElement(Input_1["default"], { controls: true, placeholder: "\u8BF7\u8F93\u5165\u6807\u9898", onChange: function (target, value) {
                        _this.inputChange(value);
                    } })),
            react_1["default"].createElement("div", { ref: "editor", className: 'editor', style: { textAlign: 'left' } }),
            react_1["default"].createElement("div", { className: "operation" },
                react_1["default"].createElement(Button_1["default"], { timer: 300, onClick: this.publishFunc }, "\u53D1\u8868"))));
    };
    Publish = __decorate([
        mobx_react_1.inject('publishStore', 'userStore'),
        mobx_react_1.observer
    ], Publish);
    return Publish;
}(react_1.Component));
exports["default"] = Publish;
