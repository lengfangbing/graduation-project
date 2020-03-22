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