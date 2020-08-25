const express = require("express");
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('../users/users-router')
const authRouter = require('../auth/auth-router')
const ailmentRouter = require('../ailments/ailments-router')
const strainsRouter = require('../strains/strains-router')
const reccRouter = require('../recommendations/recc-router')


const server = express();

server.use(helmet())
server.use(express.json())
server.use(cors());

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter);
server.use('/api/ailments', ailmentRouter);
server.use('/api/strains', strainsRouter);
server.use('/api/recommendations', reccRouter);

//server.use()

server.get("/", (req, res) => {
  res.status(200).json({ api: "up and running" });
});

server.get('/api', (req, res)=>{
  res.status(200).json({api: 'Api running, please access specific endpoints'})
})


module.exports = server;
