

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;

import gr.csd.uoc.cs359.winter2020.photobook.db.RatingDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.Rating;
import gr.csd.uoc.cs359.winter2020.photobook.model.Session;

/**
 * Servlet implementation class ratePost
 */
@WebServlet("/ratePost")
public class ratePost extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ratePost() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Rating rating = new Rating();
		rating.setUserName(Session.username);
		rating.setPostID(Integer.parseInt(request.getParameter("postID")));
		rating.setRate(Integer.parseInt(request.getParameter("rate")));
		
		try {
			RatingDB.addRating(rating);
			
			response.setStatus(HttpServletResponse.SC_OK);
		    response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8" );
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
