package structure;

import java.util.ArrayList;

import util.MysqlHelper;

public class Examine implements Structure{
	private int postId;
	private int state;
	private boolean success;
	
	private static String tablename;
	
	public void initValue(int postId,int state) {
		this.postId = postId;
		this.state = state;
	}
	public void initValue(String[] paras) {
		initValue(Integer.valueOf(paras[0]),Integer.valueOf(paras[1]));
	}
	
	
	public void saveValue() {
		ArrayList<String> collist = new ArrayList<>();
		ArrayList<String> valuelist = new ArrayList<>();
		collist.add("postId");
		collist.add("state");
		
		valuelist.add(String.valueOf(postId));
		valuelist.add(String.valueOf(state));
		
		success = MysqlHelper.updateValue(tablename,
				"postId", String.valueOf(postId), "state", String.valueOf(state));
	}
	@Override
	public String getResponsePara() {
		String re = "{\n"+
				",\npostId:"+postId+
				",\nsuccess:"+success+
				",\nstate:"+state+
				"}";
		
		return re;
	}
	@Override
	public String[] getRequestPara() {
		String[] re = {"postId","state"};
		return re;
	}
	
}
