import { Response, Request } from "express"
import { StatusCodes } from "http-status-codes"
import { Tag } from "../models"

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Tag name is required" })
    }

    const existingTag = await Tag.findOne({ name })
    if (existingTag) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ success: false, message: "Tag already exists" })
    }

    const newTag = new Tag({ name })
    const savedTag = await newTag.save()

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Tag created successfully",
      tag: {
        id: savedTag._id,
        name: savedTag.name,
        created_at: savedTag.created_at,
        updated_at: savedTag.updated_at,
      },
    })
  } catch (error: any) {
    console.error("🔴 Error creating tag:", error.message)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" })
  }
}

export const getTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find().sort({ created_at: -1 })
        res.status(StatusCodes.OK).json({
        success: true,
        message: "Tags retrieved successfully",
        tags: tags.map(tag => ({
            id: tag._id,
            name: tag.name,
            created_at: tag.created_at,
            updated_at: tag.updated_at,
        })),
        })
    } catch (error: any) {
        console.error("🔴 Error retrieving tags:", error.message)
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal Server Error" })
    }
}


export const queryTags = async (req: Request, res: Response) => {
  try{
    const query = (req.query.q as string)?.trim();

    if (!query || query.length < 2) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Query must be at least 2 characters" })
    }

    const tags = await Tag.find({
      name: { $regex: query, $options: 'i' }, 
    }).limit(10);

    if( tags.length === 0) {
      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: "No tags found", tags: [] })
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Tags retrieved successfully",
      tags: tags.map(tag => ({
        id: tag._id,
        name: tag.name,
        created_at: tag.created_at,
        updated_at: tag.updated_at,
      })),
    })
  }catch(error: any) {
    console.error("🔴 Error querying tags:", error.message)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" })
  }
}