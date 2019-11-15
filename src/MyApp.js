import React, { useEffect, useState } from "react";
import axios from "axios";

const USER_SERVICE_URL = "https://pixabay.com/api/";
const API_KEY = "14279920-85b13bc5686b620b28a5a9eeb";

function MyApp() {
  const [data, setData] = useState({ users: [], isFetching: false });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setData({ users: data.users, isFetching: true });
        const response = await axios.get(USER_SERVICE_URL);
        setData({ users: response.data, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ users: data.users, isFetching: false });
      }
    };
    fetchUsers();
  }, []);
}

export default MyApp;
