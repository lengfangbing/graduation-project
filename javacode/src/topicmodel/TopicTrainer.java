package topicmodel;

import java.util.*;

import structure.Post;
import util.FileHelper;
import util.WordSpliter;

public class TopicTrainer {
//	private static Topic t = new Topic();
	private static ArrayList<learnunit> learnunitlist = new ArrayList<>();
	private static HashMap<String,ArrayList<String>> examineBook = new HashMap<>();
	private static ArrayList<String> learnedPost = new ArrayList<>();
	
	private static final String LEARNUNITLIST = "topic/learnunit.unit";
	private static final String EXAMINEBOOKFILENAME = "topic/examinebook.book";
	private static final String LEARNEDLIST = "topic/learnedpost.post";
	private static final String spliter = "#";
	private static final String orgspliter = "#";
	
	static {
		initexaminebook();
		initlearnedpost();
		initlearnunitlist();
	}
	private static void initexaminebook() {
		String content = FileHelper.binaryFileReader(EXAMINEBOOKFILENAME);
		if(content == "") {
			examineBook = new HashMap<>();
			return;
		}
		String[] group = content.split("\n");
		HashMap<String,ArrayList<String>> map = new HashMap<>();
		for(int i = 0;i<group.length;i++) {
			String[] ss = group[i].split(":");
			if(ss.length<=1) continue;
			String[] ss1 = ss[1].split(spliter);
			ArrayList<String> l= new ArrayList<>();
			for(int j = 0;j<ss1.length;j++)	
				l.add(ss1[j]);
			map.put(ss[0], l);
		}
		examineBook = map;
	}
	private static void initlearnedpost() {
		String content = FileHelper.binaryFileReader(LEARNEDLIST);
		learnedPost = new ArrayList<>();
		if(content == "") return;
		String[] ss = content.split(spliter);
		for(int i=0;i<ss.length;i++) {
			learnedPost.add(ss[i]);
		}
	}
	private static void initlearnunitlist() {
		String content = FileHelper.binaryFileReader(LEARNUNITLIST);
		learnunitlist = new ArrayList<>();
//		System.out.println(content.length());
		if(content == "") return;
		
		String[] ss = content.split("learnunit:\\{\n");
		for(int i=1;i<ss.length;i++) {
			learnunit u = new learnunit();
			u.informat(ss[i]);
			learnunitlist.add(u);
		}
	}
	
	public static void learn(Post p) {
		if(p.getState() == 0) return;
		if(learnedPost.contains(p.getPostId())) return ;
		
		String content = p.getPostTitle()+p.getPostContent();
		content = content.replace("\n", "");
		ArrayList<TopicUnit> l1 = Topic.addContent(content);
		learnedPost.add(p.getPostId());
		if(l1 == null) return ;//前几个数据可能无法划分出主题
		
		ArrayList<String> l2 = WordSpliter.getWordList(content);
		int state = p.getState();
		boolean ps = (state==1) ? true:false;
		for(TopicUnit x:l1) {
			String s = x.getTopicName();
			ArrayList<String> key = new ArrayList<>();
			ArrayList<String> k2 = x.getKeywordList();
			for(String z:l2) {
				if(k2.contains(z))
					key.add(z);
			}
			learnunit lu = new learnunit(s);
			if(ps) {
				for(String y:key)
					lu.addpasskey(y);
			}
				
			else {
				for(String y:key)
					lu.addfailkey(y);
			}

			addlearnlist(lu);
		}
		
	}
	private static void addlearnlist(learnunit u) {
		if(u.topicname == "") return;
		
		int i = learnunitlist.indexOf(u);
		if(i == -1) {
			learnunitlist.add(u);
			examineBook.put(u.topicname, new ArrayList<>());
		}
		else {
			learnunit t = learnunitlist.get(i);
			t.failkey.addAll(u.failkey);
			t.passkey.addAll(u.passkey);
			fixexaminebook(t);
		}
	}
	private static void fixexaminebook(learnunit u) {
		ArrayList<String> l = new ArrayList<>();
		for(String x:u.failkey) {
			if(x != "" && !u.samekey.contains(x))
				l.add(x);
		}
		if(l.size() !=0)
			examineBook.put(u.topicname,l);
	}
	
	private static void updateTopicName() {
		for(learnunit x:learnunitlist) {
			updatetopicname(x);
		}
	}
	private static void updatetopicname(learnunit u) {
		String newtopic = TopicDatabase.getTopic(u.topicname).getTopicName();
		if(u.topicname != newtopic) {
			String old = u.topicname;
			examineBook.remove(old);
			u.topicname = newtopic;
			fixexaminebook(u);
		}
	}
	
	public static void save() {
		updateTopicName();
		savelearnunitlist();
		saveexaminebook();
		savelearnedpost();
	}
	private static void saveexaminebook() {
		if(examineBook.size() == 0) return;
		
		String content = "";
		Set<String> set = examineBook.keySet();
		for(String x:set) {
			
			ArrayList<String> l = examineBook.get(x);
			if(l.size() == 0) continue;
			content += (x+":");
			int i = l.size();
			for(String y:l) {
				if(y == "") continue;
				content+=y;
				content += (i<l.size()-1)? orgspliter:"";
				i++;
			}	
			content+="\n";
		}
		FileHelper.fileCreator(EXAMINEBOOKFILENAME, content,false);
	}
	private static void savelearnedpost() {
		String content = "";
		int i=0;
		for(String x:learnedPost) {
			content+=x;
			content+= i<learnedPost.size()-1 ? spliter:""; 
			i++;
		}
		FileHelper.fileCreator(LEARNEDLIST, content,false);
	}
	private static void savelearnunitlist() {
		String content = "";
		for(learnunit x:learnunitlist) {
			if(x.topicname != "")
				content += x.format();
		}
		
		FileHelper.fileCreator(LEARNUNITLIST, content,false);
	}
	
	public static boolean examine(ArrayList<TopicUnit> topicList,ArrayList<String> wordList,
			String postId) {
		if(!learnedPost.contains(postId))
			learnedPost.add(postId);
		for(TopicUnit x:topicList) {
			if(examineBook.containsKey(x.getTopicName())) {
				ArrayList<String> l = examineBook.get(x.getTopicName());
				for(String y:l) {
					if(wordList.contains(y))
						return false;
				}
			}
			
		}
		return true;
	}
	//保存、审查
	private static class learnunit{
		String topicname;
		HashSet<String> failkey = new HashSet<>();
		HashSet<String> passkey = new HashSet<>();
		HashSet<String> samekey = new HashSet<>();
		learnunit(){}
		learnunit(String topicName){
			topicname = topicName;
		}
		
		void addfailkey(String s){
			failkey.add(s);
			if(passkey.contains(s))
				samekey.add(s);
		}
		void addpasskey(String s) {
			passkey.add(s);
			if(failkey.contains(s))
				samekey.add(s);
		}
		@Override
		public boolean equals(Object obj) {
			if(obj instanceof learnunit) {
				learnunit u = (learnunit)obj;
				if(this.topicname.equals(u.topicname))
					return true;
			}
			return false;
		}
		void informat(String str) {
			String[] ss = str.split("\n");
			
			for(int i=0;i<ss.length;i++) {
				String s = ss[i];
				if(s.startsWith("topicname")) {
					s = s.replace("topicname:", "");
					topicname = s;
				}else if(s.startsWith("failkey")) {
					s = s.replace("failkey:", "");
					failkey = setpicker(s);
					
				}else if(s.startsWith("passkey")) {
					s = s.replace("passkey:", "");
					passkey = setpicker(s);
					
				}else if(s.startsWith("samekey")) {
					s = s.replace("samekey:", "");
					samekey = setpicker(s);
					
				}
			}
		}
		HashSet<String> setpicker(String s){
			String[] ss = s.split(",");
			HashSet<String> set= new HashSet<>();
			for(int i=0;i<ss.length;i++) {
				set.add(ss[i]);
			}
			return set;
		}
		
		String format() {
			String re = "learnunit:{\n";
			re += "topicname:"+topicname+"\n";
			re += "failkey:";
			re += formatSet(failkey);
			re += "\n";
			re += "passkey:";
			re += formatSet(passkey);
			re += "\n";
			re += "samekey:";
			re += formatSet(samekey);
			re += "\n}\n";
			return re;
		}
		String formatSet(Set<String> set) {
			String re = "";
			int i = 0;
			for(String x:set) {
				re += x;
				re += (i<set.size()-1) ? ",":"";
				i++;
			}
			return re;
		}
	}
	
}
