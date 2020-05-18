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
var item_1 = require("./item");
require("./index.less");
var Invitation = /** @class */ (function (_super) {
    __extends(Invitation, _super);
    function Invitation(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            list: []
        };
        return _this;
    }
    Invitation.prototype.componentDidMount = function () {
        this.getList();
    };
    Invitation.prototype.getList = function () {
        var _this = this;
        var getList = this.props.listStore.getList;
        getList()
            .then(function (res) {
            if (res) {
                _this.setState({
                    list: res
                });
            }
        });
    };
    Invitation.prototype.sendCommet = function (config, reply) {
        var postCommet = this.props.listStore.postCommet;
        var _a = this.props.userStore, userId = _a.userId, userName = _a.userName;
        var invitationId = config.invitationId, authorId = config.authorId;
        if (!userId) {
            return alert('请先登录');
        }
        postCommet({
            user: userName,
            invitationId: invitationId,
            authorId: authorId,
            userId: userId,
            reply: reply
        })
            .then(function (res) {
            console.log(res);
        });
    };
    Invitation.prototype.replyClick = function (reply, config) {
        this.sendCommet(config, reply);
    };
    Invitation.prototype.render = function () {
        var _this = this;
        var list = this.state.list;
        return (react_1["default"].createElement("div", { className: 'invitation' },
            react_1["default"].createElement("div", { className: "invitation-wrapper" }, list.map(function (val) {
                return (react_1["default"].createElement(item_1["default"], { key: val.invitationId, config: {
                        title: val.title + "  -- " + val.author,
                        html: val.content,
                        id: val.invitationId
                    }, onClick: function (reply) { return _this.replyClick(reply, val); } }));
            }))));
    };
    Invitation = __decorate([
        mobx_react_1.inject('listStore', 'userStore'),
        mobx_react_1.observer
    ], Invitation);
    return Invitation;
}(react_1.Component));
exports["default"] = Invitation;
