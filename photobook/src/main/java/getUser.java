
import com.google.gson.Gson;
import gr.csd.uoc.cs359.winter2020.photobook.db.PostDB;
import gr.csd.uoc.cs359.winter2020.photobook.db.UserDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.Post;
import gr.csd.uoc.cs359.winter2020.photobook.model.User;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;

/**
 * Servlet implementation class getUser
 */
@WebServlet("/getUser")
public class getUser extends HttpServlet {

    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public getUser() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     * response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        try {
            User user = new User();
            user = UserDB.getUser(request.getParameter("username"));

            List<Post> posts = PostDB.getTop10RecentPostsOfUser(user.getUserName());

            response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            String res = new Gson().toJson(posts);
            response.getWriter().write(res);
            response.getWriter().flush();
            response.getWriter().close();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     * response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        doGet(request, response);
    }

}
