package util;

import java.util.*;

public class FrequencyCountor {
	private static ArrayList<String> wordbook = new ArrayList<>();
	private static ArrayList<String> contentbook = new ArrayList<>();
	private static final String WORDBOOKFILENAME = "topic\\word.book";
	private static final String CONTENTBOOKFILENAME = "topic\\content.book";
	
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
		String[] ss = content.split(",");
		for(int i=0;i<ss.length;i++) {
			wordbook.add(ss[i]);
		}
	}
	private static void initcontentbook() {
		contentbook = new ArrayList<>();
		String content = FileHelper.binaryFileReader(CONTENTBOOKFILENAME);
		contentbook.add(content);
	}
	
	public static ArrayList<String> getWordList(String content){
		ArrayList<String> re = new ArrayList<>();
		ArrayList<String> copybook = new ArrayList<>();
		
		for(int i = 0;i<wordbook.size();i++)
			copybook.add(wordbook.get(i));
		
		for(int i=0;i<content.length();i++) {
			char c = content.charAt(i);
			for(int j = 0;j<copybook.size();j++) {
				String s = copybook.get(j);
				if(c == s.charAt(0)) {
					String sub = content.substring(i,i+s.length());
					if(sub.equals(s)) {
						re.add(s);
						copybook.remove(s);
						i = i+s.length();
					}
				}
			}
		}
		return re;
	}
	
	public static HashMap<String,Integer> countFrequency(String content) {
		if(contentbook.size() == 0) {
			contentbook.add(content);
			return null;
		}
		HashMap<String,Integer> re = new HashMap<>();
		for(String x:wordbook) {
			int n = countor(x,content);
			if(n != 0)
				re.put(x, new Integer(n));
		}
		
		dividework(content);
		contentbook.add(content);
		
		return re;
	}
	private static int countor(String word,String content) {
		int re = 0;
		for(int i=0;i<content.length();i++) {
			if(content.charAt(i) == word.charAt(i)) {
				String s = content.substring(i,i+word.length());
				if(s.equals(word)) {
					re ++;
					i += word.length();
				}
			}
		}
		return re;
	}
	private static void dividework(String content) {
		for(String x:contentbook) {
			divide0(x,content);
		}
	}
	private static void divide0(String s1,String s2) {
		
		for(int i=0,j=0;i<s1.length();i++) {
			String s = "";
			for(;j<s2.length();j++){
				if(s1.charAt(i) != s2.charAt(j))
					break;
				s += s1.charAt(i);
				i++;
			}
			if(s != "")
				if(!wordbook.contains(s))
					wordbook.add(s);
		}
	}
	public static void save() {
		savewordbook();
		savecontentbook();
	}
	private static void savewordbook() {
		int i = 0;
		String content = "";
		for(String x:wordbook) {
			content+=x;
			content += (i<wordbook.size()-1) ? ",":"";
			i++;
		}
		FileHelper.fileCreator(WORDBOOKFILENAME, content);
	}
	private static void savecontentbook() {
		String content = "";
		for(String x:contentbook) {
			content+=x;
		}
		FileHelper.fileCreator(CONTENTBOOKFILENAME, content);
	}
}
