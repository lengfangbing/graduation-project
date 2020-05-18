**接口列表**

  ### 发帖


```javascript
/*
url:
http://127.0.0.1:8080/post/publish        POST
请求体:
{
    userId: 12345678,        发帖的用户ID        Number
    postId: 110010,        帖子ID        Number
    postTitle: "这是标题",        帖子标题        String
    postContent: "这是正文",        帖子正文        String
    postHTML: "<h1>这是富文本</h1>",        帖子富文本        String
    time: "2020/05/05"        发帖时间        String
}
返回体:
{
    userId: 12345678,        发帖的用户ID        Number
    postId: 110010,        帖子ID        Number
    success: true,        是否成功        Boolean
    state: 0        当前帖子状态, 0为待审核, 1为审核通过, 2为未通过审核        Number
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
    userId: 12345678,        要回帖的用户ID        Number
    postId: 110010,        被回帖的帖子ID        Number
    replayContent: "你说得对"        回帖的内容        String
}
返回体:
{
    userId: 12345678,        要回帖的用户ID        Number
    postId: 110010,        被回帖的帖子ID        Number
    success: true        是否回帖成功        Boolean
}
*/
```
### 审核帖子


```javascript
/*
url:
http://127.0.0.1:8080/post/check        POST
请求体:
{
    postId: 110010,        要审核的帖子ID        Number
    state: 1        要更改的状态码        Number
}
返回体:
{
    postId: 110010,        审核后的帖子ID        Number
    state: 1,        更改后的状态码        Number
    success: true        是否审核完成        Boolean
}
*/
```

**最关键的部分, Java解决跨域的问题**
<h2>
使用cors进行设置跨域, 跨域本质是因为host, ip, port其中一个不同, 那么就会拒绝该请求, 但是配置了cors, 
就可以设置access-allow-origin: *, 表示允许所有host, ip, port的请求.
access-allow-methods: PUT, DELETE, GET, POST, 表示允许的请求method
等等...
</h2>
<h2>
参考网址: </br>
https://blog.csdn.net/wudinaniya/article/details/78712469 </br>
https://www.jianshu.com/p/a898c53dd96b </br>
实现的本质是在response header里面加上</br>
Access-Control-Allow-Origin: '*'
</h2>