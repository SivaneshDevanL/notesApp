const mongoose = require('mongoose');
const port = 3001
const app = require('./app');
mongoose.connect('mongodb://localhost:27017/notesApp', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false });

mongoose.connection
.once('open', () => {
    console.log('connection established')
})
.on('connectionError', (err) => {
    console.log(err);
})

app.listen(port);