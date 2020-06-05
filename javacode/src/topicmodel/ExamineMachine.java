package topicmodel;

import java.util.*;

import structure.Post;
import util.MysqlHelper;

public class ExamineMachine extends Thread{
	private static int postcount = 0;
	private long updatedTime;
	private boolean stop = false;
	
	@Override
	public void run() {
		while(!stop) {
			long currentTime = new Date().getTime();
			if(postcount >= 50 || (currentTime-updatedTime) >= 3600000)
				examine();
			try {
				sleep(600000);
			} catch (InterruptedException e) {
				
				e.printStackTrace();
			}
		}
	}
	
	public void setStop(boolean stop) {
		this.stop = stop;
	}
	
	public static void addCount() {//不考虑线程冲突，因为实际发帖量一定大于等于计数器
		postcount++;
	}
	
	private void examine() {
		ArrayList<HashMap<String,String>> l = 
				MysqlHelper.getValueFromTable(Post.getPostTableName(), "state", "0");
		ArrayList<Post> postlist = new ArrayList<>();
		
		for(HashMap<String,String> x:l) {
			Post p = new Post();
			String[] label = p.getRequestPara();
			p.setUserId(x.get(label[0]));
			p.setPostId(x.get(label[1]));
			p.setPostTitle(x.get(label[2]));
			p.setPostContent(x.get(label[3]));
			p.setPostHTML(x.get(label[4]));
			p.setTime(x.get(label[5]));
			postlist.add(p);
		}
		for(Post p:postlist) {
			p.setState(Topic.autoExamine(p));
		}
		for(Post p:postlist) {
			MysqlHelper.updateValue(
					Post.getPostTableName(), "topicId", String.valueOf(p.getPostId()), 
					"state", String.valueOf(p.getState()));
		}
		updatedTime = new Date().getTime();
	}
}
