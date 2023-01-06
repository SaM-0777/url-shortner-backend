import { Request, Response } from "express";
import mongoose from "mongoose";
import shortid from "shortid";
import { ShortenLink } from "../../models";


export async function createShortenUrl(req: Request, res: Response) {
  const { redirectUrl, verifiedUser } = req.body
  const { id } = verifiedUser
  try {
    const newShortenUrl = new ShortenLink({
      user: new mongoose.Types.ObjectId(id),
      redirectUrl: redirectUrl
    })
    newShortenUrl.save()
    res.status(200).json({ newShortenUrl })
  } catch (error) {
    res.status(500).json({ CreateShortenURLError: error })
  }
};


export async function deleteShortenUrl(req: Request, res: Response) {
  const { shortenUrlObjectId, verifiedUser } = req.body
  const { id } = verifiedUser
  let shortenUrl
  try {
    shortenUrl = await ShortenLink.findById({ _id: shortenUrlObjectId })
    if (!shortenUrl) return res.status(400).json({ error: "Invalid Request" })
    if (shortenUrl.user.toString() != new mongoose.Types.ObjectId(id).toString()) return res.status(404).json({ DeleteShortenUrlObjectUnexpectedUserError: "Request denied" })
  } catch (error) {
    res.status(500).json({ DeleteShortenUrlFindExistingShortenUrlObjectError: "Requested object do not exist" })
  }
  try {
    await shortenUrl?.remove()
    res.status(200).json({ success: "Deleted successfully" })
  } catch (error) {
    res.status(500).json({ ShortenUrlDeletionError: "Internal error" })
  }
};


export async function updateShortenUrl(req: Request, res: Response) {
  const { shortenUrlObjectId, redirectUrl, verifiedUser } = req.body
  const { id } = verifiedUser
  try {
    const shortenUrl = await ShortenLink.findById({ _id: shortenUrlObjectId })
    if (!shortenUrl) return res.status(400).json({ ObjectToUpdateNotFoundError: "Requested object not found" })
    if (shortenUrl.user.toString() !== new mongoose.Types.ObjectId(id).toString()) return res.status(404).json({ UpdateShortenUrlObjectUnexpectedUserError: "Request denied" })
    shortenUrl.redirectUrl = redirectUrl || shortenUrl.redirectUrl
    shortenUrl.code = shortid.generate()
    shortenUrl.updatedAt = new Date(Date.now())
    await shortenUrl.save()
    res.status(200).json({ shortenUrl })
  } catch (error) {
    res.status(500).json({ UpdateShortenUrlFindExistingShortenUrlObjectError: "Requested object can not be updated right now." })
  }
};


export async function getShortenUrlById(req:Request, res: Response) {
  const { shortenUrlObjectId, verifiedUser } = req.body
  const { id } = verifiedUser
  try {
    const shortenUrl = await ShortenLink.findById({ _id: shortenUrlObjectId })
    if (!shortenUrl) return res.status(400).json({ ObjectToGetByIdNotFoundError: "Requested object not found" })
    if (shortenUrl.user.toString() !== new mongoose.Types.ObjectId(id).toString()) return res.status(404).json({ GetByIdShortenUrlObjectUnexpectedUserError: "Request denied" })
    res.status(200).json({ shortenUrl })
  } catch (error) {
    res.status(500).json({ FindExistingShortenUrlObjectError: "Requested object can not be found right now." })
  }
};


export async function getShortenUrlByUser(req:Request, res: Response) {
  const { verifiedUser } = req.body
  const { id } = verifiedUser
  const query = ShortenLink.aggregate([
    {
      "$match": {user: new mongoose.Types.ObjectId(id)}
    }
  ])

  query.exec(function (err, response) {
    if (err) res.status(400).json({ GetShortenUrlByUserError: "Not found" })
    res.status(200).json({ response })
  })
};

