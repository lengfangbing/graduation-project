package topicmodel;

import java.util.*;

import structure.Post;
import util.FileHelper;
import util.WordSpliter;

public class Topic {
	
	private static final String TOPICLOGFILENAME = ".\\topic\\topiclog.tl";
	
	@SuppressWarnings("unused")
	private static final String spliter = "#";
	private static final String orgspliter = "#";
	
//	private static ArrayList<TopicUnit> activedtopiclist = new ArrayList<>();//当前激活的主题列表
	private static ArrayList<TopicUnit> topiclist = new ArrayList<>();
//	private static HashMap<String,Integer> keywordnumber = new HashMap<>();//主题关键字的出现次数
	
	private static topiccomputer tc = new topiccomputer();
	
	
	
	public static ArrayList<TopicUnit> addContent(String content) {
		topiclist = new ArrayList<>();
		ArrayList<String> l = new ArrayList<>();
		l = WordSpliter.splitWord(content);
		
		return addtopic(l);
		
	}
	
	private static ArrayList<TopicUnit> addtopic(ArrayList<String> l) {
		if(l == null) return null;//数据过少无法划分主题
		
		for(String x:l) {
//			int n = m.get(x);
			TopicUnit t = TopicDatabase.getTopic(x);
//			String name = t.getTopicName();
//			if(keywordnumber.containsKey(name)) {
//				int n2 = keywordnumber.get(name);
//				keywordnumber.put(name, n+n2);
//			}else {
//				keywordnumber.put(name, n);
//			}
			if(!topiclist.contains(t))
				topiclist.add(t);
			
		}
		if(!tc.isAlive())
			tc.start();
		else 
			synchronized(tc) {
				tc.notify();
			}
		return topiclist;
	}
	
	public static String getLog() {
		String re = "";
		re = FileHelper.binaryFileReader(TOPICLOGFILENAME);
		return re;
	}
	public static void stop() {
		topiccomputer.setStop();
		synchronized(tc) {
			tc.notify();
		}
	}
	
	public static int autoExamine(Post p) {
		
		String content = p.getPostContent();
		String title = p.getPostTitle();
		addContent(title+content);
		ArrayList<String> word = WordSpliter.getWordList(title+content);
//		ArrayList<String> topicList = new ArrayList<>();
		
		return TopicTrainer.examine(topiclist, word,String.valueOf(p.getPostId())) ? 1:2;
	}
		
	private static class topiccomputer extends Thread{
		private static boolean stop = false;
		
		public static void setStop() {
			stop = true;
		}
		@Override
		public void run() {
			while(!stop) {
				fix();
				try {
					synchronized(this) {
						wait();
					}
				} catch (InterruptedException e) {
					
					e.printStackTrace();
				}
			}
			
		}
		private void fix() {
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
				content+= (i<l.size()-1)? orgspliter:"";
				i++;
			}
			if(content == "") return;
			content+="\n";
			FileHelper.fileCreator(TOPICLOGFILENAME, content);
		}
	}
}
