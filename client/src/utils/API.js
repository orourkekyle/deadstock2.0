import axios from "axios";

export default {

    // local auth routes
    // createLocalUser: function(username, password) {
    //     console.log("before axios.post on FE");
    //     return axios.post("/local/createuser", { username, password });
    // },
    // getCurrentLocalUser: function() {
    //     return axios.get("/local/getuser");
    // },
    getCurrentGoogleUser: function(req, res) {
        return axios.get("/profile");
    },

    // sneaker api get route
    getSneakers: function(shoeName, brand, gender, releaseYear, colorway) {
        return axios.get("/api/sneakers", { params: {shoeName, brand, gender, releaseYear, colorway}});
    },

    // wishlist routes
    getWishlist: function() {
        return axios.get("/api/wishlist");
    },
    saveSneaker: function(sneakerData) {
        return axios.post("/api/wishlist", sneakerData);
    },
    saveToPopular: function(sneakerData) {
        return axios.post("/api/wishlist/popular", sneakerData)
    },
    getPopular: function() {
        return axios.get("/api/wishlist/popular")
    },
    saveUserSave: function(userData) {
        return axios.post("/api/wishlist/updatepopular", userData)
    },
    deleteSneaker: function(id) {
        return axios.delete("/api/wishlist/" + id);
    }

}