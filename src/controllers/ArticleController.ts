import { Handler } from 'express'
import ArticleModel from '../models/ArticleModel'

export const create: Handler = async (req, res) => {
  const article = new ArticleModel(req.body)
  try {
    await article.save()
    res.send(article)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getAll: Handler = async (req, res) => {
  try {
    const articles = await ArticleModel.find()
    res.send(articles)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const getOne: Handler = async (req, res) => {
  try {
    const article = await ArticleModel.findOne({ _id: req.params.id })
    res.send(article)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const modify: Handler = async (req, res) => {
  try {
    const article = await ArticleModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.send(article)
  } catch (err) {
    res.status(400).json(err)
  }
}

export const remove: Handler = async (req, res) => {
  try {
    const article = await ArticleModel.deleteOne({ _id: req.params.id })
    res.send(article)
  } catch (err) {
    res.status(400).json(err)
  }
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove
}
