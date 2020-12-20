

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gr.csd.uoc.cs359.winter2020.photobook.db.PostDB;
import javax.ws.rs.core.HttpHeaders;

/**
 * Servlet implementation class deletePost
 */
@WebServlet("/deletePost")
public class deletePost extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public deletePost() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            // TODO Auto-generated method stu

            try {

                PostDB.deletePost(Integer.parseInt(request.getParameter("postID")));
                System.out.println("post deleted with id: " + request.getParameter("postID"));
                        // Send 200
                        response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
                response.setStatus(HttpServletResponse.SC_OK);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
