import axios from "axios";

export default {
    saveRecipient: function(recipientData) {
      console.log(recipientData);
      return axios.post("/api/recipients", recipientData);
    },
    saveRecipientItems: function(recipientItemsData) {
      console.log(recipientItemsData);
      return axios.post("/api/recipientItems", recipientItemsData);
    },
    // Gets Recipient Reports
  getReports: function() {
    return axios.get("/api/reports");
  }
  };