// pages/api/authors.js
import data from '../../Data.json'

export default function handler(req, res) {
  res.status(200).json(data.authors)
}