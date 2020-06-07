package topicmodel;

import java.util.*;

public class TopicUnit{
	private String topicName;
	private ArrayList<String> keyword;
	public TopicUnit(String topicName) {
		this.topicName = topicName;
		keyword = new ArrayList<>();
	}
	
	public String getTopicName() {
		return topicName;
	}
	
	public boolean containKey(String s) {
		return keyword.contains(s);
	}
	
	public void addKeyWord(String s) {//ШЅжи
		ArrayList<String> l = TopicDatabase.getBanList();
		if(!l.contains(s) && !keyword.contains(s))
			keyword.add(s);
	}
	public void addKeyWord(ArrayList<String> l) {
		for(String x:l) {
			addKeyWord(x);
		}
	}
	
	public ArrayList<String> getKeywordList(){
		return this.keyword;
	}
	
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof TopicUnit) {
			TopicUnit t = (TopicUnit)obj;
			if(t.getTopicName().equals(topicName))
				return true;
		}
		
		return false;
	}
	
	
	public String format() {
		String re = "TopicUnit:{\n";
		re+="topicName:"+topicName+"\n";
		re+="keyword:";
		int i = 0;
		for(String x:keyword) {
			re+=x;
			re+= (i<keyword.size()-1)? ",":"";
			i++;
		}
		re+="\n}\n";
		return re;
	}
	

	
	public void inverseFormat(String s) {
		String[] ss = s.split("\n");
		for(int i=0;i<ss.length;i++) {
			String str = ss[i];
			if(str.startsWith("topicName"))
				settopicName(str);
			else if(str.startsWith("keyword"))
				setkeyword(str);
		}
		
	}
	private void settopicName(String s) {
		String[] ss = s.split(":");
		if(ss.length>1)
			topicName = ss[1];
	}
	private void setkeyword(String s) {
		String[] t = s.split(":");
		if(t.length>1) {
			String[] ss = t[1].split(",");
			for(int i=0;i<ss.length;i++)
				keyword.add(ss[i]);
		}
	}

	
	public String getPrimaryKey() {
		
		return topicName;
	}
}