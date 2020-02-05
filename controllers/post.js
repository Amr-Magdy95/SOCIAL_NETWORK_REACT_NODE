
exports.getPosts =  (req, res) => {
  res.json({
    posts: [
      {title: 'number1', body: "hello man I'm suffering"},
      {title: 'number2', body: "I don't think I can hold on any longer"}
    ]
  });
}
