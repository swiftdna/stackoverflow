const db = require('../config/sqlConnect')

const addTag = async (req, res) => {
    const tagName = req.body.tagName.toLowerCase()
    const tagDescription = req.body.tagDescription
    const tagQuestionsAsked = req.body.tagQuestionsAsked
    const tagScore = req.body.tagScore

    let sqlInsert =
        'Insert INTO tags (tagName,tagDescription,tagQuestionsAsked,tagScore) VALUES(?,?,?,?)'
    db.query(
        sqlInsert,
        [tagName, tagDescription, tagQuestionsAsked, tagScore],
        (err, result) => {
            if (err) {
                res.status(500).json({
                    message: err,
                })
            } else {
                res.status(200).json({
                    message: ' sucessfully added a tag',
                })
            }
        }
    )
}

const getALLtags = (req, res) => {
    const sqlSelect = 'SELECT * FROM tags'
    db.query(sqlSelect, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            res.status(200).json({
                tags: result,
            })
        }
    })
}

const getPopularTags = (req, res) => {
    const sqlSelect = 'SELECT * FROM tags ORDER BY tagQuestionsAsked Desc'
    db.query(sqlSelect, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            res.status(200).json({
                tags: result,
            })
        }
    })
}

const getSearchTags = (req, res) => {
    const searchQuery = req.params.searchQuery
    console.log(searchQuery)
    const sqlSelect =
        "SELECT * FROM tags WHERE tagName LIKE '" + searchQuery + "%' LIMIT 5"
    db.query(sqlSelect, (err, result) => {
        if (err) {
            return res.send(err)
        } else {
            res.status(200).json({
                tags: result,
            })
        }
    })
}
module.exports = { addTag, getALLtags, getPopularTags, getSearchTags }
