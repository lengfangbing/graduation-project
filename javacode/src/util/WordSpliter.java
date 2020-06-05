package util;

import java.util.*;

public class WordSpliter {
	private static ArrayList<String> wordbook = new ArrayList<>();
	private static ArrayList<String> contentbook = new ArrayList<>();
	private static final String WORDBOOKFILENAME = "topic/word.book";
	private static final String CONTENTBOOKFILENAME = "topic/content.book";
	private static final String spliter = "#";
	private static final String orgspliter = "#";
	
	static {
		init();
	}
	private static void init(){
		 initwordbook();
		 initcontentbook();
	}
	private static void initwordbook() {
		wordbook = new ArrayList<>();
		String content = FileHelper.binaryFileReader(WORDBOOKFILENAME);
		if(content == "") return;
		String[] ss = content.split(spliter);
		for(int i=0;i<ss.length;i++) {
			wordbook.add(ss[i]);
		}
	}
	private static void initcontentbook() {
		contentbook = new ArrayList<>();
		String content = FileHelper.binaryFileReader(CONTENTBOOKFILENAME);
		if(content == "") return;
		contentbook.add(content);
	}
	
	public static ArrayList<String> getWordList(String content){
		ArrayList<String> re = new ArrayList<>();
		ArrayList<String> copybook = new ArrayList<>();
		
		for(int i = 0;i<wordbook.size();i++)
			copybook.add(wordbook.get(i));
		
		for(String x:copybook) {
			if(content.contains(x))
				re.add(x);
		}
		return re;
	}
	
	public static ArrayList<String> splitWord(String content) {
		if(contentbook.size() == 0) {
			contentbook.add(content);
			return null;
		}
		ArrayList<String> re = new ArrayList<>();
		for(String x:wordbook) {
			if(content.contains(x))
				re.add(x);
		}
		
		divideword(content);
		contentbook.add(content);
		
		return re;
	}
	private static void divideword(String content) {
		for(String x:contentbook) {
			divide0(x,content);
		}
	}
	private static void divide0(String s1,String s2) {
		
		for(int i=0;i<s1.length();) {
			String s = "";
			for(int j = 0;j<s2.length();j++){
				if(s1.charAt(i) != s2.charAt(j)) {
					if(s == "")
						continue;
					else
						break;
				}
				s += s1.charAt(i);
				i++;
			}
			if(s != "") {
				if(!wordbook.contains(s))
					wordbook.add(s);
				
			}else
				i++;
				
		}
	}
	
//	private static class divider extends Thread{
//		String content;
//		divider(String content){
//			this.content = content;
//		}
//		@Override
//		public void run() {
//			divideword(content);
//			
//		}
//	}
	
	public static void save() {
		savewordbook();
		savecontentbook();
	}
	private static void savewordbook() {
		int i = 0;
		String content = "";
		for(String x:wordbook) {
			content+=x;
			content += (i<wordbook.size()-1) ? orgspliter:"";
			i++;
		}
		FileHelper.fileCreator(WORDBOOKFILENAME, content,false);
	}
	private static void savecontentbook() {
		String content = "";
		for(String x:contentbook) {
			content+=x;
		}
		FileHelper.fileCreator(CONTENTBOOKFILENAME, content,false);
	}
}
