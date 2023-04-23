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
  
    post(url, obj, token) {
      try {
        let result = fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(obj),
        });
        return result;
      } catch (e) {
        console.log(e.message);
      }
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
    
  
    put(token, url, cardId, obj) {
      try {
        let result = fetch(`${url}/${cardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(obj),
        });
        return result;
      } catch (e) {
        console.log(e.message);
      }
    }
  }
  