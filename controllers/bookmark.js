
const { Bookmark,Movie } = require('../models')

class BookmarkController{
    static async postAdd(req,res,next){
        try {
            const MovieId = req.params.id
            const UserId = req.user.id
            const addBookmark = await Bookmark.create({UserId,MovieId})
            const getMovie = await Movie.findOne({where:{id:MovieId}})

            res.status(201).json({
                "message":"Success adding bookmark",
                "userId":UserId,
                "movieId":MovieId,
                "movieTitle":getMovie.title
            })
        } catch (error) {
            next(error)
        }
    }


    static async getAll(req,res,next){
        try {
            const getData = await Bookmark.findAll({where:{UserId:req.user.id}},{include:Movie})

            res.status(200).json({getData})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = BookmarkController