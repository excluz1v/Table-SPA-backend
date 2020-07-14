const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const config = require('./config.js')
const queries = require('./queries')
const db = require('./db/database')
const TableModel = require('./db/TableModel')
const Sequelize = require('sequelize')
const Op = Sequelize.Op


db.authenticate()
    .then(() => console.log('Database connected'))


const app = express()
const corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))
app.use(express.json())

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


app.get('/', function (req, res) {
    if (!!TableModel.findAll()) {
        TableModel.findAll().then(gigs => res.send(gigs)).catch(err => err)
    } else {
        queries.addData.map(e => TableModel.create(e).then().catch(err => err))
    }
})

app.post('/sort', function (req, res) {
    if (req.body.group !== 'increment') {
        console.log("object")
        TableModel.findAll({
            order: [[req.body.id, `DESC`]]
        }).then(r => res.send(r)).catch(err => console.log(err))
    } else {
        TableModel.findAll({
            order: [req.body.id]
        }).then(r => res.send(r)).catch(err => console.log(err))
    }
})
app.post('/result', function (req, res) {
    console.log(req.body)
    for (let key in req.body) {
        let firstValue = req.body[key].split(',')[0]
        let secondValue = req.body[key].split(',')[1]
        switch (key) {
            case 'Count':
                TableModel.findAll({
                    where: {
                        count: {
                            [Op.and]: [{ [Op.gte]: firstValue }, { [Op.lte]: secondValue }]
                        }
                    }
                }).then(r => res.send(r)).catch(err => console.log(err))
                break
            case 'Date':
                TableModel.findAll({
                    where: {
                        date: {
                            [Op.and]: [{ [Op.gte]: `${firstValue}-01-01` }, { [Op.lte]: `${secondValue}-12-31` }]
                        }
                    }
                }).then(r => res.send(r)).catch(err => console.log(err))
                break
            // case 'title':
            //     console.log('tttttttttttttttttttttttttttt')
            //     TableModel.findAll({
            //         where: {
            //             Title: {
            //                 [Op.between]: [{ [Op.like]: `%${firstValue}` }, { [Op.like]: `%${secondValue}` }]
            //             }
            //         }
            //     }).then(r => res.send(r)).catch(err => console.log(err))
            //     break
            case "Distance":
                TableModel.findAll({
                    where: {
                        distance: {
                            [Op.and]: [{ [Op.gte]: firstValue }, { [Op.lte]: secondValue }]
                        }
                    }
                }).then(r => res.send(r)).catch(err => console.log(err))
                break
        }
    }

})
app.post('/search', function (req, res) {
    let term = req.body.search
    TableModel.findAll({
        where: {
            Title: {
                [Op.like]: '%' + term + '%'
            }
        }
    }).then(r => res.send(r))
})

