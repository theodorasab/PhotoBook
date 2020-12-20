

import java.io.BufferedReader;
import java.io.IOException;
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
 * Servlet implementation class edit
 */
@WebServlet("/edit")
public class edit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public edit() {
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
		// TODO Auto-generated method stub
		User user = new User();
		try {
			BufferedReader reader = request.getReader();
		    String line;
		    
		    user = UserDB.getUser(Session.username);
		    System.out.println("Editing user " + user.getUserName());
		    
		    // Serialize input
		    while ((line = reader.readLine()) != null) {
			    if(line.contains("name=")) {
			    	reader.readLine();
			    	
			    	if(line.contains("username")) {
		    			user.setUserName(reader.readLine()); // Username
		    		}else if(line.contains("email")) {
		    			user.setEmail(reader.readLine()); // Email
		    		}else if(line.contains("password")) {
		    			user.setPassword(reader.readLine()); // Password
		    		}else if(line.contains("firstname")) {
		    			user.setFirstName(reader.readLine()); // Firstname
		    		}else if(line.contains("lastname")) {
		    			user.setLastName(reader.readLine()); // Lastname
		    		}else if(line.contains("birthdate")) {
		    			user.setBirthDate(reader.readLine()); // Birthdate
		    		}else if(line.contains("country")) {
		    			user.setCountry(reader.readLine()); // Country
		    		}else if(line.contains("town")) {
		    			user.setTown(reader.readLine()); // Town
		    		}else if(line.contains("address")) {
		    			user.setAddress(reader.readLine()); // Address
		    		}else if(line.contains("occupation")) {
		    			user.setOccupation(reader.readLine()); // Occupation
		    		}else if(line.contains("gender")) {
		    			user.setGender(reader.readLine()); // Gender
		    		}else if(line.contains("interests")) {
		    			user.setInterests(reader.readLine()); // Interests
		    		}else if(line.contains("info")) {
		    			user.setInfo(reader.readLine()); // Info
		    		}
			    }
		    }
		    
		    UserDB.updateUser(user);
		    String res = "{ \"success\": 1 }";
		    response.setStatus(HttpServletResponse.SC_OK);
		    response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8" );
		    response.getWriter().write(res);
		    response.getWriter().flush();
		    response.getWriter().close();
		    
		}catch(ClassNotFoundException e) {
			
		}
	}

}
