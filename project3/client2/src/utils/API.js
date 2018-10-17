import axios from "axios";

export default {
    saveRecipient: function(bookData) {
      console.log(bookData);
      return axios.post("/api/recipients", bookData);
    },
    // Gets Recipient Reports
  getReports: function() {
    return axios.get("/api/reports");
  }
  };