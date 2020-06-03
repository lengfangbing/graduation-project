package topicmodel;

import structure.Post;

public class Learner extends Thread{
	private Post p;
	public Learner(Post p) {
		this.p = p;
	}
	
	@Override
	public void run() {
		TopicTrainer.learn(p);
	}
}
