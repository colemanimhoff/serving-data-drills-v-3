const express = require('express')
const cors = require('cors')
const app = express()
const port = parseInt(process.env.PORT || 3000)

const students = require('./students.js')

function getDataById(data, id) {
    return data.data.filter(currentItem => currentItem.id == id)
}

app.get('/', (request, response) => response.json(students))

app.get('/:id', (request, response) => {
    let filteredStudent = getDataById(students, request.params.id)
    if (filteredStudent.length < 1) {
        response.status(404).json({
            error: { message: 'No record found!' }
        })
    } else {
        response.json({ student: filteredStudent })
    }
})

app.listen(port)
    .on('error', console.error.bind(console))
    .on('listening', console.log.bind(console, `Listening on ${port}`))