

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;

import gr.csd.uoc.cs359.winter2020.photobook.db.PostDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.Post;
import gr.csd.uoc.cs359.winter2020.photobook.model.Session;

/**
 * Servlet implementation class createPost
 */
@WebServlet("/createPost")
public class createPost extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public createPost() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Post post = new Post();
		System.out.println("I was here");
		// Should use cookie
		post.setUserName(Session.username);
		
		post.setDescription(request.getParameter("description"));
		post.setLongitude(request.getParameter("longitude"));
		post.setLatitude(request.getParameter("latitude"));
		
		if(request.getParameter("imageURL") != null) post.setImageURL(request.getParameter("imageURL"));
		if(request.getParameter("imageB64") != null) post.setImageBase64(request.getParameter("imageB64"));
		
		try {
			PostDB.addPost(post);
			
			
			System.out.println(post);
			// Send 200
			response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8" );
			response.setStatus(HttpServletResponse.SC_OK);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

}
