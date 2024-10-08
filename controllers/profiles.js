import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    .populate('movieConcepts')
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addActor(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    if (profile.favActors.some(actor => req.body.celebId === actor.celebId)) {
      throw new Error('Actor already exists in the Profile')
    }
    req.body.skill = 'Acting'
    profile.favActors.push(req.body)
    await profile.save()
    res.status(201).json(profile.favActors)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function addGenre(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    if (profile.favGenres.some(genre => req.body.genreId === genre.genreId)) {
      throw new Error('Genre already exists in the Profile')
    }
    profile.favGenres.push(req.body)
    await profile.save()
    res.status(201).json(profile.favGenres)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function addDirector(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    if (profile.favDirectors.some(director => req.body.celebId === director.celebId)) {
      throw new Error('Director already exists in the Profile')
    }
    req.body.skill = 'Directing'
    profile.favDirectors.push(req.body)
    await profile.save()
    res.status(201).json(profile.favDirectors)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function addMovie(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    if (profile.favMovies.some(movie => req.body.movieId === movie.movieId)) {
      throw new Error('Movie already exists in the favorites in the Profile')
    }
    profile.favMovies.push(req.body)
    await profile.save()
    res.status(201).json(profile.favMovies)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function addToWatchList(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    if (profile.watchList.some(movie => req.body.movieId === movie.movieId)) {
      throw new Error('Movie already exists in the watch-list in the Profile')
    }
    profile.watchList.push(req.body)
    await profile.save()
    res.status(201).json(profile.watchList)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function removeActor(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.favActors.remove({ _id: req.params.actorId }) 
    await profile.save()
    res.status(201).json(profile.favActors)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function removeDirector(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.favDirectors.remove({ _id: req.params.directorId }) 
    await profile.save()
    res.status(201).json(profile.favDirectors)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function removeMovie(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.favMovies.remove({ _id: req.params.movieId }) 
    await profile.save()
    res.status(201).json(profile.favMovies)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function removeFromWatchList(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.watchList.remove({ _id: req.params.movieId }) 
    await profile.save()
    res.status(201).json(profile.watchList)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function removeGenre(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.favGenres.remove({ _id: req.params.genreId }) 
    await profile.save()
    res.status(201).json(profile.favGenres)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { 
  index, 
  addPhoto,
  addActor, 
  addGenre,
  addDirector,
  addMovie,
  addToWatchList,
  show,
  removeActor,
  removeDirector,
  removeMovie,
  removeFromWatchList,
  removeGenre,
}
