package topicmodel;

import java.util.*;

import structure.Post;
import util.FileHelper;
import util.FrequencyCountor;

public class Topic {
	
	private static final String TOPICLOGFILENAME = "topic\\topiclog.tl";
	
//	private static ArrayList<TopicUnit> activedtopiclist = new ArrayList<>();//当前激活的主题列表
	private static ArrayList<TopicUnit> topiclist = new ArrayList<>();
	private static HashMap<String,Integer> keywordnumber = new HashMap<>();//主题关键字的出现次数
	
	private static topiccomputer tc = new topiccomputer();
	
	
	
	public static ArrayList<TopicUnit> addContent(String content) {
		topiclist = new ArrayList<>();
		HashMap<String,Integer> m = new HashMap<>();
		m = FrequencyCountor.countFrequency(content);
		return addtopic(m);
		
	}
	
	private static ArrayList<TopicUnit> addtopic(HashMap<String,Integer> m) {
		Set<String> set = m.keySet();
		
		for(String x:set) {
			int n = m.get(x);
			TopicUnit t = TopicDatabase.getTopic(x);
			String name = t.getTopicName();
			if(keywordnumber.containsKey(name)) {
				int n2 = keywordnumber.get(name);
				keywordnumber.put(name, n+n2);
			}else {
				keywordnumber.put(name, n);
			}
			if(!topiclist.contains(t))
				topiclist.add(t);
			
		}
		tc.start();
		return topiclist;
	}
	
	public static String getLog() {
		String re = "";
		re = FileHelper.binaryFileReader(TOPICLOGFILENAME);
		return re;
	}
	public static int autoExamine(Post p) {
		
		String content = p.getPostContent();
		String title = p.getPostTitle();
		addContent(title+content);
		ArrayList<String> word = FrequencyCountor.getWordList(title+content);
//		ArrayList<String> topicList = new ArrayList<>();
		
		return TopicTrainer.examine(topiclist, word,String.valueOf(p.getPostId())) ? 1:2;
	}
		
	private static class topiccomputer extends Thread{
		
		@Override
		public void run() {
			fix();
		}
		private synchronized void fix() {
//					resetnumber();
//					compute();
					addlog();
		}
			
//		private void compute() {//计算并替换当前主题列表
//			int max = getMaxNum();
//			int m = max/2;
//			m = m>10? 10:m;
//			for(int i = 0;i<topiclist.size();i++) {
//				int n = keywordnumber.get(i);
//				TopicUnit t = topiclist.get(i);
//				if(n >= m) {
//					if(!activedtopiclist.contains(t))
//						topiclist.add(t);
//				}else {
//					if(activedtopiclist.contains(t))
//						activedtopiclist.remove(t);
//				}
//			}
//				
//		}
//		private int getMaxNum() {
//			int re = 0;
//			for(Integer x:keywordnumber) {
//				re = x>=re ? x:re;
//			}
//			return re;
//		}
//		private void resetnumber() {//重置长时间未变动的主题词数量
//			Date d = new Date();
//			for(int i = 0;i<topiclist.size();i++) {
//				long t = keywordtimer.get(i);
//				long nt = d.getTime();
//				if(nt - t > interval)
//					keywordtimer.set(i, nt);
//					keywordnumber.set(i, 0);
//			}
//		}
		
		private void addlog() {
			String content = "";
			//减少线程冲突的可能
			//将列表复制
			ArrayList<TopicUnit> l = new ArrayList<>();
			l.addAll(topiclist);
			
			int i = 0;
			for(TopicUnit t:l) {
				content+=t.getTopicName();
				content+= (i<l.size()-1)? ",":"";
				i++;
			}
			content+="\n";
			FileHelper.fileCreator(TOPICLOGFILENAME, content);
		}
	}
}
