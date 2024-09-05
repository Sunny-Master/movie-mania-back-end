import { MovieConcept } from "../models/movieConcept.js"
import { Profile } from "../models/profile.js"

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const concept = await MovieConcept.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { movieConcepts: concept } },
      { new: true }
    )
    concept.author = profile
    res.status(201).json(concept)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const concept = await MovieConcept.findById(req.params.movieConceptId)
      .populate(['author', 'comments.author'])
    res.status(200).json(concept)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const concept = await MovieConcept.findByIdAndUpdate(
      req.params.movieConceptId,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(concept)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
  show,
  update,
}