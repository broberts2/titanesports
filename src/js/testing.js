const __runtests__ = async () => {
  await new Promise((r, j) => setTimeout(() => r(), 2000));
  console.clear();

  const __createUser__ = await globals.api.createUser({
    username: "test",
    password: "test",
    email: "test@test.com"
  });
  console.log(__createUser__);

  const __loginUser__ = await globals.api.loginUser({
    credentials: {
      username: "test",
      password: "test"
    }
  });
  if (__loginUser__.code < 300) globals.fns.saveTitanKey(__loginUser__.token);
  console.log(__loginUser__);

  const __getArticle__ = await globals.api.getArticle({
    id: "5df3da76f5a6c090221de12d"
  });
  console.log(__getArticle__);

  const __getArticles__ = await globals.api.getArticles();
  console.log(__getArticles__);

  const __getDraftLogos__ = await globals.api.getDraftLogos();
  console.log(__getDraftLogos__);

  const __getSlayersGuild__ = await globals.api.getSlayersGuild();
  console.log(__getSlayersGuild__);

  const __getEvents__ = await globals.api.getEvents();
  console.log(__getEvents__);

  const __getAllUsers__ = await globals.api.getAllUsers();
  console.log(__getAllUsers__);

  const __getUser__ = await globals.api.getUser({
    id: "5daf6cfc17a51fcb7f2fbff8"
  });
  console.log(__getUser__);

  const __getAllTeams__ = await globals.api.getAllTeams();
  console.log(__getAllTeams__);

  const __removeUser__ = await globals.api.removeUser({
    id: __createUser__._id
  });
  console.log(__removeUser__);
  if (__removeUser__.code < 300) globals.fns.deleteTitanKey();
};

// __runtests__();
