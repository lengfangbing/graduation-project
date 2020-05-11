package serverlets;

import java.io.IOException;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import structure.Post;

/**
 * Servlet implementation class PostingServerlet
 */
@WebServlet("/publish")
public class PostingServerlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    /**
     * Default constructor. 
     */
    public PostingServerlet() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		String userId = request.getParameter("userId");
//		String postId = request.getParameter("postId");
//		String postTitle = request.getParameter("postTitle");
//		String postContent = request.getParameter("postContent");
//		String postHTML = request.getParameter("postHTML");
//		String time = request.getParameter("time");
		Post p = new Post();
//		p.initValue(Integer.valueOf(userId), Integer.valueOf(postId), postTitle, postContent, postHTML, time);
		String[] ps = p.getRequestPara();
		String[] paras = new String[ps.length];
		for(int i=0;i<ps.length;i++) {
			paras[i] = request.getParameter(ps[i]);
		}
		p.initValue(paras);
		p.savePostValue();
		response.getWriter().write(p.getResponsePara());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
