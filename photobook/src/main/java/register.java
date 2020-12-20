

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.json.Json;
import javax.json.JsonObject;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import gr.csd.uoc.cs359.winter2020.photobook.db.UserDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.User;

/**
 * Servlet implementation class register
 */
@WebServlet("/register")
public class register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public register() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//System.out.println("request: " + request.getQueryString() + ", response: " + response.toString());
		response.getWriter().append("Don't GET me at ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    User user = new User();
	    boolean valid = true, safe = true, validArgs = true, wasUnsafe = false;
	    
	    user.setUserName(request.getParameter("username"));
	    user.setEmail(request.getParameter("email"));
	    user.setPassword(request.getParameter("password"));
	    user.setFirstName(request.getParameter("firstname"));
	    user.setLastName(request.getParameter("lastname"));
	    user.setBirthDate(request.getParameter("birthdate"));
	    user.setCountry(request.getParameter("country"));
	    user.setTown(request.getParameter("town"));
	    user.setAddress(request.getParameter("address"));
	    user.setOccupation(request.getParameter("occupation"));
	    user.setGender(request.getParameter("gender"));
	    user.setInterests(request.getParameter("interests"));
	    user.setInfo(request.getParameter("info"));
	    safe = Boolean.parseBoolean(request.getParameter("safe"));
	    
	    System.out.println(user.getPassword());
	    
	    System.out.println(safe);
	    
	    try {
	    	// Check validity
	    	valid = UserDB.checkValidUserName(user.getUserName()) && 
	    			UserDB.checkValidEmail(user.getEmail()) && 
	    			user.getUserName().length() >= 8 &&
	    			user.getEmail().contains("@") &&
	    			!user.getPassword().equals("") && 
	    			!user.getFirstName().equals("") && 
	    			!user.getLastName().equals("") && 
	    			!user.getBirthDate().equals("") && 
	    			!user.getTown().equals("") && 
	    			!user.getOccupation().equals("") && 
	    			!user.getInterests().equals("");
	    	if (!valid) validArgs = false;
	    	
	    	// Safe mode
	    	if(safe &&
	    			(user.getPassword().contains("<script>") ||
	    			user.getPassword().contains("<script>") ||
	    			user.getFirstName().contains("<script>") ||
	    			user.getLastName().contains("<script>") ||
	    			user.getTown().contains("<script>") ||
	    			user.getAddress().contains("<script>") ||
	    			user.getOccupation().contains("<script>") ||
	    			user.getInterests().contains("<script>") ||
	    			user.getInfo().contains("<script>"))) {
	    		valid = false;
	    		wasUnsafe = true;
	    	}
	    	
			if (valid) {
			    // Add to database
			    System.out.println("==>Adding users");
			    System.out.println(user);
			    UserDB.addUser(user);
			    System.out.println("==>Added user");
			    
			    // Response
			    String res = new Gson().toJson(user);
			    response.setStatus(HttpServletResponse.SC_OK);
			    response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8" );
			    response.getWriter().write(res);
			    response.getWriter().flush();
			    response.getWriter().close();
			} else {
				String res = "{";
				if(!validArgs) res += "\"bad_arguments\": \"";
				if(user.getUserName().equals("") || user.getUserName().length() < 8) res += "username, ";
				if(user.getEmail().equals("") || !user.getEmail().contains("@")) res += "email, ";
				if(user.getPassword().equals("")) res += "password, ";
				if(user.getFirstName().equals("")) res += "firstname, ";
				if(user.getLastName().equals("")) res += "lastname, ";
				if(user.getBirthDate().equals("")) res += "birthdate, ";
				if(user.getTown().equals("")) res += "town, ";
				if(user.getOccupation().equals("")) res += "occupation, ";
				if(user.getInterests().equals("")) res += "interests, ";
				if(!validArgs) res = res.substring(0, res.length() - 2);
				if(!validArgs) res += "\"";
				if(wasUnsafe) {
					if(validArgs) 
						res += "\"unsafe\": true";
					else
						res += ", \"unsafe\": true";
				}else {
					if(validArgs) 
						res += "\"unsafe\": false";
					else
						res += ", \"unsafe\": false";
				}
				res += "}";
				
				System.out.print(res);
				
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // Bad args
				response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8" );
			    response.getWriter().write(res.toString());
			    response.getWriter().flush();
			    response.getWriter().close();
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    
	    
	    
	}
}
