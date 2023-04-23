export default class Request {
    async getAll(url, token) {
      let request = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let response = await request.json();
      return response;
    }
  
    async post(url, obj, token) {
      let result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      });
      return result;
    }
  
    async delete(token, url, cardId) {
        let result = await fetch(`${url}/${cardId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return result;
    }
    
  
    async put(token, url, cardId, obj) {
      let result = await fetch(`${url}/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      });
      return result;
    }
  }
  