// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import API from "../../src/api"

export default async function handler(req, res) {
  const response = await API.profileData(req.body.params)
  res.json(response)
}
