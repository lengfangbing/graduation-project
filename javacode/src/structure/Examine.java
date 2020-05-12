package structure;

public class Examine implements Structure{
	private int postId;
	private int state;
	private boolean success;
	
	public void initValue(int postId,int state) {
		this.postId = postId;
		this.state = state;
	}
	public void initValue(String[] paras) {
		initValue(Integer.valueOf(paras[0]),Integer.valueOf(paras[1]));
	}
	
	
	public void saveValue() {
		
	}
	@Override
	public String getResponsePara() {
		
		return null;
	}
	@Override
	public String[] getRequestPara() {
		
		return null;
	}
	
}
