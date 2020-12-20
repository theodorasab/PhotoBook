

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;

import gr.csd.uoc.cs359.winter2020.photobook.db.UserDB;

/**
 * Servlet implementation class allusers
 */
@WebServlet("/allusers")
public class allusers extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public allusers() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			String res = "{ \"users\":[";
			List<String> users = UserDB.getAllUsersNames();
			
			for(String user : users) {
				res += "\"" + user + "\", ";
			}
			res = res.substring(0, res.length() - 2);
			
			res += "], \"length\": " + users.size() + " }";
			
			response.setStatus(HttpServletResponse.SC_OK);
		    response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8" );
		    response.getWriter().write(res);
		    response.getWriter().flush();
		    response.getWriter().close();
			
			
		}catch(Exception e) {
			
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
