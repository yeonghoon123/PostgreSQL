const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

// database read file
const { dbConnection } = require("./database/pgdb");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** post에 전체 데이터 라우터 */
app.get("/", async (req, res) => {
    const sqlSyntax = "SELECT * FROM board_post";
    const resultData = await dbConnection(sqlSyntax);

    console.log(resultData);
    res.status(200).send(resultData);
});

/** 수정할 데이터 수집 라우터 */
app.get("/post-editor/:postId", async (req, res) => {
    const sqlSyntax = "SELECT * FROM board_post WHERE post_id = $1";
    const param = [req.params.postId];

    const resultData = await dbConnection(sqlSyntax, param);

    res.status(200).send(resultData);
})

/** 게시물 업로드 라워터 */
app.post("/post-editor", async (req, res) => {
    const bodyData = req.body;
    const sqlSyntax =
        "INSERT INTO board_post(post_content, create_date) VALUES($1, NOW())";
    const param = [bodyData.postContent];
    await dbConnection(sqlSyntax, param);
    res.status(200).send("complete");
});

/** 수정 라우터 */
app.post("/post-editor/:postId", async (req, res) => {
    const bodyData = req.body;
    const sqlSyntax =
        "UPDATE board_post SET post_content = $1 WHERE post_id = $2";
    const param = [bodyData.postContent, req.params.postId];
    await dbConnection(sqlSyntax, param);
    res.status(200).send("complete");
});

/** 삭제 라우터 */
app.delete("/delete-post/:postId", async (req,res) => {
    const paramData = req.params.postId;
    const sqlSyntax = "DELETE FROM board_post WHERE post_id = $1"
    const param = [paramData];
    await dbConnection(sqlSyntax, param);
    res.status(200).send("complete");
})


app.listen(port, () => console.log(`${port} connect Complete`));
