package structure;

import java.util.HashMap;

/*
 * 帖子结构体
 * */
public class Post implements Request,Response{
	private int userId;
	private int postId;
	private String postTitle;
	private String postContent;
	private String postHTML;
	private String time;
	private boolean success;
	private int state;
	
	public Post() {
		state = 0;
	}
	
	public void initValue(int userId,int postId,String postTitle,
						  String postContent,String postHTML,String time) {
		this.userId = userId;
		this.postId = postId;
		this.postContent = postContent;
		this.postHTML = postHTML;
		this.postTitle = postTitle;
		this.time = time;
	}
	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}


	public int getPostId() {
		return postId;
	}


	public void setPostId(int postId) {
		this.postId = postId;
	}


	public String getPostTitle() {
		return postTitle;
	}


	public void setPostTitle(String postTitle) {
		this.postTitle = postTitle;
	}


	public String getPostContent() {
		return postContent;
	}


	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}


	public String getPostHTML() {
		return postHTML;
	}


	public void setPostHTML(String postHTML) {
		this.postHTML = postHTML;
	}


	public String getTime() {
		return time;
	}


	public void setTime(String time) {
		this.time = time;
	}


	public int getState() {
		return state;
	}


	public void setState(int state) {
		this.state = state;
	}
	
	public boolean savePostValue(){
		
		return true;
	}

	private class reply{
		int userId;
		String replyContent;
		boolean success;
		
	}

	public void initValue(String[] paras) {
		initValue(
				Integer.valueOf(paras[0]),Integer.valueOf(paras[1]),paras[2],paras[3],paras[4],paras[5]);
	}
	
	@Override
	public String getResponsePara() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String[] getRequestPara() {
		// TODO Auto-generated method stub
		return null;
	}

	
}
