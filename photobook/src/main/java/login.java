

import java.io.BufferedReader;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;

import gr.csd.uoc.cs359.winter2020.photobook.db.UserDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.User;
import gr.csd.uoc.cs359.winter2020.photobook.model.Session;

/**
 * Servlet implementation class login
 */
@WebServlet("/login")
public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Don't GET me at ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    String username = "", password = "", res;
	    User user = new User();
	    
	    username = request.getParameter("username");
	    password = request.getParameter("password");
	    
	    
	    try {
			user = UserDB.getUser(username);
			MessageDigest md = MessageDigest.getInstance("MD5");
			
			response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8" );
			response.setStatus(HttpServletResponse.SC_OK);
			res = "{ ";
			if(user != null) {
		    	if(user.getPassword().equals(password)) {
		    		res += "\"success\": 1}";
		    		response.getWriter().write(res.toString());
		    		Session.username = user.getUserName();
		    	}else {
		    		res += "\"bad_arguments\": \"password\", \"success\": 0}";
		    		response.getWriter().write(res.toString());
		    	}
		    }else {
		    	res += "\"bad_arguments\": \"username\", \"success\": 0}";
		    	response.getWriter().write(res.toString());
		    }

			response.getWriter().flush();
		    response.getWriter().close();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	}

}
