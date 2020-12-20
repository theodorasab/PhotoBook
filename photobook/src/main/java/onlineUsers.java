/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import gr.csd.uoc.cs359.winter2020.photobook.db.CommentDB;
import gr.csd.uoc.cs359.winter2020.photobook.db.PostDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.Comment;
import gr.csd.uoc.cs359.winter2020.photobook.model.Post;
import gr.csd.uoc.cs359.winter2020.photobook.model.Session;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.HttpHeaders;

/**
 *
 * @author theodora
 */
@WebServlet(urlPatterns = {"/onlineUsers"})
public class onlineUsers extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException {
//      User user=UserDB.getUser(userName);
        Set<String> onlineusers = new HashSet();
        List<Post> posts = PostDB.getPosts();
        List<Comment> comments = CommentDB.getComments();
        for (Post post : posts) {
            if (getTime(post.getCreatedAt()) == true) {
                if (post.getUserName() == null || post.getUserName().equals(Session.username)) {
                    continue;
                } else {
                    onlineusers.add(post.getUserName());
                }
            }
        }
        for (Comment comment : comments) {
            if (getTime(comment.getCreatedAt()) == true) {
                if (comment.getUserName() == null || comment.getUserName().equals(Session.username)) {
                    continue;
                } else {
                    onlineusers.add(comment.getUserName());
                }
            }
        }

        String res = "{ \"users\":[";
        Set<String> users = onlineusers;
        for (String user : users) {
            res += "\"" + user + "\", ";
        }
        res = res.substring(0, res.length() - 2);

        res += "], \"length\": " + users.size() + " }";
        response.setStatus(HttpServletResponse.SC_OK);
        response.addHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
        response.getWriter().write(res);
        response.getWriter().flush();
        response.getWriter().close();
    }

    protected Boolean getTime(String createdAt) {
        Calendar calendar = Calendar.getInstance();
        int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
        int hour = calendar.get(Calendar.HOUR);
        int minutes = calendar.get(Calendar.MINUTE);
        int sec = calendar.get(Calendar.SECOND);
        String[] datetime = createdAt.split((Character.toString(' ')), 0);
        String[] time = datetime[1].split(Character.toString(':'), 0);
        if ((hour * 60 + minutes - Integer.parseInt(time[0]) * 60 - Integer.parseInt(time[1])) < 60) {
            return true;
        }

        return false;
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(onlineUsers.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(onlineUsers.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
