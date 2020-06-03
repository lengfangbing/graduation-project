package serverlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import structure.Examine;
import topicmodel.LearningMachine;
import topicmodel.TopicDatabase;
import topicmodel.TopicTrainer;

/**
 * Servlet implementation class ExamineServerlet
 */
@Deprecated
@WebServlet("/check")
public class ExamineServerlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private LearningMachine lm= new LearningMachine();
//	private TopicDatabase td = new TopicDatabase();
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExamineServerlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    public void init() throws ServletException{
    	try {
			Class.forName("topicmodel.TopicDatabase");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
    }
    public void destroy() {
    	lm.start();
    	TopicDatabase.save();
    	TopicTrainer.save();
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Examine e =new Examine();
		String[] ps = e.getRequestPara();
		String[] paras = new String[ps.length];
		for(int i=0;i<ps.length;i++) {
			paras[i] = request.getParameter(ps[i]);
		}
		e.initValue(paras);
		e.saveValue();
		response.getWriter().write(e.getResponsePara());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
