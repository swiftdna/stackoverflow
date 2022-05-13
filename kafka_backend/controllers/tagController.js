const db = require('../config/sqlConnect')

const addTag = async (req, callback) => {
    const tagName = req.body.tagName;
    const tagDescription = req.body.tagDescription;
    const tagQuestionsAsked = req.body.tagQuestionsAsked;
    const tagScore = req.body.tagScore;

    let sqlInsert =
        'Insert INTO tags (tagName,tagDescription,tagQuestionsAsked,tagScore) VALUES(?,?,?,?)'
    db.query(
        sqlInsert,
        [tagName, tagDescription, tagQuestionsAsked, tagScore],
        (err, result) => {
            if (err) {
                return callback(err, {
                    success : false,
                    message : err.message
                })
            } else {
                return callback(null, {
                    success : true,
                    message : "Successfully added a tag"
                })
            }
        }
    )
}

const getALLtags = (req, callback) => {
    const sqlSelect = 'SELECT * FROM tags'
    db.query(sqlSelect, (err, result) => {
        if (err) {
            return callback(err, {
                success : false,
                message : err.message
            })
        } else {
            const result1 = Object.values(JSON.parse(JSON.stringify(result)));
            return callback(null, {
                success : true,
                data: result1
            })
        }
    })
}

const getPopularTags = (req, callback) => {
    const sqlSelect = 'SELECT * FROM tags ORDER BY tagQuestionsAsked Desc'
    db.query(sqlSelect, (err, result) => {
        if (err) {
            return callback(err, {
                success : false,
                message : err.message
            });
        } else {
            const result1 = Object.values(JSON.parse(JSON.stringify(result)));
            //console.log(result)
            return callback(null, {
                success : true,
                data: result1
            });
        }
    })
}

const getSearchTags = (req, callback) => {
    const searchQuery = req.params.searchQuery
    const sqlSelect =
        "SELECT * FROM tags WHERE tagName LIKE '" + searchQuery + "%' LIMIT 5"
    db.query(sqlSelect, (err, result) => {

        if (err) {
            return callback(err, {
                success : false,
                message : err.message
            })
        } else {
            const result1 = Object.values(JSON.parse(JSON.stringify(result)));
            return callback(null, {
                success : true,
                data: result1
            })
        }
    })
}
module.exports = { addTag, getALLtags, getPopularTags, getSearchTags }
