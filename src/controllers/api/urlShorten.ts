import express, { Request, Response } from "express";
import { func } from "joi";
import mongoose from "mongoose";
import { ShortenLink } from "../../models";


export async function createShortenUrl(req: Request, res: Response) {
  const { userid, redirectUrl } = req.body
  // validate userid
  try {
    const newShortenUrl = new ShortenLink({
      user: new mongoose.Types.ObjectId(userid),
      redirectUrl: redirectUrl
    })
    newShortenUrl.save()
    res.status(200).json({ newShortenUrl })
  } catch (error) {
    res.status(500).json({ CreateShortenURLError: error })
  }
};


export async function deleteShortenUrl(req: Request, res: Response) {
  const { shortenUrlObjectId } = req.body
  let shortenUrl
  try {
    shortenUrl = await ShortenLink.findById({ _id: shortenUrlObjectId })
    if (!shortenUrl) return res.status(400).json({ error: "Invalid Request" })
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
  const { shortenUrlObjectId, redirectUrl } = req.body
  let shortenUrl
  try {
    shortenUrl = await ShortenLink.findById({ _id: shortenUrlObjectId })
    if (!shortenUrl) return res.status(400).json({ ObjectToUpdateNotFoundError: "Requested object not found" })
    shortenUrl.redirectUrl = redirectUrl || shortenUrl.redirectUrl
    shortenUrl.updatedAt = new Date(Date.now())
    await shortenUrl.save()
    res.status(200).json({ success: "Updated successfully" })
  } catch (error) {
    res.status(500).json({ UpdateShortenUrlFindExistingShortenUrlObjectError: "Requested object can not be updated right now." })
  }
};


export async function getShortenUrlById(req:Request, res: Response) {
  const { shortenUrlObjectId } = req.body
  try {
    const shortenUrl = await ShortenLink.findById({ _id: shortenUrlObjectId })
    if (!shortenUrl) return res.status(400).json({ ObjectToGetByIdNotFoundError: "Requested object not found" })
    res.status(200).json({ shortenUrl })
  } catch (error) {
    res.status(500).json({ FindExistingShortenUrlObjectError: "Requested object can not be found right now." })
  }
};


export async function getShortenUrlByUser(req:Request, res: Response) {
  const { userid } = req.body
  const query = ShortenLink.aggregate([
    {
      "$match": {user: new mongoose.Types.ObjectId(userid)}
    }
  ])

  query.exec(function (err, response) {
    if (err) res.status(400).json({ GetShortenUrlByUserError: err })
    res.status(200).json({ response })
  })
};

