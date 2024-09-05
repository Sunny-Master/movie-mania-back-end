import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as tmdbCtrl from '../controllers/tmdb.js'

const router = Router()

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/movie', checkAuth, tmdbCtrl.movieSearch)

export { router }