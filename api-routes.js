const router = require('express').Router()
const e = require('express')
const { response } = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

const todos = [
     { id: 1, item: 'Learn JavaScript', complete: false },
      { id: 2, item: 'Learn Express', complete: false },
     { id: 3, item: 'Build a To Do App', complete: false }
    ]

//app.get('/', (_, response) => {
	//response.sendFile('index.html', { root })
//})


// GET /api/todos
router.get('/', async (_, response) => {
    const collection = await getCollection('todo-api', 'todos')
    const todos = await collection.find().toArray()
	response.send(todos)
})

// POST /api/todos
router.post('/', async (request, response) => {
    const { item } = request.body
    const id = todos.length + 1
    const complete = false
    todos.push({ id, item, complete })
    const collection = await getCollection('todo-api', 'todos')
    const result = await collection.insertOne({ item, complete })
	response.send(result)
})

// PUT /api/todos/:id
router.put('/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('todo-api', 'todos')
    const todo = await collection.findOne({ _id: new ObjectId(id) });
    const complete = !todo.complete
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } });
    response.send(result)
})
module.exports = router


