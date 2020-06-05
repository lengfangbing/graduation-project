package structure;

import java.util.*;

//import util.MysqlHelper;

/*
 * 帖子结构体
 * */
public class Post implements Structure{
	private String userId;
	private String postId;
	private String author;
	private String postTitle;
	private String postContent;
	private String postHTML;
	private String time;
//	private boolean success;
//	private int code = 1;
	private int state = 0;
	
	private static String tablename = "invitation";
	public static String getPostTableName() {
		return tablename;
	}
	
	@Deprecated
	private ArrayList<Reply> replys;
	public Post() {
		state = 0;
		replys = new ArrayList<>();
	}
	
	public void initValue(String postId,String postTitle,
						  String postContent,int status) {
//		this.userId = userId;
		this.postId = postId;
		this.postContent = postContent;
//		this.author = author;
		this.postTitle = postTitle;
		this.state = status;
//		this.time = time;
	}
	public void initValue(String[] paras) {
		initValue(
				paras[0],paras[1],paras[2],Integer.valueOf(paras[3]));
	}
	
	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getPostId() {
		return postId;
	}


	public void setPostId(String postId) {
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
	
	@Override
	public void saveValue(){
		ArrayList<String> collist = new ArrayList<>();
		ArrayList<String> valuelist = new ArrayList<>();
		collist.add("userId");
		collist.add("invitationId");
//		collist.add("postTitle");
//		collist.add("postContent");
//		collist.add("postHTML");
		collist.add("time");
		collist.add("author");
		valuelist.add(String.valueOf(userId));
		valuelist.add(String.valueOf(postId));
//		valuelist.add(postTitle);
//		valuelist.add(postContent);
//		valuelist.add(postHTML);
		valuelist.add(time);
		valuelist.add(author);
		
//		success = MysqlHelper.addValueToTable(tablename, collist, valuelist);
	}

	
	@Deprecated
	public String[] getReplyRequestPara() {
		return new Reply().getRequestPara();
	}
	
	@Deprecated
	public String addReply(String userId,String replyContent) {
		Reply p = new Reply();
		p.setUserId(Integer.valueOf(userId));
		p.setReplyContent(replyContent);
		replys.add(p);
		p.saveValue();
		return p.getResponsePara();
	}
	
	@Override
	public String getResponsePara() {
		String re = "{\ninvatationId:"+postId+
//				",\nsuccess:"+success+
				",\nstatus:"+state+
				"\n}";
		
		return re;
	}
	@Override
	public String[] getRequestPara() {
		// TODO Auto-generated method stub
		String[] re = {"invitationId","title","content","status"};
		return re;
	}

	@Override
	public boolean equals(Object obj) {
		if(obj instanceof Post) {
			Post p = (Post)obj;
			if(p.postId == this.postId)
				return true;
		}
		return false;
	}
}
