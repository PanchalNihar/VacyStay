import { getAccessToken } from "../lib/actions";

const apiService = {

  get: async function (url: string): Promise<any> {
    console.log("get", url);

    // Get access token for authorization
    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, { 
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      })
        .then((response) => {
          
          if (response.headers.get("Content-Type")?.includes("application/json")) {
            return response.json();
          } else {
            console.log("Response is not JSON"); 
          }
        })
        .then((json) => {
          console.log("Response:", json); 
          resolve(json); 
        })
        .catch((error) => {
          reject(error); 
        });
    });
  },

  // Method to send POST requests with authorization
  post: async function (url: string, data: any): Promise<any> {
    console.log("post", url, data);

    
    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, { 
        method: "POST",
        body: data, 
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
        .then((response) => { return response.json(); }) 
        .then((json) => {
          console.log("Response:", json); 
          resolve(json);
        })
        .catch((error) => {
          reject(error); 
        });
    });
  },

  // Method to send POST requests without authorization token
  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log("Fetching from:", `${process.env.NEXT_PUBLIC_API_HOST}${url}`);
    console.log("Post data:", data);
    console.log("Data type:", typeof data);

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, { 
        method: "POST",
        body: JSON.stringify(data), 
        headers: {
          Accept: "application/json", 
          "Content-Type": "application/json", 
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log("Response", json); 
          return resolve(json); 
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          reject(err); 
        });
    });
  },
};

export default apiService;
