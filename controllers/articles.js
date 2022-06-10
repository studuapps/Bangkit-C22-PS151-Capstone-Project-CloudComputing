/*
  IMPORT MODULE ARTICLES MODEL
*/
const Articles = require("../models/articleModels");

// get articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Articles.findAll({
      attributes: ["title", "release_date", "abstract"],
    });
    res.send(articles);
  } catch (error) {
    res.status(500).json({ msg: "Error to get data calculation" });
  }
};

// get article by Id
exports.getArticleById = async (req, res) => {
  try {
    const article = await Articles.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ["title", "release_date", "content", "writer"],
    });
    const data = article[0];
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        msg: "Cannot article!",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving article!" });
  }
};
