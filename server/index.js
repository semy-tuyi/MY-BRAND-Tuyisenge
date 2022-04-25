const mongoose = require('mongoose');
const express = require('express');

const userRouter = require('./routers/users')
const articleRouter = require('./routers/articles')
const queryRouter = require('./routers/queries')

const app = express();

mongoose.connect('mongodb://localhost/my-brand',{useNewUrlParser: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on PORT ${port}...`));
app.get('/', (req, res) => {
    res.json("Welcome to My brand server ").status(200)
})

app.use('/article', articleRouter);
app.use('/api/users', userRouter);
app.use('/query', queryRouter);
 




