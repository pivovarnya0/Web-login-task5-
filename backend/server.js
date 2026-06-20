const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("back rabotaet");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json(result.rows);
  } catch (e) {
    res.json({
      error: e.message
    });
  }
});


app.get("/api/hello",(req,res)=>{

    res.json({
        message:"Hi from back"
    });

});

app.post("/register",async(req,res)=>{


    const {
        name,
        email,
        password
    } = req.body;



    const newUser = {

        id: Date.now(),

        name:name,

        email:email,

        password:password,

        status:"unverified",

        previous_status: null,

        last_login: null,

    };

await db.query(

    `

    INSERT INTO users
    (name,email,password,status)
    VALUES($1,$2,$3,$4)
    `,

    [
        name,
        email,
        password,
        "unverified"
    ]

);


    res.json({

        message:"User registered",

        user:newUser

    });



});



app.get("/users", async (req,res)=>{

    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);

});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.patch("/block", async (req,res)=>{
    const {ids}=req.body;

    await db.query(
        `UPDATE users SET status = 'blocked' WHERE id = ANY($1)`,
        [ids]
    );

    res.json({message: "Users bloked" });

});

app.patch("/unblock", async (req,res)=>{
    const {ids}=req.body;

    await db.query(
        `UPDATE users SET status='active' WHERE id = ANY($1)`,
        [ids]

    );

    res.json({ message: "Users unblocked" });

});

app.delete("/users", async(req,res)=>{
    const {ids}=req.body;
    
    await db.query(
    `DELETE FROM users WHERE id = ANY($1)`,
    [ids]
  );

  res.json({ message: "Users deleted" });

});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await db.query(
    `
    SELECT *
    FROM users
    WHERE email=$1
    AND password=$2
    `,
    [email, password]
  );

  const user = result.rows[0];

  if (!user) {
    return res.json({ message: "Wrong login" });
  }

  await db.query(
    `
    UPDATE users
    SET last_login=NOW()
    WHERE id=$1
    `,
    [user.id]
  );

  user.last_login = new Date();

  res.json({
    message: "Login success",
    user
  });
});



const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

console.log(
`Server started http://localhost:${PORT}`
);

});