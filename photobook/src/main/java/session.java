

import java.io.IOException;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gr.csd.uoc.cs359.winter2020.photobook.model.Session;

/**
 * Servlet implementation class session
 */
@WebServlet("/session")
public class session extends HttpServlet {
	Random rand = new Random();
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public session() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		Cookie[] cookies = request.getCookies();
		String username;
		
		if(cookies == null) {
			Cookie sessionCookie = new Cookie("logged-sess-cookie", "" + rand.nextInt());
			response.addCookie(sessionCookie);
			Cookie persistentCookie = new Cookie("logged-pers-cookie", "" + rand.nextInt());
			persistentCookie.setMaxAge(1800);
			response.addCookie(persistentCookie);
			System.out.println("Added cookie");
		}else {
			for(Cookie cookie : cookies) {
				if(cookie.getValue().contains("username")) {
					String[] str = cookie.getValue().split("=");
					for(String part : str) {
						if(!part.equals("username")) Session.username = part;
					}
				}
			}
			
			if((username = request.getParameter("username")) != null) {
				System.out.println(request.getParameter("username"));
				for(Cookie cookie : cookies) {
					cookie.setValue("username=" + username);
					response.addCookie(cookie);
				}
			}else if(request.getParameter("invalidate") != null) {
				System.out.println("Invalidating");
				for(Cookie cookie : cookies) {
					cookie.setValue("");
					response.addCookie(cookie);
				}
			}
		}
		System.out.println(Session.username);
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
