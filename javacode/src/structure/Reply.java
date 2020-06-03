package structure;

import java.util.ArrayList;

import util.MysqlHelper;

@Deprecated
public class Reply implements Structure{
	
	private int postId;
	private int userId;
	private String replyContent;
	private boolean success;
	
	private static String tablename = "commet";
	
	public void initValue(int postId,int userId,String replyContent) {
		this.postId = postId;
		this.replyContent = replyContent;
		this.userId = userId;
	}
	
	public void initValue(String[] paras) {
		initValue(Integer.valueOf(paras[0]),Integer.valueOf(paras[1]),paras[2]);
	}
	
	public int getPostId() {
		return postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getReplyContent() {
		return replyContent;
	}

	public void setReplyContent(String replyContent) {
		this.replyContent = replyContent;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public void saveValue() {
		ArrayList<String> collist = new ArrayList<>();
		ArrayList<String> valuelist = new ArrayList<>();
		collist.add("userId");
		collist.add("postId");
		collist.add("replyContent");
		
		valuelist.add(String.valueOf(userId));
		valuelist.add(String.valueOf(postId));
		valuelist.add(replyContent);
		
		success = MysqlHelper.addValueToTable(tablename, collist, valuelist);
	}

	@Override
	public String getResponsePara() {
		String re = "{\nuserId:"+userId+
				",\npostId:"+postId+
				",\nsuccess:"+success+
				"}";
		return re;
	}

	@Override
	public String[] getRequestPara() {
		String[] re = {"userId","postId","replyContent"};
		return re;
	}
	
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof Reply) {
			Reply p = (Reply)obj;
			if(p.userId == this.userId)
				return true;
		}
		return false;
	}
}
