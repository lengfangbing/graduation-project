package topicmodel;

import java.util.*;

import structure.Post;
import util.FileHelper;
import util.FrequencyCountor;

public class TopicTrainer {
//	private static Topic t = new Topic();
	private static ArrayList<learnunit> l = new ArrayList<>();
	private static HashMap<String,ArrayList<String>> examineBook = new HashMap<>();
	private static ArrayList<String> learnedPost = new ArrayList<>();
	
	private static final String LEARNUNITLIST = "topic\\learnunit.unit";
	private static final String EXAMINEBOOKFILENAME = "topic\\examinebook.book";
	private static final String LEARNEDLIST = "topic\\learnedpost.post";
	
	static {
		initexaminebook();
		initlearnedpost();
		initlearnunitlist();
	}
	private static void initexaminebook() {
		String content = FileHelper.binaryFileReader(EXAMINEBOOKFILENAME);
		String[] group = content.split("\\n");
		HashMap<String,ArrayList<String>> map = new HashMap<>();
		for(int i = 0;i<group.length;i++) {
			String[] ss = group[i].split(":");
			ArrayList<String> l = (ArrayList<String>) Arrays.asList(ss[1]);
			map.put(ss[0], l);
		}
		examineBook = map;
	}
	private static void initlearnedpost() {
		String content = FileHelper.binaryFileReader(LEARNEDLIST);
		String[] ss = content.split(",");
		learnedPost = (ArrayList<String>) Arrays.asList(ss);
	}
	private static void initlearnunitlist() {
		String content = FileHelper.binaryFileReader(LEARNUNITLIST);
		l = new ArrayList<>();
		String[] ss = content.split("learnunit:{\\n");
		for(int i=1;i<ss.length;i++) {
			learnunit u = new learnunit();
			u.informat(ss[i]);
			l.add(u);
		}
	}
	
	public static void learn(Post p) {
		if(p.getState() == 0) return;
		if(learnedPost.contains(String.valueOf(p.getPostId()))) return ;
		
		String content = p.getPostTitle()+p.getPostContent();
		content = content.replace("\\n", "");
		ArrayList<TopicUnit> l1 = Topic.addContent(content);
		ArrayList<String> l2 = FrequencyCountor.getWordList(content);
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
			learnedPost.add(String.valueOf(p.getPostId()));
		}
		
	}
	private static void addlearnlist(learnunit u) {
		int i = l.indexOf(u);
		if(i == -1) {
			l.add(u);
			examineBook.put(u.topicname, new ArrayList<>());
		}
		else {
			learnunit t = l.get(i);
			t.failkey.addAll(u.failkey);
			t.passkey.addAll(u.passkey);
			fixexaminebook(t);
		}
	}
	private static void fixexaminebook(learnunit u) {
		ArrayList<String> l = new ArrayList<>();
		for(String x:u.failkey) {
			if(!u.samekey.contains(x))
				l.add(x);
		}
		examineBook.put(u.topicname,l);
	}
	
	private static void updateTopicName() {
		for(learnunit x:l) {
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
		String content = "";
		Set<String> set = examineBook.keySet();
		for(String x:set) {
			content += x+":";
			ArrayList<String> l = examineBook.get(x);
			int i = l.size();
			for(String y:l) {
				content+=y;
				content += (i<l.size()-1)? ",":"";
				i++;
			}
			content+="\n";
		}
		FileHelper.fileCreator(EXAMINEBOOKFILENAME, content);
	}
	private static void savelearnedpost() {
		String content = "";
		int i=0;
		for(String x:learnedPost) {
			content+=x;
			content+= i<learnedPost.size()-1 ? ",":""; 
		}
		FileHelper.fileCreator(LEARNEDLIST, content);
	}
	private static void savelearnunitlist() {
		String content = "";
		for(learnunit x:l) {
			content += x.format();
		}
		FileHelper.fileCreator(LEARNUNITLIST, content);
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
	//±£¥Ê°¢…Û≤È
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
			String[] ss = str.split("\\n");
			
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
			re += "\n";
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
