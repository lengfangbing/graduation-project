package topicmodel;

import java.util.*;

import util.FileHelper;

public class TopicDatabase {
	private static ArrayList<TopicUnit> topiclist = new ArrayList<>();
	private static ArrayList<keyword> keywordlist = new ArrayList<>();
	private static ArrayList<String> bankeylist = new ArrayList<>();
	public static ArrayList<String> getBanList(){
		return bankeylist;
	}
	
	private static final double BANSIZERATIO = 0.9; 
	
	private static final String TOPICFILENAME = "topic/topic.tu";//.topicunit;
	private static final String BANTOPICFILENAME = "topic/bankeylist.tu";
	private static final String spliter = "#";
	private static final String orgspliter = "#";
	
	private static fixer f = new fixer();
	public static void save() {
		f.start();
	}
	
	static {
		init();
	}
	private static void init() {
		inittopiclist();
		initbankeylist();
	}
	private static void inittopiclist() {
		String content = FileHelper.binaryFileReader(TOPICFILENAME);
		String[] ss = content.split("}\n");
		for(int i=0;i<ss.length;i++) {
			TopicUnit t = new TopicUnit("");
			t.inverseFormat(ss[i]);
			addTopic(t);
		}
	}
	private static void initbankeylist() {
		String content = FileHelper.binaryFileReader(BANTOPICFILENAME);
		String[] ss = content.split(spliter);
		for(int i=0;i<ss.length;i++) {
			bankeylist.add(ss[i]);
		}
	}
	public static TopicUnit getTopic(String str) {
		TopicUnit re = new TopicUnit(str);
		for(keyword x:keywordlist) {
			if(x.keyword == str) {
				re = x.t;
				break;
			}
		}
		addTopic(re);
		
		return re;
	}
	
	public static void addTopic(TopicUnit t) {
		if(t.getTopicName() == "") return;
		if(bankeylist.contains(t.getTopicName())) return;
		
		if(topiclist.contains(t)) {
			TopicUnit t2 = topiclist.get(topiclist.indexOf(t));
			t = mergetopic(t,t2);
		}
		if(!topiclist.contains(t))
			topiclist.add(t);
		addkeyword(t);
	}
	private static TopicUnit mergetopic(TopicUnit t1,TopicUnit t2) {
		t1.addKeyWord(t2.getKeywordList());
		return t1;
	}
	private static void addkeyword(TopicUnit t) {
		ArrayList<String> l = t.getKeywordList();
		for(String x:l) {
			keyword k = new keyword(x);
			k.t = t;
			if(!bankeylist.contains(x) && k.keyword != "" && !keywordlist.contains(k))
				keywordlist.add(k);
		}
		keyword k = new keyword(t.getTopicName());
		k.t = t;
		if(!keywordlist.contains(k))//已检查
			keywordlist.add(k);
	}
	private static void updatekeywordlist() {
		ArrayList<keyword> l = new ArrayList<>();
		for(TopicUnit x:topiclist) {
			ArrayList<String> l2 = x.getKeywordList();
			ArrayList<keyword> sub = new ArrayList<>();
			for(String s:l2) {
				if(!bankeylist.contains(s)) {
					keyword k = new keyword(s);
					k.t = x;
					sub.add(k);
				}
				
			}
			l.addAll(sub);
		}
		keywordlist = l;
	}
	
	private static void ban() {
		int n = topiclist.size();
		if(n <= 10) return;
		n = (int)(n*BANSIZERATIO);
		HashMap<String,Integer> map = new HashMap<>();
		for(keyword x:keywordlist) {
			String s = x.keyword;
			if(!map.containsKey(s))
				map.put(s, 1);
			else {
				int i = map.get(s);
				map.put(s, i+1);
			}
		}
		Set<String> set = map.keySet();
		for(String x:set) {
			int i = map.get(x);
			if(x != "" && i > n) {
				bankeylist.add(x);
				clean(x);
			}
				
		}
	}
	private static void clean(String s) {//清理遗留的禁用词
		keyword k = new keyword(s);
		while(keywordlist.remove(k));
		TopicUnit u = new TopicUnit(s);
		int j = topiclist.indexOf(u);
		if(j != -1) {
			u = topiclist.get(j);
			ArrayList<String> kl = u.getKeywordList();
			for(String y:kl) {
				TopicUnit o = new TopicUnit(y);
				addTopic(o);
			}
			topiclist.remove(j);
		}
	}
	
	private static class keyword{
		TopicUnit t;
		String keyword;
		
		keyword(String s){
			keyword = s;
		}
		
		@Override
		public boolean equals(Object obj) {
			if(obj instanceof keyword) {
				keyword k = (keyword)obj;
				if(t.equals(k.t) && keyword.equals(k.keyword))
					return true;
			}
			return false;
		}
	}
	
	private static class fixer extends Thread{
		
		@Override
		public void run() {//先整理再保存
			fixup();
			save();
			savebanlist();
		}
		
		void fixup() {
			String log = Topic.getLog();
			String[] row = log.split("\n");
			int r = row.length;
			ArrayList<fixunit> l = new ArrayList<>();
			for(int i=0;i<r;i++) {
				String[] words = row[i].split(",");
				for(int j=0;j<words.length;j++) {
					String s = words[j];
					fixunit f = new fixunit(s);
					if(!l.contains(f)) {
						l.add(f);
					}else {
						f = l.get(l.indexOf(f));
					}
					for(int k = j+1;k<words.length;k++) {
						String s2 = words[k];
						if(f.map.containsKey(s2)) {
							int n = f.map.get(s2);
							f.map.put(s2, n+1);
						}else {
							f.map.put(s2, 1);
						}
					}
				}
			}
			
			int min = r/2;
			for(fixunit x:l) {
				Set<String> keyset = x.map.keySet();
				for(String z:keyset) {
					int num = x.map.get(z);
					if(num >= min) {
						TopicUnit t1 = getTopic(x.s);
						TopicUnit t2 = getTopic(z);
						addTopic(mergetopic(t1,t2));
						updatekeywordlist();
					}
				}
			}
		}
		
		private class fixunit{
			String s;
			HashMap<String,Integer> map = new HashMap<>();
			
			fixunit(String s){
				this.s = s;
			}
			
			@Override
			public boolean equals(Object obj) {
				if(obj instanceof fixunit) {
					fixunit f = (fixunit)obj;
					if(s.equals(f.s))
						return true;
				}
				return false;
			}
		}
		
		void save() {
			String content = "";
			for(TopicUnit x:topiclist) {
				content += x.format();
			}
			FileHelper.fileCreator(TOPICFILENAME, content, false);
		}
		void savebanlist() {
			ban();
			String content = "";
			int i = 0;
			for(String x:bankeylist) {
				content += x;
				content += i<bankeylist.size()-1 ? orgspliter:"";
				i++;
			}
			FileHelper.fileCreator(BANTOPICFILENAME, content,false);
		}
	}
}
