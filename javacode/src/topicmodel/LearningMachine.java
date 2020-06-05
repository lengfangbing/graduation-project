package topicmodel;

import java.util.ArrayList;
import java.util.HashMap;

import structure.Post;
import util.MysqlHelper;

@Deprecated
public class LearningMachine extends Thread{
	@Override
	public void run() {
		learn();
	}
	private void learn() {
		ArrayList<HashMap<String,String>> l = 
				MysqlHelper.getValueFromTable(Post.getPostTableName());
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
		for(Post x:postlist) {
			TopicTrainer.learn(x);
		}
	}
	
}
