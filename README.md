**接口列表**



### 发帖


```javascript
/*
url:
http://127.0.0.1:8080/post/publish        POST
请求体:
{
    userId: 12345678,        发帖的用户ID        Number
    invitationId: 110010,        帖子ID        Number
    author: "得分"  ,          作者      String
    time: "2020/05/05 12:59:12"        发帖时间        String
}
返回体:
{
    code: 1,
    success: true,        成功        Boolean
}
*/
```
### 回帖


```javascript
/*
url:
http://127.0.0.1:8080/post/replay        POST
请求体:
{
    userId: 12345678,        回帖的用户ID        Number
    invitationId: 110010,        帖子ID        Number
    authorId: 131231,       帖子作者ID      Number
    user: "我回的贴",         回帖的用户昵称    String
    time: "2020/12/13 13:37:12",       回帖的时间     String
    replay: "你说得对"        回帖的内容        String
}
返回体:
{
    code: 1,
    success: true        成功        Boolean
}
*/
```

### 埋点

```javascript
/*
url:
http://127.0.0.1:8080/post/event        POST
请求体:
{
    userId: 12345678,        用户ID        Number
    eventFlag: "埋点事件",      埋点事件, 比如click, publish...     String
    time: "2020/03/25 18:57:48"      时间        String
}
返回体:
{
    code: 1,
    success: true        成功        Boolean
}
*/

```

**最关键的部分, Java解决跨域的问题**
使用cors进行设置跨域, 跨域本质是因为host, ip, port其中一个不同, 那么就会拒绝该请求, 但是配置了cors, 
就可以设置access-allow-origin: *, 表示允许所有host, ip, port的请求.
access-allow-methods: PUT, DELETE, GET, POST, 表示允许的请求method
等等...
**参考网址**
https://blog.csdn.net/wudinaniya/article/details/78712469 </br>
https://www.jianshu.com/p/a898c53dd96b </br>
实现的本质是在response header里面加上</br>
Access-Control-Allow-Origin: '*'

**项目(前端)启动方法**

 1. 前提条件, 安装了mongodb, 安装了nodejs
 2. 打开mongodb服务
 3. 并且在mongodb中有对应的表
 4. 在项目目录下执行npm install 或者 yarn
 5. 在步骤3完成后, 同样的项目目录下执行yarn start