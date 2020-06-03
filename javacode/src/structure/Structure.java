package structure;

public interface Structure {
	public String[] getRequestPara();//request
	
	public String getResponsePara();//response
	
	public void initValue(String[] paras);
	
	public void saveValue();
}
