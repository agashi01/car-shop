const bcrypt = require("bcrypt");

const spread = (list) => {
  console.log(list);
  const object = {};
  for (let i = 0; i < list.length; i++) {
    object[i + 1] = list[i];
  }
  return object;
};

const objToList = (list) => {
  const answer = [];
  for (let i = 0; i < list.length; i++) {
    answer.push(Object.values(list[i]));
  }

  return answer.flat();
};
// const spread=(...list)=>{
//     console.log(list[0])
//     const object={}
//     for(let i=0;i<list.length;i++){
//        for(let x=0;x<list[i].length;x++){
//         object[x+1]=list[i][x]
//        }
//     }
//     return object
// }

const signUp = (db) => async (req, res) => {
  const { name, surname, email, password, username, type } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.transaction((trx) => {
    trx("users")
      .insert({
        type,
        name,
        surname,
        email,
      })
      .returning("*")
      .then((user) => {
        if (user.length > 0) {
          trx("users_info")
            .insert({
              id: user[0].id,
              username,
              email: user[0].email,
              hash,
            })
            .returning("*")
            .then(([user2]) => {
              trx.commit()
              return res.json({ ...user[0], username: user2.username, id: user2.id });
            })
            .catch((err) => {
              trx.rollback()
              res.status(500).json("username is already in use");
            });
        } else {
          res.status(400).json("problems in the server!");
        }
      })
      .catch((err) => {
        trx.rollback()
        console.log(err)
        res.status(500).json("email is already in use");
      })

  });
};

const logIn = (db, jwt) => async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("missing credentials");
  }

  db("users")
    .where({
      email,
    })
    .select("*")
    .first()
    .then((logInEmail) => {
      db("users_info")
        .where({
          email: logInEmail.email,
        })
        .select("*")
        .first()
        .then(async (userInfo) => {
          console.log(userInfo)
          const isValidPassword = await bcrypt.compare(password, userInfo.hash);

          if (isValidPassword) {
            const header = {
              name: userInfo.username
            }
            const token = jwt.sign(header, process.env.JWT_SECRET, { expiresIn: '15s' })
            const refresh=jwt.sign(header, process.env.JWT_REFRESH_SERCRET)
            db('refresh_tokens').insert({
              "refresh_token":refresh
            }).then(res=>{
              console.log("token succesfully inserted")
            }).catch(err=>{
              return res.statush(400).json(`the refresh token couldn't be insrted because of this error ${err}`)
            })
            return res.json({
              token,
              refresh,
              user:{ ...logInEmail, username: userInfo.username}});

          } else {
            return res.status(400).json("wrong password");
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      return res.status(400).json("wrong email");
    });
};

const token=(db,jwt)=>(req,res)=>{
 
  const refreshToken=req.body.token
  if(!token) return res.status(401).json('refresh token is missing')
  db('refresh_tokens').select("*"),where("refresh_token",refreshToken)
.first().then(refresh=>{
  if(refresh){
    jwt.verify(refreshToken,process.env.JWT_REFRESH_SERCRET,(err,user)=>{
      if(err) return res.status(401).json("not the right refresh token")
        const header={
          name:user.name
        }
      const token=jwt.sign(header,process.env.JWT_REFRESH_SECRET,{expiresIn:'15s'})
      return res.json(token)
    })
  }
})

}

module.exports = {
  signUp,
  logIn,
  token,
};
