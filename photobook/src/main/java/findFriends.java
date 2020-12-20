/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import gr.csd.uoc.cs359.winter2020.photobook.db.RatingDB;
import gr.csd.uoc.cs359.winter2020.photobook.model.Rating;
import gr.csd.uoc.cs359.winter2020.photobook.model.Session;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
@WebServlet(urlPatterns = {"/findFriends"})
public class findFriends extends HttpServlet {

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
        List<Rating> allratings = RatingDB.getRatings();
        List<Rating> myRatings = new ArrayList();
        List<String> similarUsers = new ArrayList();

        for (Rating rating : allratings) {

            if (rating.getUserName().equals(Session.username)) {
                System.out.println(rating);
                myRatings.add(rating);
            }
        }

        for (Rating rating : myRatings) {
            List<Rating> postRatings = RatingDB.getRatings(rating.getPostID());
            for (Rating userRating : postRatings) {
                if (!userRating.getUserName().equals(Session.username)) {
                    if (userRating.getRate() == rating.getRate()) {
                        similarUsers.add(userRating.getUserName());
                    }
                }
            }
        }

        String res = "{ \"users\":[";
        List<String> users = similarUsers;

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
            Logger.getLogger(findFriends.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(findFriends.class.getName()).log(Level.SEVERE, null, ex);
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
