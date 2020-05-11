package structure;



public class Reply implements Request,Response{
	
	private int postId;
	private int userId;
	private String replyContent;
	private boolean success;
	
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

	public void saveReplyValue() {
		
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
