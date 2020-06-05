package topicmodel;

import structure.Post;

public class Learner extends Thread{
	private Post p;
	private static int count = 0;
	private static final int counter = 20;
	public static void addCount() {
		count++;
	}
	public Learner(Post p) {
		this.p = p;
	}
	
	@Override
	public void run() {
		TopicTrainer.learn(p);
		if(count>=counter)
			TopicDatabase.save();
	}
}
