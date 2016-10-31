import express from 'express'
import path from 'path'

const app = express()

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

app.use(express.static('assets'))

app.get('/', (req, res) => {
  res.render('index')
})

export default app
