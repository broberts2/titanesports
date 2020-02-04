// const { bake_cookie, read_cookie, delete_cookie } = require("sfcookies");
// const config = require("../../../../config");
// const serverPath = config.production
//   ? "https://titan-esports.org:8000"
//   : "http://localhost:8000";

const Api = {
  loginUser: async credentials => {
    const user = await fetch(`${serverPath}/loginUser`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        authorization:
          "Basic " + btoa(credentials.username + ":" + credentials.password)
      }
    }).then(res => res.json());

    if (user.token) {
      bake_cookie("titan_key", user.token);
    }

    return user;
  },

  getUser: async user_id => {
    const user = await fetch(`${serverPath}/getUser?u=${user_id}`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    return user;
  },

  createTitanDraft: async data => {
    console.log("ran with: ", data);

    return await fetch(`${config.tPath}/api/createDraft`, {
      method: "post",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  getAllUsers: async () => {
    const users = await fetch(`${serverPath}/getAllUsers`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    return users;
  },

  getAllTeams: async () => {
    const teams = await fetch(`${serverPath}/getAllTeams`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    return teams;
  },

  getProfileVideos: async user_id => {
    const videos = await fetch(`${serverPath}/getProfileVideos`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    return videos;
  },

  getSlayersGuild: async () => {
    const videos = await fetch(`${serverPath}/getSlayersGuild`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    return videos;
  },

  updateSlayersGuild: async () => {
    const titan_key = read_cookie("titan_key");

    const response = await fetch(`${serverPath}/s/updateSlayersGuild`, {
      method: "put",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      }
    }).then(res => res.json());

    return response;
  },

  requestProfileIconList: async obj => {
    const iconList = await fetch(
      `${serverPath}/getIconsList?index=${obj.index}&size=${obj.size}`,

      {
        method: "get",

        headers: {
          Accept: "application/json",

          "Content-Type": "application/json"
        }
      }
    ).then(res => res.json());

    return iconList;
  },

  validateToken: async () => {
    const titan_key = read_cookie("titan_key");

    const user = await fetch(`${serverPath}/s/validateToken`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      }
    }).then(res => res.json());

    return user;
  },

  logoutUser: () => {
    delete_cookie("titan_key");

    window.location.reload();
  },

  createUser: async userData => {
    return await fetch(`${serverPath}/createUser`, {
      method: "post",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      },

      body: JSON.stringify(userData)
    }).then(res => res.json());
  },

  updateSelf: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/updateSelf`, {
      method: "put",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  compareResetKey: async data => {
    return await fetch(`${serverPath}/compareResetKey?key=${data.key}`, {
      method: "post",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  emailResetKey: async data => {
    return await fetch(
      `${serverPath}/emailResetKey?email=${data.email}`,

      {
        method: "get",

        headers: {
          Accept: "application/json",

          "Content-Type": "application/json"
        }
      }
    ).then(res => res.json());
  },

  updateSelfPassword: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/updateSelfPassword`, {
      method: "put",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  updateUser: async (userId, data) => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/updateUser?id=${userId}`, {
      method: "put",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  movePlayerToTeam: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/movePlayerToTeam`, {
      method: "put",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  updateTeam: async (teamId, data) => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/updateTeam?id=${teamId}`, {
      method: "put",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  removePlayerFromTeam: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/removePlayerFromTeam`, {
      method: "delete",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  getEvents: async userData => {
    return await fetch(`${serverPath}/getEvents`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  },

  createEvent: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/createEvent`, {
      method: "post",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  updateEvent: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/updateEvent`, {
      method: "put",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  removeEvent: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/removeEvent`, {
      method: "delete",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  getArticles: async () => {
    return await fetch(`${serverPath}/getArticles`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      }
    }).then(res => teres.json());
  },

  getArticle: async id => {
    return await fetch(`${serverPath}/getArticle?id=${id}`, {
      method: "get",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  },

  createArticle: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/createArticle`, {
      method: "post",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  updateArticle: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/updateArticle`, {
      method: "put",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  },

  removeArticle: async data => {
    const titan_key = read_cookie("titan_key");

    return await fetch(`${serverPath}/s/removeArticle`, {
      method: "delete",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",

        titan_key
      },

      body: JSON.stringify(data)
    }).then(res => res.json());
  }
};
